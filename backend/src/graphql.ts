import { use, schema } from 'nexus'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from 'nexus-plugin-prisma'

use(prisma())

const {
  objectType,
  queryType,
  mutationType,
  intArg,
  stringArg,
  makeSchema,
} = schema

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
    t.model.threads()
    t.model.language({ type: 'Language' })
  },
})

const Thread = objectType({
  name: 'Thread',
  definition(t) {
    t.model.id()
    t.model.startIndex()
    t.model.endIndex()
    t.model.highlightedContent()
    t.model.comments()
  },
})

const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.model.id()
    t.model.author()
    t.model.body()
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
    //t.model.nativeUsers()
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
      t.field('postById', {
        type: 'Post',
        args: {
          id: intArg(),
        },
        resolve: async (parent, args, ctx) => {
          return await ctx.db.post.findOne({
            where: {
              id: args.id,
            },
          })
        },
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
        handle: stringArg({ required: true }),
        email: stringArg({ required: true }),
        handle: stringArg({ required: true }),
        password: stringArg({ required: true }),
      },
      resolve: async (parent, args, ctx: any) => {
        const password = await bcrypt.hash(args.password, 10)
        const user = await ctx.db.user.create({
          data: {
            handle: args.handle,
            email: args.email.toLowerCase(),
            handle: args.handle,
            auth: {
              create: { password },
            },
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
    t.field('createComment', {
      type: 'Comment',
      args: {
        threadId: intArg({ required: true }),
        body: stringArg({ required: true }),
      },
      resolve: async (parent, args, ctx) => {
        const { userId } = ctx.request

        if (!userId) {
          throw new Error('You must be logged in to post comments.')
        }

        const thread = await ctx.db.thread.findOne({
          where: { id: args.threadId },
        })

        if (!thread) {
          throw new Error(`Unable to find post with id ${args.threadId}`)
        }

        return await ctx.db.comment.create({
          data: {
            body: args.body,
            author: {
              connect: { id: userId },
            },
            thread: {
              connect: { id: thread.id },
            },
          },
        })
      },
    })
  },
})
