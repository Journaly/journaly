import { arg, extendType, intArg, nonNull, objectType } from 'nexus'
import {
  InAppNotification as InAppNotificationType,
  ThreadCommentNotification as ThreadCommentNotificationType,
  PostCommentNotification as PostCommentNotificationType,
  NewPostNotification as NewPostNotificationType,
  NewFollowerNotification as NewFollowerNotificationType,
  PostClapNotification as PostClapNotificationType,
  ThreadCommentThanksNotification as ThreadCommentThanksNotificationType,
} from 'nexus-prisma'

const InAppNotification = objectType({
  name: InAppNotificationType.$name,
  description: InAppNotificationType.$description,
  definition(t) {
    t.field(InAppNotificationType.id)
    t.field(InAppNotificationType.userId)
    t.field(InAppNotificationType.type)
    t.field(InAppNotificationType.bumpedAt)
    t.field(InAppNotificationType.readStatus)
    t.field(InAppNotificationType.post)
    t.field(InAppNotificationType.readStatus)
    t.field(InAppNotificationType.triggeringUser)
    t.nonNull.list.nonNull.field('threadCommentNotifications', {
      type: 'ThreadCommentNotification',
      resolve: (parent, _, ctx) => {
        return ctx.db.inAppNotification
          .findUnique({
            where: { id: parent.id },
          })
          .threadCommentNotifications()
      },
    })
    t.nonNull.list.nonNull.field('postCommentNotifications', {
      type: 'PostCommentNotification',
      resolve: (parent, _, ctx) => {
        return ctx.db.inAppNotification
          .findUnique({
            where: { id: parent.id },
          })
          .postCommentNotifications()
      },
    })
    t.nonNull.list.nonNull.field('newFollowerNotifications', {
      type: 'NewFollowerNotification',
      resolve: (parent, _, ctx) => {
        return ctx.db.inAppNotification
          .findUnique({
            where: { id: parent.id },
          })
          .newFollowerNotifications()
      },
    })
    t.nonNull.list.nonNull.field('postClapNotifications', {
      type: 'PostClapNotification',
      resolve: (parent, _, ctx) => {
        return ctx.db.inAppNotification
          .findUnique({
            where: { id: parent.id },
          })
          .postClapNotifications()
      },
    })
    t.nonNull.list.nonNull.field('threadCommentThanksNotifications', {
      type: 'ThreadCommentThanksNotification',
      resolve: (parent, _, ctx) => {
        return ctx.db.inAppNotification
          .findUnique({
            where: { id: parent.id },
          })
          .threadCommentThanksNotifications()
      },
    })
    t.nonNull.list.nonNull.field('newPostNotifications', {
      type: 'NewPostNotification',
      resolve: (parent, _, ctx) => {
        return ctx.db.inAppNotification
          .findUnique({
            where: { id: parent.id },
          })
          .newPostNotifications()
      },
    })
  },
})

const ThreadCommentNotification = objectType({
  name: ThreadCommentNotificationType.$name,
  description: ThreadCommentNotificationType.$description,
  definition(t) {
    t.field(ThreadCommentNotificationType.id)
    t.field(ThreadCommentNotificationType.comment)
  },
})

const PostCommentNotification = objectType({
  name: PostCommentNotificationType.$name,
  description: PostCommentNotificationType.$description,
  definition(t) {
    t.field(PostCommentNotificationType.id)
    t.field(PostCommentNotificationType.postComment)
  },
})

const NewFollowerNotification = objectType({
  name: NewFollowerNotificationType.$name,
  description: NewFollowerNotificationType.$description,
  definition(t) {
    t.field(NewFollowerNotificationType.id)
    t.field(NewFollowerNotificationType.followingUser)
  },
})

const PostClapNotification = objectType({
  name: PostClapNotificationType.$name,
  description: PostClapNotificationType.$description,
  definition(t) {
    t.field(PostClapNotificationType.id)
    t.field(PostClapNotificationType.postClap)
  },
})

const ThreadCommentThanksNotification = objectType({
  name: ThreadCommentThanksNotificationType.$name,
  description: ThreadCommentThanksNotificationType.$description,
  definition(t) {
    t.field(ThreadCommentThanksNotificationType.id)
    t.field(ThreadCommentThanksNotificationType.thanks)
  },
})

const NewPostNotification = objectType({
  name: NewPostNotificationType.$name,
  description: NewPostNotificationType.$description,
  definition(t) {
    t.field(NewPostNotificationType.id)
    t.field(NewPostNotificationType.post)
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
  InAppNotification,
  ThreadCommentNotification,
  PostCommentNotification,
  NewFollowerNotification,
  PostClapNotification,
  ThreadCommentThanksNotification,
  NewPostNotification,
  NotificationMutations,
]
