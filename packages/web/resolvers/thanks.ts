import { intArg, objectType, extendType } from 'nexus'

import {
  EmailNotificationType,
  InAppNotificationType,
  BadgeType,
  Prisma,
} from '@journaly/j-db-client'

import {
  createInAppNotification,
  createEmailNotification,
  hasAuthorPermissions,
  assignCountBadges,
  sendNewBadgeEmail,
} from './utils'

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
          }
        })

        const thanksCountQuery = Prisma.sql`
          SELECT COUNT(*) AS count
          FROM "CommentThanks" AS ct
          JOIN "Comment" AS c
            ON ct."commentId" = c.id
          WHERE c."authorId" = ${comment.author.id}
        `
        
        const thanksGivenCountQuery = Prisma.sql`
          SELECT COUNT(*) AS count
          FROM "CommentThanks" AS ct
          WHERE ct."authorId" = ${userId}
        `
        const newBadgeCount = await assignCountBadges(
          ctx.db,
          comment.author.id,
          thanksCountQuery,
          {
            10: BadgeType.TEN_THANKS,
            50: BadgeType.FIFTY_THANKS,
            100: BadgeType.ONEHUNDRED_THANKS,
            250: BadgeType.TWOHUNDREDFIFTY_THANKS,
            500: BadgeType.FIVEHUNDRED_THANKS,
            1000: BadgeType.ONETHOUSAND_THANKS,
            1250: BadgeType.ONETHOUSANDTWOHUNDREDFIFTY_THANKS,
            1500: BadgeType.ONETHOUSANDFIVEHUNDRED_THANKS,
            2250: BadgeType.TWOTHOUSANDTWOHUNDREDFIFTY_THANKS,
            2500: BadgeType.TWOTHOUSANDFIVEHUNDRED_THANKS,
            5000: BadgeType.FIVETHOUSAND_THANKS,
            10000: BadgeType.TENTHOUSAND_THANKS,
          }
        )

        const newThanksGivenBadgeCount = await assignCountBadges(
          ctx.db,
          userId,
          thanksGivenCountQuery,
          {
            10: BadgeType.TEN_THANKS_GIVEN,
            50: BadgeType.FIFTY_THANKS_GIVEN,
            100: BadgeType.ONEHUNDRED_THANKS_GIVEN,
            250: BadgeType.TWOHUNDREDFIFTY_THANKS_GIVEN,
            500: BadgeType.FIVEHUNDRED_THANKS_GIVEN,
            1000: BadgeType.ONETHOUSAND_THANKS_GIVEN,
            2250: BadgeType.TWOTHOUSANDTWOHUNDREDFIFTY_THANKS_GIVEN,
            2500: BadgeType.TWOTHOUSANDFIVEHUNDRED_THANKS_GIVEN,
            5000: BadgeType.FIVETHOUSAND_THANKS_GIVEN,
            10000: BadgeType.TENTHOUSAND_THANKS_GIVEN,
          }
        )

        if (newThanksGivenBadgeCount) {
          const newBadges = await ctx.db.userBadge.findMany({
            where: { user: { id: userId } },
            include: { user: true },
            orderBy: { createdAt: 'desc' },
            take: newThanksGivenBadgeCount,
          })

          await Promise.all(
            newBadges.map((badge) => {
              return sendNewBadgeEmail({
                badgeType: badge.type,
                user: badge.user,
              })
            }),
          )
        }
        
        if (newBadgeCount) {
          const newBadges = await ctx.db.userBadge.findMany({
            where: { user: { id: comment.author.id } },
            include: { user: true },
            orderBy: { createdAt: 'desc' },
            take: newBadgeCount,
          })

          await Promise.all(
            newBadges.map((badge) => {
              return sendNewBadgeEmail({
                badgeType: badge.type,
                user: badge.user,
              })
            }),
          )
        }

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
