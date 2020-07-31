import { schema } from 'nexus'

import { hasPostPermissions } from './utils'
import { transport, makeEmail } from '../lib/mail'
const { intArg, stringArg } = schema

schema.objectType({
  name: 'Image',
  definition(t) {
    t.model.id()
    t.model.smallSize()
  },
})

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
    t.model.authorId()
  },
})

schema.objectType({
  name: 'Location',
  definition(t) {
    t.model.id()
    t.model.country()
    t.model.city()
  },
})

schema.objectType({
  name: 'PostLike',
  definition(t) {
    t.model.id()
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
    t.field('createComment', {
      type: 'Comment',
      args: {
        threadId: intArg({ required: true }),
        body: stringArg({ required: true }),
      },
      resolve: async (_parent, args, ctx) => {
        /**
         * 1. Grab the commenter's `userId`.
         */
        const { userId } = ctx.request
        if (!userId) {
          throw new Error('You must be logged in to post comments.')
        }

        /**
         * 2. Find the `thread` that this comment belongs to.
         */
        const thread = await ctx.db.thread.findOne({
          where: { id: args.threadId },
        })
        if (!thread) {
          throw new Error(`Unable to find thread with id ${args.threadId}`)
        }

        /**
         * 3. Find the `post` that comment `thread` belongs to.
         * 4. Get the `author` of that post, too.
         */
        const post = await ctx.db.post.findOne({
          where: {
            id: thread.postId,
          },
        })
        const postAuthor = post.author

        /**
         * 5. Create the comment.
         * 6. Get the `author` of the comment, too.
         */
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
        })
        const commentAuthor = comment.author.name

        /**
         * 7. Create and send an email notification.
         */
        const mailResponse = await transport.sendMail({
          from: 'robin@journaly.com',
          to: postAuthor.email,
          subject: "You've got feedback!",
          html: makeEmail(`
            Great news! ${commentAuthor} left you some feedback on your journal entry: ${post.title}.
            \n\n
            Comment thread: ${thread.highlightedContent}
            \n\n
            Comment: ${comment.body}
            \n\n
            Click <a href="${process.env.FRONTEND_URL}/post/${post.id}">here</a> to go to your journal entry!
          `),
        })
        if (mailResponse) {
          return { message: 'Email sent!' }
        } else {
          throw new Error('Something went wrong sending the email notification!')
        }
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

        hasPostPermissions(originalComment, currentUser)

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

        hasPostPermissions(originalComment, currentUser)

        const comment = await ctx.db.comment.delete({
          where: {
            id: args.commentId,
          },
        })

        return comment
      },
    })
  },
})
