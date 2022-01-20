import { arg, extendType, intArg, nonNull, objectType } from 'nexus'
import {
  InAppNotification,
  ThreadCommentNotification,
  PostCommentNotification,
  NewPostNotification,
  NewFollowerNotification,
  PostClapNotification,
  ThreadCommentThanksNotification,
} from 'nexus-prisma'

const InAppNotificationType = objectType({
  name: InAppNotification.$name,
  description: InAppNotification.$description,
  definition(t) {
    t.field(InAppNotification.id)
    t.field(InAppNotification.userId)
    t.field(InAppNotification.type)
    t.field(InAppNotification.bumpedAt)
    t.field(InAppNotification.readStatus)
    t.field(InAppNotification.post)
    t.field(InAppNotification.readStatus)
    t.field(InAppNotification.triggeringUser)
    t.field(InAppNotification.threadCommentNotifications, { pagination: false })
    t.field(InAppNotification.postCommentNotifications, { pagination: false })
    t.field(InAppNotification.newFollowerNotifications, { pagination: false })
    t.field(InAppNotification.postClapNotifications, { pagination: false })
    t.field(InAppNotification.threadCommentThanksNotifications, { pagination: false })
    t.field(InAppNotification.newPostNotifications, { pagination: false })
  },
})

const ThreadCommentNotificationType = objectType({
  name: ThreadCommentNotification.$name,
  description: ThreadCommentNotification.$description,
  definition(t) {
    t.field(ThreadCommentNotification.id)
    t.field(ThreadCommentNotification.comment)
  },
})

const PostCommentNotificationType = objectType({
  name: PostCommentNotification.$name,
  description: PostCommentNotification.$description,
  definition(t) {
    t.field(PostCommentNotification.id)
    t.field(PostCommentNotification.postComment)
  },
})

const NewFollowerNotificationType = objectType({
  name: NewFollowerNotification.$name,
  description: NewFollowerNotification.$description,
  definition(t) {
    t.field(NewFollowerNotification.id)
    t.field(NewFollowerNotification.followingUser)
  },
})

const PostClapNotificationType = objectType({
  name: PostClapNotification.$name,
  description: PostClapNotification.$description,
  definition(t) {
    t.field(PostClapNotification.id)
    t.field(PostClapNotification.postClap)
  },
})

const ThreadCommentThanksNotificationType = objectType({
  name: ThreadCommentThanksNotification.$name,
  description: ThreadCommentThanksNotification.$description,
  definition(t) {
    t.field(ThreadCommentThanksNotification.id)
    t.field(ThreadCommentThanksNotification.thanks)
  },
})

const NewPostNotificationType = objectType({
  name: NewPostNotification.$name,
  description: NewPostNotification.$description,
  definition(t) {
    t.field(NewPostNotification.id)
    t.field(NewPostNotification.post)
  },
})

const NotificationMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateInAppNotification', {
      type: 'InAppNotification',
      args: {
        notificationId: nonNull(intArg()),
        readStatus: arg({
          type: 'NotificationReadStatus',
          description: 'Has the notification been read or not',
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
          return ctx.db.inAppNotification.update({
            where: {
              id: notification.id,
            },
            data: {
              readStatus: args.readStatus,
            },
          })
        } else {
          return notification
        }
      },
    })

    t.field('deleteInAppNotification', {
      type: 'InAppNotification',
      args: {
        notificationId: nonNull(intArg()),
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
  InAppNotificationType,
  ThreadCommentNotificationType,
  PostCommentNotificationType,
  NewFollowerNotificationType,
  PostClapNotificationType,
  ThreadCommentThanksNotificationType,
  NewPostNotificationType,
  NotificationMutations,
]
