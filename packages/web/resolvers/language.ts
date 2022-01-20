import { arg, booleanArg, intArg, objectType, extendType, nonNull } from 'nexus'
import { PostStatus } from '@journaly/j-db-client'
import { LanguageRelation as LanguageRelationType, Language as LanguageType } from 'nexus-prisma'

const LanguageRelation = objectType({
  name: LanguageRelationType.$name,
  description: LanguageRelationType.$description,
  definition(t) {
    t.field(LanguageRelationType.id)
    t.field(LanguageRelationType.language)
    t.field(LanguageRelationType.level)
  },
})

const Language = objectType({
  name: LanguageType.$name,
  description: LanguageType.$description,
  definition(t) {
    t.field(LanguageType.id)
    t.field(LanguageType.name)
    t.field(LanguageType.devName)
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
    t.field(LanguageType.dialect)
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

export default [LanguageRelation, Language, LanguageQueries, LanguageMutations]
