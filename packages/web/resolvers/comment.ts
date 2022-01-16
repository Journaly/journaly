import {
  intArg,
  stringArg,
  objectType,
  extendType,
} from 'nexus'
import { add, isPast } from 'date-fns'

import {
  User,
  InAppNotificationType,
  EmailNotificationType,
  BadgeType,
  LanguageLevel,
  PrismaClient,
} from '@journaly/j-db-client'

import {
  hasAuthorPermissions,
  createEmailNotification,
  createInAppNotification,
  assignBadge,
  UserWithRels,
  ThreadWithRels,
  sendNewBadgeEmail,
} from './utils'
import { NotFoundError } from './errors'

const assignCommentCountBadges = async (db: PrismaClient, userId: number): Promise<void> => {
  // Use a raw query here because we'll soon have a number of post count
  // badges and we could end up with quite a bit of back and fourth
  // querying, whereas here we can just make one roundtrip.
  const newBadgeCount = await db.$executeRaw`
    WITH comments AS (
        SELECT COUNT(*) AS count
        FROM "Comment"
        WHERE
          "authorId" = ${userId}
    )
    INSERT INTO "UserBadge" ("type", "userId") (
      (
        SELECT
          ${BadgeType.TEN_COMMENTS}::"BadgeType" AS "type",
          ${userId}::integer AS "userId"
        FROM comments WHERE comments.count >= 10
      ) UNION (
        SELECT
          ${BadgeType.FIFTY_COMMENTS} AS "type",
          ${userId} AS "userId"
        FROM comments WHERE comments.count >= 20
      ) UNION (
        SELECT
          ${BadgeType.ONEHUNDRED_COMMENTS} AS "type",
          ${userId} AS "userId"
        FROM comments WHERE comments.count >= 50
      ) UNION (
        SELECT
          ${BadgeType.TWOHUNDREDFIFTY_COMMENTS} AS "type",
          ${userId} AS "userId"
        FROM comments WHERE comments.count >= 75
      ) UNION (
        SELECT
          ${BadgeType.FIVEHUNDRED_COMMENTS} AS "type",
          ${userId} AS "userId"
        FROM comments WHERE comments.count >= 100
      ) UNION (
        SELECT
          ${BadgeType.ONETHOUSAND_COMMENTS} AS "type",
          ${userId} AS "userId"
        FROM comments WHERE comments.count >= 150
      )
    )
    ON CONFLICT DO NOTHING
  `
  // This is a horrible hack because of this bug in prisma where `RETURNING`
  // is basically ignored and we get a row count instead. See:
  // https://github.com/prisma/prisma/issues/2208 . This is fixed in newer
  // prisma versions by replacing `db.raw` with `db.queryRaw` but we don't have
  // new prisma versions because nexus is dead. Woo!
  if (newBadgeCount) {
    const newBadges = await db.userBadge.findMany({
      where: { user: { id: userId } },
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
}

const Thread = objectType({
  name: 'Thread',
  definition(t) {
    t.model.id()
    t.model.archived()
    t.model.startIndex()
    t.model.endIndex()
    t.model.highlightedContent()
    t.model.postId()
    t.model.comments({
      pagination: false,
      ordering: {
        createdAt: true,
      },
    })
  },
})

const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.model.id()
    t.model.author()
    t.model.body()
    t.model.createdAt()
    t.model.authorLanguageLevel()
    t.model.thanks({ pagination: false })
    t.model.thread()
  },
})

const PostComment = objectType({
  name: 'PostComment',
  definition(t) {
    t.model.id()
    t.model.author()
    t.model.body()
    t.model.createdAt()
    t.model.authorLanguageLevel()
  },
})


type CreateCommentArg = {
  thread: ThreadWithRels<{
    subscriptions: { user: true }
    post: true
  }>
  author: UserWithRels<{ languages: true }>
  body: string
  db: PrismaClient
}

const createComment = async ({ db, thread, author, body }: CreateCommentArg) => {
  const authorHasPostLanguage =
    author && author.languages.find((language) => language.languageId === thread.post.languageId)

  const authorLanguageLevel = authorHasPostLanguage?.level || LanguageLevel.BEGINNER

  const comment = await db.comment.create({
    data: {
      body,
      authorLanguageLevel,
      author: {
        connect: { id: author.id },
      },
      thread: {
        connect: { id: thread.id },
      },
    },
    include: {
      author: true,
    },
  })

  const subData = {
    user: { connect: { id: author.id } },
    thread: { connect: { id: thread.id } },
  }
  await db.threadSubscription.upsert({
    create: subData,
    update: subData,
    where: {
      userId_threadId: {
        threadId: thread.id,
        userId: author.id,
      },
    },
  })

  const subscriptions = await db.threadSubscription.findMany({
    where: { threadId: thread.id },
    include: { user: true },
  })

  if (!subscriptions) throw new Error('Error fetching updated subscriptions')

  await Promise.all(
    subscriptions.map(async ({ user }: { user: User }) => {
      if (user.id === author.id) {
        // This is the user creating the comment, do not notify them.
        return new Promise((res) => res(null))
      }

      await createEmailNotification(db, user, {
        type: EmailNotificationType.THREAD_COMMENT,
        comment,
      })

      await createInAppNotification(db, {
        userId: user.id,
        type: InAppNotificationType.THREAD_COMMENT,
        key: { postId: thread.post.id },
        subNotification: {
          commentId: comment.id,
        },
      })
    }),
  )

  // Check to see if we should assign a badge
  if (thread.post.authorId !== author.id && isPast(add(thread.post.createdAt, { weeks: 1 }))) {
    await assignBadge(db, author.id, BadgeType.NECROMANCER)
  }

  return comment
}

const CommentMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createThread', {
      type: 'Thread',
      args: {
        postId: intArg({ required: true }),
        startIndex: intArg({ required: true }),
        endIndex: intArg({ required: true }),
        highlightedContent: stringArg({ required: true }),
        body: stringArg({ required: true }),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request

        if (!userId) {
          throw new Error('You must be logged in to create threads.')
        }

        const author = await ctx.db.user.findUnique({
          where: { id: userId },
          include: {
            languages: true,
          },
        })

        if (!author) {
          throw new NotFoundError('user')
        }

        const { postId, startIndex, endIndex, highlightedContent, body } = args
        const post = await ctx.db.post.findUnique({ where: { id: postId } })

        if (!post) {
          throw new Error(`Unable to find post with id ${postId}`)
        }

        const thread = await ctx.db.thread.create({
          data: {
            startIndex,
            endIndex,
            highlightedContent,
            post: { connect: { id: postId } },
          },
          include: {
            subscriptions: {
              include: {
                user: true,
              },
            },
            post: {
              include: {
                author: true,
              },
            },
          },
        })

        // Subscribe the post author to every thread made on their posts
        const subData = {
          user: { connect: { id: post.authorId } },
          thread: { connect: { id: thread.id } },
        }
        await ctx.db.threadSubscription.upsert({
          create: subData,
          update: subData,
          where: {
            userId_threadId: {
              userId: post.authorId,
              threadId: thread.id,
            },
          },
        })

        await createComment({
          db: ctx.db,
          thread,
          author,
          body,
        })

        return thread
      },
    })

    t.field('deleteThread', {
      type: 'Thread',
      args: {
        threadId: intArg({ required: true }),
      },
      resolve: async (_parent, args, ctx) => {
        const thread = await ctx.db.thread.findUnique({
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

        await ctx.db.threadSubscription.deleteMany({
          where: {
            threadId: thread.id,
          },
        })
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

        const thread = await ctx.db.thread.findUnique({
          where: { id: args.threadId },
          include: {
            subscriptions: {
              include: {
                user: true,
              },
            },
            post: {
              include: {
                author: true,
              },
            },
          },
        })
        if (!thread) {
          throw new NotFoundError('thread')
        }

        const author = await ctx.db.user.findUnique({
          where: { id: userId },
          include: {
            languages: true,
          },
        })

        if (!author) {
          throw new NotFoundError('user')
        }

        const promises: Promise<unknown>[] = [
          createComment({
            db: ctx.db,
            thread,
            author,
            body: args.body,
          }),
          assignCommentCountBadges(ctx.db, userId),
        ]

        return Promise.all(promises) 
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
          ctx.db.user.findUnique({
            where: {
              id: userId,
            },
          }),
          ctx.db.comment.findUnique({
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

        const currentUser = await ctx.db.user.findUnique({
          where: {
            id: userId,
          },
        })

        if (!currentUser) throw new Error('User not found.')

        const originalComment = await ctx.db.comment.findUnique({
          where: {
            id: args.commentId,
          },
          include: {
            thread: {
              include: {
                comments: true,
              },
            },
          },
        })

        if (!originalComment) throw new Error('Comment not found.')

        hasAuthorPermissions(originalComment, currentUser)

        const comment = await ctx.db.comment.delete({
          where: {
            id: args.commentId,
          },
        })

        if (originalComment.thread.comments.length <= 1) {
          await ctx.db.thread.delete({
            where: { id: originalComment.threadId },
          })
        }

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

        const post = await ctx.db.post.findUnique({
          where: {
            id: args.postId,
          },
          include: {
            author: true,
            postCommentSubscriptions: {
              include: {
                user: true,
              },
            },
          },
        })

        if (!post) {
          throw new NotFoundError('post')
        }

        const commentAuthor = await ctx.db.user.findUnique({
          where: { id: userId },
          include: {
            languages: true,
          },
        })

        const authorHasPostLanguage =
          commentAuthor &&
          commentAuthor.languages.find((language) => language.languageId === post.languageId)

        const authorLanguageLevel = authorHasPostLanguage?.level || LanguageLevel.BEGINNER

        const postComment = await ctx.db.postComment.create({
          data: {
            body: args.body,
            authorLanguageLevel,
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

        const subData = {
          user: { connect: { id: userId } },
          post: { connect: { id: post.id } },
        }

        await ctx.db.postCommentSubscription.upsert({
          create: subData,
          update: subData,
          where: {
            userId_postId: {
              userId,
              postId: post.id,
            },
          },
        })

        await Promise.all(
          post.postCommentSubscriptions.map(async ({ user }: { user: User }) => {
            if (user.id === userId) {
              // This is the user creating the comment, do not notify them.
              return
            }

            await createEmailNotification(ctx.db, user, {
              type: EmailNotificationType.POST_COMMENT,
              postComment,
            })

            await createInAppNotification(ctx.db, {
              userId: user.id,
              type: InAppNotificationType.POST_COMMENT,
              key: { postId: post.id },
              subNotification: {
                postCommentId: postComment.id,
              },
            })
          }),
        )

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
          ctx.db.user.findUnique({
            where: {
              id: userId,
            },
          }),
          ctx.db.postComment.findUnique({
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

        const currentUser = await ctx.db.user.findUnique({
          where: {
            id: userId,
          },
        })

        if (!currentUser) throw new Error('User not found.')

        const originalPostComment = await ctx.db.postComment.findUnique({
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

export default [
  Thread,
  Comment,
  PostComment,
  CommentMutations,
]
