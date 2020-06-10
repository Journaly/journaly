import {
  objectType,
  queryType,
  mutationType,
  stringArg,
  makeSchema,
} from '@nexus/schema'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { nexusPrismaPlugin } from 'nexus-prisma'

// Time constants
const ONE_YEAR = 1000 * 60 * 60 * 24 * 365
const ONE_HOUR_FROM_NOW = Date.now() + 3600000
const WITHIN_ONE_HOUR = Date.now() - 3600000

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.handle()
    t.model.password()
    t.model.bio()
    t.model.userRole()
    t.model.location()
    t.model.posts({
      pagination: false,
    })
  },
})

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.body()
    t.model.author()
    t.model.status()
    t.model.language({ type: 'Language' })
  },
})

const Location = objectType({
  name: 'Location',
  definition(t) {
    t.model.id()
    t.model.country()
    t.model.city()
  },
})

const Language = objectType({
  name: 'Language',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.posts()
    t.model.dialect()
    t.model.nativeUsers()
    //t.model.learningUsers()
    t.field('learningUsers', {
      list: true,
      type: 'User',
      resolve: async (language, _args, ctx) => {
        const result = await ctx.db.language
          .findOne({ where: { id: language.id } })
          .learningUsers({ include: { user: true } })
        return result.map((r) => r.user)
      },
    })
  },
})

// objectType({
//   name: 'LanguageLearned',
//   definition(t) {
//     t.
//   }
// })

const Query = queryType({
  definition(t) {
    t.list.field('posts', {
      type: 'Post',
      resolve: async (parent, args, ctx) => ctx.db.post.findMany(),
    }),
      t.list.field('feed', {
        type: 'Post',
        args: {
          status: stringArg(),
        },
        resolve: async (parent, args, ctx) => {
          return ctx.db.post.findMany({
            where: {
              status: args.status as any,
            },
          })
        },
      }),
      t.list.field('users', {
        type: 'User',
        resolve: async (parent, args, ctx) => {
          return ctx.db.user.findMany()
        },
      }),
      t.list.field('currentUser', {
        type: 'User',
        resolve: async (parent, args, ctx) => {
          const userId = ctx.request.userId
          // check for current userId
          if (!userId) {
            return null
          }
          return ctx.db.user.findMany({
            where: {
              id: userId,
            },
          })
        },
      })
  },
})

const Mutation = mutationType({
  definition(t) {
    t.field('createUser', {
      type: 'User',
      args: {
        name: stringArg({ required: true }),
        email: stringArg({ required: true }),
        handle: stringArg({ required: true }),
        password: stringArg({ required: true }),
      },
      resolve: async (parent, args, ctx: any) => {
        const password = await bcrypt.hash(args.password, 10)
        const user = await ctx.db.user.create({
          data: {
            name: args.name,
            email: args.email.toLowerCase(),
            handle: args.handle,
            password,
          },
        })
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET!)
        ctx.response.cookie('token', token, {
          httpOnly: true,
          maxAge: ONE_YEAR,
        })
        return user
      },
    })
    t.field('createPost', {
      type: 'Post',
      args: {
        title: stringArg({ required: true }),
        body: stringArg({ required: true }),
        status: stringArg(),
        authorEmail: stringArg({ required: true }),
      },
      resolve: async (parent, args, ctx) =>
        ctx.db.post.create({
          data: {
            title: args.title,
            body: args.title,
            status: args.status as any,
            author: {
              connect: {
                email: 'ro@bin.com',
              },
            },
          },
        }),
    })
  },
})

const schema = makeSchema({
  types: [User, Post, Location, Language, Query, Mutation],
  plugins: [nexusPrismaPlugin()],
})
