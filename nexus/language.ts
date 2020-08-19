import { schema } from 'nexus'
import { PostStatus } from '@prisma/client'

type LanguageM2MType = 'LanguageLearning' | 'LanguageNative'

const languagesM2MDef = (t: any) => {
  t.model.id()
  t.model.language()
}

const langM2MModel = (db: any, m2mType: LanguageM2MType) => {
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
    languageId: schema.intArg({ required: true }),
  },
  resolve: async (_parent: any, args: any, ctx: any) => {
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

const removeLanguageM2MMutation = (m2mType: LanguageM2MType) => ({
  type: m2mType,
  args: {
    languageId: schema.intArg({ required: true }),
  },
  resolve: async (_parent: any, args: any, ctx: any) => {
    const { userId } = ctx.request

    if (!userId) {
      throw new Error('You must be logged in add languages.')
    }

    const relFilter = {
      where: {
        userId_languageId: {
          languageId: args.languageId,
          userId,
        },
      },
    }

    const relation = await langM2MModel(ctx.db, m2mType).findOne(relFilter)

    if (!relation) {
      throw new Error(`Unable to find language relation.`)
    }

    await langM2MModel(ctx.db, m2mType).delete(relFilter)

    return relation
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
    t.int('postCount', {
      resolve(parent, _args, ctx, info) {
        return ctx.db.post.count({
          where: {
            AND: {
              languageId: parent.id,
              status: PostStatus.PUBLISHED,
            },
          },
        })
      },
    })
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

schema.extendType({
  type: 'Query',
  definition(t) {
    t.list.field('languages', {
      type: 'Language',
      args: {
        hasPosts: schema.booleanArg({ required: false }),
      },
      resolve: async (_parent, args, ctx) => {
        let filter
        if (args.hasPosts) {
          filter = {
            posts: {
              some: { status: PostStatus.PUBLISHED },
            },
          }
        } else {
          filter = undefined
        }

        return ctx.db.language.findMany({ where: filter })
      },
    })
  },
})

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('addLanguageLearning', addLanguageM2MMutation('LanguageLearning'))
    t.field('addLanguageNative', addLanguageM2MMutation('LanguageNative'))
    t.field('removeLanguageLearning', removeLanguageM2MMutation('LanguageLearning'))
    t.field('removeLanguageNative', removeLanguageM2MMutation('LanguageNative'))
  },
})
