import { schema } from 'nexus'

type LanguageM2MType = 'LanguageLearning' | 'LanguageNative'

const languagesM2MDef = (t: any) => {
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
      resolve: async (_parent, _args, ctx) => {
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
  }
})

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('addLanguageLearning', addLanguageM2MMutation('LanguageLearning'))
    t.field('addLanguageNative', addLanguageM2MMutation('LanguageNative'))
  }
})
