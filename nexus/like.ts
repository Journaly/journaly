import { schema } from 'nexus'
import { sendCommentLikeNotification } from './utils'

const { intArg } = schema

schema.objectType({
  name: 'PostLike',
  definition(t) {
    t.model.id()
  },
})

schema.objectType({
  name: 'CommentLike',
  definition(t) {
    t.model.id()
    t.model.commentId()
    t.model.author()
  },
})

schema.mutationType({
  definition(t) {
    t.field('createCommentLike', {
      type: 'CommentLike',
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
            likes: true,
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

        // check if user has already liked this comment
        for (let like of comment.likes) {
          if (like.userId === userId) return
        }

        const commentLike = await ctx.db.commentLike.create({
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

        await sendCommentLikeNotification({
          post,
          thread: comment.thread,
          comment,
          commentAuthor: comment.author,
          commentLikeAuthor: commentLike.author,
        })

        return commentLike
      },
    })
  },
})
