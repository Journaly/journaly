import { schema } from 'nexus'
import { sendCommentThanksNotification } from './utils'

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
    })
  },
})
