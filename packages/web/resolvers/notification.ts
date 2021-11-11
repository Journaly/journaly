import { arg, extendType, intArg, objectType } from 'nexus'

const InAppNotification = objectType({
  name: 'InAppNotification',
  definition(t) {
    t.model.id()
    t.model.type()
    t.model.bumpedAt()
    t.model.readStatus()
    t.model.post()
    t.model.readStatus()
    t.model.triggeringUser()
    t.model.threadCommentNotifications({ pagination: false })
    t.model.postCommentNotifications({ pagination: false })
    t.model.newFollowerNotifications({ pagination: false })
    t.model.postClapNotifications({ pagination: false })
    t.model.threadCommentThanksNotifications({ pagination: false })
  },
})

const ThreadCommentNotification = objectType({
  name: 'ThreadCommentNotification',
  definition(t) {
    t.model.id()
    t.model.comment()
  },
})

const PostCommentNotification = objectType({
  name: 'PostCommentNotification',
  definition(t) {
    t.model.id()
    t.model.postComment()
  },
})

const NewFollowerNotification = objectType({
  name: 'NewFollowerNotification',
  definition(t) {
    t.model.id()
  },
})

const PostClapNotification = objectType({
  name: 'PostClapNotification',
  definition(t) {
    t.model.id()
    t.model.postClap()
  },
})

const ThreadCommentThanksNotification = objectType({
  name: 'ThreadCommentThanksNotification',
  definition(t) {
    t.model.id()
    t.model.thanks()
  },
})

const NotificationMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateInAppNotification', {
      type: 'InAppNotification',
      args: {
        notificationId: intArg({ required: true }),
        readStatus: arg({
          type: 'NotificationReadStatus',
          description: 'Has the notification been read or not',
          required: false,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request

        if (!userId) {
          throw new Error('You must be logged in to update notifications')
        }
        const notification = await ctx.db.inAppNotification.findUnique({
          where: {
            id: args.notificationId,
          },
        })
        if (!notification) {
          throw new Error('Notification not found')
        }
        if (notification.userId !== userId) {
          throw new Error('You do not have permission to update this notification')
        }
        if (args.readStatus) {
          await ctx.db.inAppNotification.update({
            where: {
              id: notification.id,
            },
            data: {
              readStatus: args.readStatus,
            },
          })
        }
        return notification
      },
    })

    t.field('deleteInAppNotification', {
      type: InAppNotification,
      args: {
        notificationId: intArg({ required: true }),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request

        if (!userId) {
          throw new Error('You must be logged in to update notifications')
        }
        const notification = await ctx.db.inAppNotification.findUnique({
          where: {
            id: args.notificationId,
          },
        })
        if (!notification) {
          throw new Error('Notification not found')
        }
        if (notification.userId !== userId) {
          throw new Error('You do not have permission to delete this notification')
        }
        return ctx.db.inAppNotification.delete({
          where: {
            id: notification.id,
          },
        })
      },
    })
  },
})

export default [
  InAppNotification,
  ThreadCommentNotification,
  PostCommentNotification,
  NewFollowerNotification,
  PostClapNotification,
  ThreadCommentThanksNotification,
  NotificationMutations,
]
