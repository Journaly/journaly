import { schema } from 'nexus'

schema.objectType({
  name: 'TopicTranslation',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.uiLanguage()
  },
})

schema.objectType({
  name: 'Topic',
  definition(t) {
    t.model.id()
    t.string('name', {
      nullable: true,
      args: {
        uiLanguage: schema.arg({ type: 'UILanguage', required: true }), 
      },
      async resolve(parent, args, ctx, _info) {
        const translation = await ctx.db.topicTranslation.findOne({
          where: {
            uiLanguage_topicId: {
              topicId: parent.id,
              uiLanguage: args.uiLanguage,
            }
          }
        })

        return translation?.name || parent.devName
      },
    })
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.list.field('topics', {
      'type': 'Topic',
      args: {
        hasPosts: schema.booleanArg({ required: false }),
      },
      resolve: async (_parent, _args, ctx) => {
        let filter = undefined
        /*
        if (args.hasPosts) {
          filter = {
            postTopics: {
              some: {
                post: { status: PostStatus.PUBLISHED },
              },
            },
          }
        }
        */

        return ctx.db.topic.findMany({
          where: filter,
        })
      }
    })
  }
})
