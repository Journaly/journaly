import {
  intArg,
  objectType,
  extendType,
} from '@nexus/schema'
import { sendCommentThanksNotification, hasAuthorPermissions } from './utils'

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
        const comment = await ctx.db.comment.findOne({
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

        await sendCommentThanksNotification({
          post: comment.thread.post,
          thread: comment.thread,
          comment,
          commentAuthor: comment.author,
          commentThanksAuthor: commentThanks.author,
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
            ctx.db.user.findOne({
              where: {
                id: userId,
              },
            }),
            ctx.db.commentThanks.findOne({
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

export default [
  CommentThanks,
  ThanksMutations,
]
