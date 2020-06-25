import { use, schema } from 'nexus'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from 'nexus-plugin-prisma'

use(prisma())

const { intArg, stringArg } = schema

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
    t.model.bio()
    t.model.userRole()
    t.model.location()
    t.model.posts({
      pagination: false,
    })
    t.model.profileImage()
  },
})

schema.objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.body()
    t.model.excerpt()
    t.model.author()
    t.model.status()
    t.model.threads()
    t.model.language({ type: 'Language' })
  },
})

schema.objectType({
  name: 'Thread',
  definition(t) {
    t.model.id()
    t.model.startIndex()
    t.model.endIndex()
    t.model.highlightedContent()
    t.model.comments()
  },
})

schema.objectType({
  name: 'Comment',
  definition(t) {
    t.model.id()
    t.model.author()
    t.model.body()
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

schema.queryType({
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
          search: stringArg({ required: false }),
          language: intArg({ required: false }),
          topic: stringArg({ required: false }),
          skip: intArg(),
          first: intArg(),
        },
        resolve: async (parent, args, ctx) => {
          const filterClauses = []

          if (args.language) {
            filterClauses.push({
              language: {
                id: {
                  equals: args.language,
                },
              },
            })
          }
          if (args.topic) {
            filterClauses.push({
              topic: {
                some: {
                  name: args.topic,
                },
              },
            })
          }
          if (args.search) {
            filterClauses.push({
              OR: [
                {
                  title: {
                    contains: args.search,
                  },
                },
                {
                  body: {
                    contains: args.search,
                  },
                },
              ],
            })
          }

          return ctx.db.post.findMany({
            where: {
              AND: filterClauses,
            },
            skip: args.skip,
            first: args.first,
          })
        },
      }),
      t.list.field('users', {
        type: 'User',
        resolve: async (parent, args, ctx) => {
          return ctx.db.user.findMany()
        },
      }),
      t.field('currentUser', {
        type: 'User',
        resolve: async (parent, args, ctx) => {
          const userId = ctx.request.userId
          // check for current userId
          if (!userId) {
            return null
          }
          return ctx.db.user.findOne({
            where: {
              id: userId,
            },
          })
        },
      })
    t.list.field('languages', {
      type: 'Language',
      resolve: async (parent, args, ctx) => {
        return ctx.db.language.findMany({
          where: {
            posts: {
              some: {
                status: 'PUBLISHED',
              },
            },
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
        handle: stringArg({ required: true }),
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
      },
      resolve: async (parent, args, ctx: any) => {
        const password = await bcrypt.hash(args.password, 10)
        const user = await ctx.db.user.create({
          data: {
            handle: args.handle,
            email: args.email.toLowerCase(),
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
    }),
      t.field('loginUser', {
        type: 'User',
        args: {
          identifier: stringArg({ required: true }),
          password: stringArg({ required: true }),
        },
        resolve: async (parent, args, ctx: any) => {
          const user = await ctx.db.user.findOne({
            where: {
              email: args.identifier,
            },
            include: {
              auth: true,
            },
          })
          if (!user) {
            throw new Error('User not found')
          }

          const isValid = await bcrypt.compare(
            args.password,
            user.auth.password,
          )

          if (!isValid) {
            throw new Error('Invalid password')
          }
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
    t.field('createThread', {
      type: 'Thread',
      args: {
        postId: intArg({ required: true }),
        startIndex: intArg({ required: true }),
        endIndex: intArg({ required: true }),
        highlightedContent: stringArg({ required: true }),
      },
      resolve: async (parent, args, ctx) => {
        const { userId } = ctx.request

        if (!userId) {
          throw new Error('You must be logged in to create threads.')
        }

        const { postId, startIndex, endIndex, highlightedContent } = args
        const post = await ctx.db.post.findOne({ where: { id: args.postId } })

        if (!post) {
          throw new Error(`Unable to find post with id ${postId}`)
        }

        return await ctx.db.thread.create({
          data: {
            startIndex,
            endIndex,
            highlightedContent,
            post: { connect: { id: postId } },
          },
        })
      },
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
          throw new Error(`Unable to find thread with id ${args.threadId}`)
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
