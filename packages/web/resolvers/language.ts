import { arg, booleanArg, intArg, objectType, extendType, nonNull, enumType } from 'nexus'
import { PostStatus } from '@journaly/j-db-client'
import { LanguageRelation, Language, LanguageLevel, UILanguage } from 'nexus-prisma'

const LanguageRelationType = objectType({
  name: LanguageRelation.$name,
  description: LanguageRelation.$description,
  definition(t) {
    t.field(LanguageRelation.id)
    t.field(LanguageRelation.language)
    t.field(LanguageRelation.level)
  },
})

const LanguageType = objectType({
  name: Language.$name,
  description: Language.$description,
  definition(t) {
    t.field(Language.id)
    t.field(Language.name)
    t.field(Language.devName)
    t.nonNull.list.nonNull.field('posts', {
      type: 'Post',
      resolve: (parent, _, ctx) => {
        return ctx.db.language
          .findUnique({
            where: { id: parent.id },
          })
          .posts()
      },
    })
    t.field(Language.dialect)
    t.int('postCount', {
      resolve(parent, _, ctx) {
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

const UILanguageType = enumType({
  name: UILanguage.name,
  description: UILanguage.description,
  members: UILanguage.members,
})

const LanguageLevelType = enumType({
  name: LanguageLevel.name,
  description: LanguageLevel.description,
  members: LanguageLevel.members,
})

const LanguageQueries = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('languages', {
      type: 'Language',
      args: {
        hasPosts: booleanArg({
          description: 'If true, only return languages that have at least one post',
        }),
        authoredOnly: booleanArg({
          description: 'If true, return only languages with posts authored by currentUser.',
        }),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request

        const filterClauses = []

        if (args.hasPosts) {
          filterClauses.push({
            posts: {
              some: { status: PostStatus.PUBLISHED },
            },
          })
        }
        if (args.authoredOnly) {
          filterClauses.push({
            posts: {
              some: {
                authorId: userId,
              },
            },
          })
        }

        return ctx.db.language.findMany({
          where: {
            AND: filterClauses,
          },
          orderBy: {
            name: 'asc',
          },
        })
      },
    })
  },
})

const LanguageMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('addLanguageRelation', {
      type: 'LanguageRelation',
      args: {
        languageId: nonNull(intArg()),
        level: nonNull(arg({ type: 'LanguageLevel' })),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request

        if (!userId) {
          throw new Error('You must be logged in add language relations.')
        }

        const language = await ctx.db.language.findUnique({
          where: { id: args.languageId },
        })

        if (!language) {
          throw new Error(`Unable to find language with id "${args.languageId}".`)
        }

        return ctx.db.languageRelation.create({
          data: {
            user: { connect: { id: userId } },
            language: { connect: { id: args.languageId } },
            level: args.level,
          },
        })
      },
    })
    t.field('removeLanguageRelation', {
      type: 'LanguageRelation',
      args: {
        languageId: nonNull(intArg()),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request

        if (!userId) {
          throw new Error('You must be logged in remove language relations.')
        }

        const relFilter = {
          where: {
            userId_languageId: {
              languageId: args.languageId,
              userId,
            },
          },
        }

        return ctx.db.languageRelation.delete(relFilter)
      },
    })
  },
})

export default [
  LanguageRelationType,
  LanguageType,
  UILanguageType,
  LanguageLevelType,
  LanguageQueries,
  LanguageMutations,
]
