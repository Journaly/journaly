import { InAppNotificationType } from '.prisma/client'
import { intArg, objectType, extendType, nonNull } from 'nexus'

import { EmailNotificationType } from '@journaly/j-db-client'

import { createInAppNotification, createEmailNotification, hasAuthorPermissions } from './utils'
import { CommentThanks as CommentThanksType } from 'nexus-prisma'

const CommentThanks = objectType({
  name: CommentThanksType.$name,
  description: CommentThanksType.$description,
  definition(t) {
    t.field(CommentThanksType.id)
    t.field(CommentThanksType.commentId)
    t.field(CommentThanksType.author)
    t.field(CommentThanksType.comment)
  },
})

const ThanksMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createCommentThanks', {
      type: 'CommentThanks',
      args: {
        commentId: nonNull(intArg()),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request
        if (!userId) {
          throw new Error('You must be logged in to be thankful.')
        }

        const { commentId } = args
        const comment = await ctx.db.comment.findUnique({
          where: {
            id: commentId,
          },
          include: {
            author: true,
            thread: {
              include: {
                post: true,
              },
            },
          },
        })

        if (!comment) {
          throw new Error('Comment not found.')
        }

        const commentThanks = await ctx.db.commentThanks.create({
          data: {
            author: {
              connect: { id: userId },
            },
            comment: {
              connect: {
                id: comment.id,
              },
            },
          },
          include: {
            author: true,
          },
        })

        await createEmailNotification(ctx.db, comment.author, {
          type: EmailNotificationType.THREAD_COMMENT_THANKS,
          commentThanks,
        })

        await createInAppNotification(ctx.db, {
          userId: comment.authorId,
          type: InAppNotificationType.THREAD_COMMENT_THANKS,
          key: {
            postId: comment.thread.post.id,
            triggeringUserId: userId,
          },
          subNotification: {
            thanksId: commentThanks.id,
          },
        })

        return commentThanks
      },
    }),
      t.field('deleteCommentThanks', {
        type: 'CommentThanks',
        args: {
          commentThanksId: nonNull(intArg()),
        },
        resolve: async (_parent, args, ctx) => {
          const { userId } = ctx.request
          if (!userId) throw new Error('You must be logged in to do that.')

          const { commentThanksId } = args

          const [currentUser, originalCommentThanks] = await Promise.all([
            ctx.db.user.findUnique({
              where: {
                id: userId,
              },
            }),
            ctx.db.commentThanks.findUnique({
              where: {
                id: commentThanksId,
              },
              include: {
                ThreadCommentThanksNotification: true,
              },
            }),
          ])

          if (!currentUser) throw new Error('User not found.')
          if (!originalCommentThanks) throw new Error('CommentThanks not found.')

          hasAuthorPermissions(originalCommentThanks, currentUser)

          const originalThanksNotification = await ctx.db.threadCommentThanksNotification.delete({
            where: {
              id: originalCommentThanks.ThreadCommentThanksNotification[0].id,
            },
          })

          await ctx.db.inAppNotification.delete({
            where: {
              id: originalThanksNotification.notificationId,
            },
          })

          return ctx.db.commentThanks.delete({
            where: {
              id: commentThanksId,
            },
          })
        },
      })
  },
})

export default [CommentThanks, ThanksMutations]
