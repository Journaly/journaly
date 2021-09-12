import { PostStatus } from '@journaly/j-db-client'
import { arg, booleanArg, objectType, extendType, intArg } from 'nexus'

const TopicTranslation = objectType({
  name: 'TopicTranslation',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.uiLanguage()
  },
})

const Topic = objectType({
  name: 'Topic',
  sourceType: 'prisma.Topic',
  definition(t) {
    t.model.id()
    t.string('name', {
      nullable: true,
      args: {
        uiLanguage: arg({ type: 'UILanguage', required: true }),
      },
      async resolve(parent, args, ctx, _info) {
        const translation = await ctx.db.topicTranslation.findUnique({
          where: {
            uiLanguage_topicId: {
              topicId: parent.id,
              uiLanguage: args.uiLanguage,
            },
          },
        })

        return translation?.name || parent.devName
      },
    })
    t.int('postCount', {
      args: {
        languages: intArg({
          description: 'Language IDs to filter topics. No value means all languages.',
          required: false,
          list: true,
        }),
      },
      resolve(parent, args, ctx) {
        let filter = {}
        if (args.languages && args.languages.length > 0)
          filter = { languageId: { in: args.languages } }

        return ctx.db.post.count({
          where: {
            AND: {
              ...filter,
              postTopics: {
                some: { topicId: parent.id },
              },
              status: PostStatus.PUBLISHED,
            },
          },
        })
      },
    })
  },
})

const TopicQueries = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('topics', {
      type: 'Topic',
      args: {
        hasPosts: booleanArg({
          description: 'If true, only return topics that have at least one post',
          required: false,
        }),
        authoredOnly: booleanArg({
          description: 'If true, return only topics with posts authored by currentUser.',
          required: false,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request

        const filterClauses = []

        if (args.hasPosts) {
          filterClauses.push({
            postTopics: {
              some: {
                post: {
                  status: PostStatus.PUBLISHED,
                },
              },
            },
          })
        }

        if (args.authoredOnly) {
          filterClauses.push({
            postTopics: {
              some: {
                post: {
                  authorId: userId,
                },
              },
            },
          })
        }

        return ctx.db.topic.findMany({
          where: {
            AND: filterClauses,
          },
          orderBy: {
            devName: 'asc',
          },
        })
      },
    })
  },
})

export default [TopicTranslation, Topic, TopicQueries]
