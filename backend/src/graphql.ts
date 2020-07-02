import { use, schema } from 'nexus'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from 'nexus-plugin-prisma'

import { processEditorDocument, hasPostPermissions } from './utils'
import { NotFoundError, NotAuthorizedError } from './errors'

use(prisma())

const { arg, intArg, stringArg } = schema

// Time constants
const ONE_YEAR = 1000 * 60 * 60 * 24 * 365
const ONE_HOUR_FROM_NOW = Date.now() + 3600000
const WITHIN_ONE_HOUR = Date.now() - 3600000

const languagesM2MDef = (t) => {
  t.model.language()
}

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
    t.model.createdAt()
    t.model.languagesNative()
    t.model.languagesLearning()
  },
})

schema.objectType({
  name: 'LanguageLearning',
  definition: languagesM2MDef,
})

schema.objectType({
  name: 'LanguageNative',
  definition: languagesM2MDef,
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
    t.model.createdAt()
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
    t.model.createdAt()
    t.model.authorId()
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

const EditorNode = schema.inputObjectType({
  name: 'EditorNode',
  definition(t) {
    t.string('type', { nullable: true }),
      t.string('text', { nullable: true }),
      t.boolean('italic', { nullable: true }),
      t.boolean('bold', { nullable: true }),
      t.field('children', {
        type: EditorNode,
        list: true,
        nullable: true,
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
          const post = await ctx.db.post.findOne({ where: { id: args.id } })

          if (!post) {
            throw new NotFoundError('Post')
          }

          if (post.status === 'DRAFT' && post.authorId !== ctx.request.userId) {
            throw new NotAuthorizedError()
          }

          return post
        },
      }),
      t.list.field('feed', {
        type: 'Post',
        args: {
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

type LanguageM2MType = 'LanguageLearning' | 'LanguageNative'

const langM2MModel = (db, m2mType: LanguageM2MType) => {
  switch (m2mType) {
    case 'LanguageLearning':
      return db.languageLearning
    case 'LanguageNative':
      return db.languageNative
  }
}

const addLanguageM2MMutation = (m2mType: LanguageM2MType) => ({
  type: m2mType,
  args: {
    languageId: intArg({ required: true }),
  },
  resolve: async (parent, args, ctx) => {
    const { userId } = ctx.request

    if (!userId) {
      throw new Error('You must be logged in add languages.')
    }

    const language = await ctx.db.language.findOne({
      where: { id: args.languageId },
    })

    if (!language) {
      throw new Error(`Unable to find language with id "${args.languageId}".`)
    }

    return langM2MModel(ctx.db, m2mType).create({
      data: {
        user: { connect: { id: userId } },
        language: { connect: { id: args.languageId } },
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
        body: EditorNode.asArg({ list: true }),
        languageId: intArg({ required: true }),
        status: arg({ type: 'PostStatus' }),
      },
      resolve: async (parent, args, ctx) => {
        const { title, body, languageId, status } = args
        const { userId } = ctx.request

        return ctx.db.post.create({
          data: {
            language: { connect: { id: languageId } },
            author: { connect: { id: userId } },
            title,
            status,
            ...processEditorDocument(body),
          },
        })
      },
    })
    t.field('updatePost', {
      type: 'Post',
      args: {
        postId: intArg({ required: true }),
        title: stringArg({ required: false }),
        body: EditorNode.asArg({ list: true, required: false }),
        status: arg({ type: 'PostStatus', required: false }),
      },
      resolve: async (parent, args, ctx) => {
        // Check user can actually do this
        const { userId } = ctx.request
        if (!userId) throw new NotAuthorizedError()

        const [currentUser, originalPost] = await Promise.all([
          ctx.db.user.findOne({
            where: {
              id: userId,
            },
          }),
          ctx.db.post.findOne({
            where: {
              id: args.postId,
            },
          }),
        ])

        if (!currentUser) throw new NotFoundError('User')
        if (!originalPost) throw new NotFoundError('Post')

        hasPostPermissions(originalPost, currentUser)

        // Actually make the change in the DB
        let data = {}
        if (args.title) {
          data.title = args.title
        }

        if (args.status) {
          data.status = args.status
        }

        if (args.body) {
          data = { ...data, ...processEditorDocument(args.body) }
        }

        return ctx.db.post.update({
          where: { id: args.postId },
          data,
        })
      },
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
    t.field('updateComment', {
      type: 'Comment',
      args: {
        commentId: intArg({ required: true }),
        body: stringArg({ required: true }),
      },
      resolve: async (parent, args, ctx) => {
        const { userId } = ctx.request
        if (!userId) throw new Error('You must be logged in to do that.')

        const [currentUser, originalComment] = await Promise.all([
          ctx.db.user.findOne({
            where: {
              id: userId,
            },
          }),
          ctx.db.comment.findOne({
            where: {
              id: args.commentId,
            },
          }),
        ])

        if (!currentUser) throw new Error('User not found.')
        if (!originalComment) throw new Error('Comment not found.')

        hasPostPermissions(originalComment, currentUser)

        const comment = await ctx.db.comment.update({
          data: {
            body: args.body,
          },
          where: {
            id: args.commentId,
          },
        })

        return comment
      },
    })
    t.field('deleteComment', {
      type: 'Comment',
      args: {
        commentId: intArg({ required: true }),
      },
      resolve: async (parent, args, ctx) => {
        const { userId } = ctx.request
        if (!userId) throw new Error('You must be logged in to do that.')

        const currentUser = ctx.db.user.findOne({
          where: {
            id: userId,
          },
        })

        if (!currentUser) throw new Error('User not found.')

        const originalComment = await ctx.db.comment.findOne({
          where: {
            id: args.commentId,
          },
        })

        if (!originalComment) throw new Error('Comment not found.')

        hasPostPermissions(originalComment, currentUser)

        const comment = await ctx.db.comment.delete({
          where: {
            id: args.commentId,
          },
        })

        return comment
      },
    })

    t.field('addLanguageLearning', addLanguageM2MMutation('LanguageLearning'))
    t.field('addLanguageNative', addLanguageM2MMutation('LanguageNative'))
  },
})
