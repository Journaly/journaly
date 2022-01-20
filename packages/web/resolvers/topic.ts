import { PostStatus } from '@journaly/j-db-client'
import { arg, booleanArg, objectType, extendType, intArg, nonNull, list } from 'nexus'
import {
  Topic as TopicType,
  TopicTranslation as TopicTranslationType,
  UserInterest as UserInterestType,
} from 'nexus-prisma'

const TopicTranslation = objectType({
  name: TopicTranslationType.$name,
  definition(t) {
    t.field(TopicTranslationType.id)
    t.field(TopicTranslationType.name)
    t.field(TopicTranslationType.uiLanguage)
  },
})

const UserInterest = objectType({
  name: UserInterestType.$name,
  description: UserInterestType.$description,
  definition(t) {
    t.field(UserInterestType.id)
    t.field(UserInterestType.user)
    t.field(UserInterestType.topic)
  },
})

const Topic = objectType({
  name: TopicType.$name,
  description: TopicType.$description,
  definition(t) {
    t.field(TopicType.id)
    t.string('name', {
      args: {
        uiLanguage: nonNull(arg({ type: 'UILanguage' })),
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
        languages: list(
          intArg({
            description: 'Language IDs to filter topics. No value means all languages.',
          }),
        ),
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
        }),
        authoredOnly: booleanArg({
          description: 'If true, return only topics with posts authored by currentUser.',
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

const TopicMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('addUserInterest', {
      type: 'UserInterest',
      args: {
        topicId: nonNull(intArg()),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request

        if (!userId) {
          throw new Error('You must be logged in to add a user interest.')
        }

        const topic = await ctx.db.topic.findUnique({
          where: { id: args.topicId },
        })

        if (!topic) {
          throw new Error(`Unable to find topic with id "${args.topicId}".`)
        }

        return ctx.db.userInterest.create({
          data: {
            user: { connect: { id: userId } },
            topic: { connect: { id: args.topicId } },
          },
        })
      },
    })
    t.field('removeUserInterest', {
      type: 'UserInterest',
      args: {
        topicId: nonNull(intArg()),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request

        if (!userId) {
          throw new Error('You must be logged in to remove a user interest.')
        }

        const interestFilter = {
          where: {
            userId_topicId: {
              topicId: args.topicId,
              userId,
            },
          },
        }

        return ctx.db.userInterest.delete(interestFilter)
      },
    })
  },
})

export default [TopicTranslation, UserInterest, Topic, TopicQueries, TopicMutations]
