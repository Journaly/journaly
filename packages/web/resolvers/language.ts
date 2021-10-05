import { arg, booleanArg, intArg, objectType, extendType } from 'nexus'
import { PostStatus } from '@journaly/j-db-client'

const LanguageRelation = objectType({
  name: 'LanguageRelation',
  definition(t) {
    t.model.id()
    t.model.language()
    t.model.level()
  },
})

const Language = objectType({
  name: 'Language',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.posts({ pagination: false })
    t.model.dialect()
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
          required: false,
        }),
        authoredOnly: booleanArg({
          description: 'If true, return only languages with posts authored by currentUser.',
          required: false,
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
        languageId: intArg({ required: true }),
        level: arg({ type: 'LanguageLevel', required: true }),
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
        languageId: intArg({ required: true }),
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
