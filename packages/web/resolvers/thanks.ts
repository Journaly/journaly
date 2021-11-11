import { InAppNotificationType } from '.prisma/client'
import { intArg, objectType, extendType } from 'nexus'

import { EmailNotificationType } from '@journaly/j-db-client'

import { createNotification, hasAuthorPermissions } from './utils'

const CommentThanks = objectType({
  name: 'CommentThanks',
  definition(t) {
    t.model.id()
    t.model.commentId()
    t.model.author()
    t.model.comment()
  },
})

const ThanksMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createCommentThanks', {
      type: 'CommentThanks',
      args: {
        commentId: intArg({ required: true }),
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

        await createNotification(ctx.db, comment.author, {
          type: EmailNotificationType.THREAD_COMMENT_THANKS,
          commentThanks,
        })

        const ian = await ctx.db.inAppNotification.create({
          data: {
            userId: comment.authorId,
            type: InAppNotificationType.THREAD_COMMENT_THANKS,
            bumpedAt: new Date(),
            triggeringUserId: comment.authorId,
          },
        })

        await ctx.db.threadCommentThanksNotification.create({
          data: {
            notificationId: ian.id,
            thanksId: commentThanks.id,
          },
        })

        return commentThanks
      },
    }),
      t.field('deleteCommentThanks', {
        type: 'CommentThanks',
        args: {
          commentThanksId: intArg({ required: true }),
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
            }),
          ])

          if (!currentUser) throw new Error('User not found.')
          if (!originalCommentThanks) throw new Error('CommentThanks not found.')

          hasAuthorPermissions(originalCommentThanks, currentUser)

          return await ctx.db.commentThanks.delete({
            where: {
              id: commentThanksId,
            },
          })
        },
      })
  },
})

export default [CommentThanks, ThanksMutations]
