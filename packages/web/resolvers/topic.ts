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

const UserInterest = objectType({
  name: 'UserInterest',
  definition(t) {
    t.model.id()
    t.model.user()
    t.model.topic()
  }
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
        hasPosts: booleanArg({ required: false }),
      },
      resolve: async (_parent, args, ctx) => {
        let filter
        if (args.hasPosts) {
          filter = {
            postTopics: {
              some: {
                post: {
                  status: PostStatus.PUBLISHED,
                },
              },
            },
          }
        } else {
          filter = undefined
        }

        return ctx.db.topic.findMany({
          where: filter,
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
        topicId: intArg({ required: true })
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
          throw new Error(`Unable to find language with id "${args.topicId}".`)
        }

        return ctx.db.userInterest.create({
          data: {
            user: { connect: { id: userId } },
            topic: { connect: { id: args.topicId } },
          }
        })
      },
    })
    t.field('removeUserInterest', {
      type: 'UserInterest',
      args: {
        topicId: intArg({ required: true })
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request

        if (!userId) {
          throw new Error('You must be logged in to add a user interest.')
        }

        const interestFilter = {
          where: {
            userId_topicId: {
              topicId: args.topicId,
              userId,
            },
          },
        }

        const userInterest = await ctx.db.userInterest.findUnique(interestFilter)

        if (!userInterest) {
          throw new Error(`Unable to find user interest.`)
        }

        return ctx.db.userInterest.delete(interestFilter)
      },
    })
  }
})

export default [TopicTranslation, UserInterest, Topic, TopicQueries, TopicMutations]
