import { schema } from 'nexus-future'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Time constants
const ONE_YEAR = 1000 * 60 * 60 * 24 * 365
const ONE_HOUR_FROM_NOW = Date.now() + 3600000
const WITHIN_ONE_HOUR = Date.now() - 3600000

schema.objectType({
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
  },
})

schema.objectType({
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

schema.objectType({
  name: 'Location',
  definition(t) {
    t.model.id()
    t.model.country()
    t.model.city()
  },
})

schema.objectType({
  name: 'Language',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.posts()
    t.model.dialect()
    t.model.nativeUsers()
    t.model.learningUsers()
  },
})

schema.queryType({
  definition(t) {
    t.list.field('posts', {
      type: 'Post',
      resolve: async (parent, args, ctx) => ctx.db.post.findMany(),
    }),
      t.list.field('feed', {
        type: 'Post',
        args: {
          status: schema.stringArg(),
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

schema.mutationType({
  definition(t) {
    t.field('createUser', {
      type: 'User',
      args: {
        name: schema.stringArg({ required: true }),
        email: schema.stringArg({ required: true }),
        handle: schema.stringArg({ required: true }),
        password: schema.stringArg({ required: true }),
      },
      resolve: async (parent, args, ctx: any) => {
        const password = await bcrypt.hash(args.password, 10)
        const user = await ctx.db.user.create({
          data: {
            name: args.name,
            email: args.email,
            handle: args.handle,
            password: args.password,
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
        title: schema.stringArg({ required: true }),
        body: schema.stringArg({ required: true }),
        status: schema.stringArg(),
        authorEmail: schema.stringArg({ required: true }),
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
