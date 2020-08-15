import { schema } from 'nexus'

import { hasAuthorPermissions } from './utils'
import { NotFoundError } from './errors'
import { transport, makeEmail } from '../lib/mail'
const { intArg, stringArg } = schema

schema.objectType({
  name: 'Thread',
  definition(t) {
    t.model.id()
    t.model.startIndex()
    t.model.endIndex()
    t.model.highlightedContent()
    t.model.comments()
  },
})

schema.objectType({
  name: 'Comment',
  definition(t) {
    t.model.id()
    t.model.author()
    t.model.body()
    t.model.createdAt()
  },
})

schema.objectType({
  name: 'PostComment',
  definition(t) {
    t.model.id()
    t.model.author()
    t.model.body()
    t.model.createdAt()
  },
})

schema.mutationType({
  definition(t) {
    t.field('createThread', {
      type: 'Thread',
      args: {
        postId: intArg({ required: true }),
        startIndex: intArg({ required: true }),
        endIndex: intArg({ required: true }),
        highlightedContent: stringArg({ required: true }),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request

        if (!userId) {
          throw new Error('You must be logged in to create threads.')
        }

        const { postId, startIndex, endIndex, highlightedContent } = args
        const post = await ctx.db.post.findOne({ where: { id: args.postId } })

        if (!post) {
          throw new Error(`Unable to find post with id ${postId}`)
        }

        return await ctx.db.thread.create({
          data: {
            startIndex,
            endIndex,
            highlightedContent,
            post: { connect: { id: postId } },
          },
        })
      },
    })

    t.field('deleteThread', {
      type: 'Thread',
      args: {
        threadId: intArg({ required: true }),
      },
      resolve: async (_parent, args, ctx) => {
        const thread = await ctx.db.thread.findOne({
          where: {
            id: args.threadId,
          },
          include: {
            comments: true,
          },
        })

        if (!thread) throw new Error('Thread not found.')

        if (thread.comments.length !== 0) {
          throw new Error('Cannot delete a thread containing comments.')
        }

        return ctx.db.thread.delete({
          where: {
            id: args.threadId,
          },
        })
      },
    })

    t.field('createComment', {
      type: 'Comment',
      args: {
        threadId: intArg({ required: true }),
        body: stringArg({ required: true }),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request
        if (!userId) {
          throw new Error('You must be logged in to post comments.')
        }

        const thread = await ctx.db.thread.findOne({
          where: { id: args.threadId },
        })
        if (!thread) {
          throw new NotFoundError('thread')
        }

        const post = await ctx.db.post.findOne({
          where: {
            id: thread.postId,
          },
          include: {
            author: true,
          },
        })

        if (!post) {
          throw new NotFoundError('post')
        }

        const comment = await ctx.db.comment.create({
          data: {
            body: args.body,
            author: {
              connect: { id: userId },
            },
            thread: {
              connect: { id: thread.id },
            },
          },
          include: {
            author: true,
          },
        })

        if (comment.author.id !== post.author.id) {
          await transport.sendMail({
            from: 'robin@journaly.com',
            to: post.author.email,
            subject: "You've got feedback!",
            html: makeEmail(`
              <p>Great news! <strong>@${comment.author.handle}</strong> left you some feedback!</p>
              <p><strong>Journal entry:</strong> ${post.title}</p>
              <p><strong>Comment thread:</strong> "${thread.highlightedContent}"</p>
              <p><strong>Comment:</strong> "${comment.body}"</p>
              <p>Click <a href="https://${process.env.SITE_DOMAIN}/post/${post.id}">here</a> to go to your journal entry!</p>
            `),
          })
        }

        // TODO: Set up logging and check for successful `mailResponse`
        return comment
      },
    })
    t.field('updateComment', {
      type: 'Comment',
      args: {
        commentId: intArg({ required: true }),
        body: stringArg({ required: true }),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request
        if (!userId) throw new Error('You must be logged in to do that.')

        const [currentUser, originalComment] = await Promise.all([
          ctx.db.user.findOne({
            where: {
              id: userId,
            },
          }),
          ctx.db.comment.findOne({
            where: {
              id: args.commentId,
            },
          }),
        ])

        if (!currentUser) throw new Error('User not found.')
        if (!originalComment) throw new Error('Comment not found.')

        hasAuthorPermissions(originalComment, currentUser)

        const comment = await ctx.db.comment.update({
          data: {
            body: args.body,
          },
          where: {
            id: args.commentId,
          },
        })

        return comment
      },
    })
    t.field('deleteComment', {
      type: 'Comment',
      args: {
        commentId: intArg({ required: true }),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request
        if (!userId) throw new Error('You must be logged in to do that.')

        const currentUser = await ctx.db.user.findOne({
          where: {
            id: userId,
          },
        })

        if (!currentUser) throw new Error('User not found.')

        const originalComment = await ctx.db.comment.findOne({
          where: {
            id: args.commentId,
          },
        })

        if (!originalComment) throw new Error('Comment not found.')

        hasAuthorPermissions(originalComment, currentUser)

        const comment = await ctx.db.comment.delete({
          where: {
            id: args.commentId,
          },
        })

        return comment
      },
    })

    t.field('createPostComment', {
      type: 'PostComment',
      args: {
        postId: intArg({ required: true }),
        body: stringArg({ required: true }),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request
        if (!userId) {
          throw new Error('You must be logged in to post comments.')
        }

        const post = await ctx.db.post.findOne({
          where: {
            id: args.postId,
          },
          include: {
            author: true,
          },
        })

        if (!post) {
          throw new NotFoundError('post')
        }

        const postComment = await ctx.db.postComment.create({
          data: {
            body: args.body,
            author: {
              connect: { id: userId },
            },
            post: {
              connect: { id: post.id },
            },
          },
          include: {
            author: true,
          },
        })

        if (postComment.author.id !== post.author.id) {
          await transport.sendMail({
            from: 'robin@journaly.com',
            to: post.author.email,
            subject: "You've got feedback!",
            html: makeEmail(`
              <p>Great news! <strong>@${postComment.author.handle}</strong> left you some feedback!</p>
              <p><strong>Journal entry:</strong> ${post.title}</p>
              <p><strong>Comment:</strong> "${postComment.body}"</p>
              <p>Click <a href="https://${process.env.SITE_DOMAIN}/post/${post.id}">here</a> to go to your journal entry!</p>
            `),
          })
        }

        // TODO: Set up logging and check for successful `mailResponse`
        return postComment
      },
    })

    t.field('updatePostComment', {
      type: 'PostComment',
      args: {
        postCommentId: intArg({ required: true }),
        body: stringArg({ required: true }),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request
        if (!userId) throw new Error('You must be logged in to do that.')

        const [currentUser, originalPostComment] = await Promise.all([
          ctx.db.user.findOne({
            where: {
              id: userId,
            },
          }),
          ctx.db.postComment.findOne({
            where: {
              id: args.postCommentId,
            },
          }),
        ])

        if (!currentUser) throw new Error('User not found.')
        if (!originalPostComment) throw new Error('Comment not found.')

        hasAuthorPermissions(originalPostComment, currentUser)

        const postComment = await ctx.db.postComment.update({
          data: {
            body: args.body,
          },
          where: {
            id: args.postCommentId,
          },
        })

        return postComment
      },
    })
    t.field('deletePostComment', {
      type: 'PostComment',
      args: {
        postCommentId: intArg({ required: true }),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request
        if (!userId) throw new Error('You must be logged in to do that.')

        const currentUser = await ctx.db.user.findOne({
          where: {
            id: userId,
          },
        })

        if (!currentUser) throw new Error('User not found.')

        const originalPostComment = await ctx.db.postComment.findOne({
          where: {
            id: args.postCommentId,
          },
        })

        if (!originalPostComment) throw new Error('Comment not found.')

        hasAuthorPermissions(originalPostComment, currentUser)

        const postComment = await ctx.db.postComment.delete({
          where: {
            id: args.postCommentId,
          },
        })

        return postComment
      },
    })
  },
})
