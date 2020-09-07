import { schema } from 'nexus'
import { sendCommentThanksNotification, hasAuthorPermissions } from './utils'

const { intArg } = schema

schema.objectType({
  name: 'CommentThanks',
  definition(t) {
    t.model.id()
    t.model.commentId()
    t.model.author()
    t.model.comment()
  },
})

schema.extendType({
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
          throw new Error('You must be logged in to create threads.')
        }

        const { commentId } = args
        const comment = await ctx.db.comment.findOne({
          where: {
            id: commentId,
          },
          include: {
            author: true,
            thread: true,
          },
        })

        const post = await ctx.db.post.findOne({
          where: {
            id: comment?.thread.postId,
          },
        })

        if (!comment || !post) {
          throw new Error('Comment or Post record not found.')
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
          post,
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

          const currentUser = await ctx.db.user.findOne({
            where: {
              id: userId,
            },
          })

          if (!currentUser) throw new Error('User not found.')

          const originalCommentThanks = await ctx.db.commentThanks.findOne({
            where: {
              id: commentThanksId,
            },
          })

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
