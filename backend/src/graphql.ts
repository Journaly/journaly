import { use, schema } from 'nexus'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from 'nexus-plugin-prisma'

import { htmlifyEditorNodes } from './utils'

use(prisma())

const { intArg, stringArg } = schema

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
      },
      resolve: async (parent, args, ctx) => {
        const { title, body, languageId } = args
        const { userId } = ctx.request

        const html = htmlifyEditorNodes(body)

        return ctx.db.post.create({
          data: {
            title: args.title,
            body: html,
            bodySrc: JSON.stringify(body),
            excerpt: '',
            language: { connect: { id: languageId } },
            author: { connect: { id: userId } },
          },
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

    t.field('addLanguageLearning', addLanguageM2MMutation('LanguageLearning'))
    t.field('addLanguageNative', addLanguageM2MMutation('LanguageNative'))
  },
})
