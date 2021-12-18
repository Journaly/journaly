import {
  arg,
  intArg,
  stringArg,
  booleanArg,
  objectType,
  extendType,
} from 'nexus'

import {
  processEditorDocument,
  assignBadge,
  updatedThreadPositions,
  hasAuthorPermissions,
  NodeType,
  sendNewBadgeEmail,
  generateThumbbusterUrl,
  getThumbusterVars,
  generatePostPrivateShareId,
  createInAppNotification,
} from './utils'


import { NotFoundError, NotAuthorizedError, ResolverError } from './errors'
import {
  Prisma,
  Post,
  PostStatus,
  BadgeType,
  PrismaClient,
  LanguageRelation,
  User,
  UserRole,
  EmailVerificationStatus,
  InAppNotificationType,
} from '@journaly/j-db-client'
import { EditorNode, HeadlineImageInput } from './inputTypes'
import { POST_BUMP_LIMIT } from '../constants'

const assignPostCountBadges = async (db: PrismaClient, userId: number): Promise<void> => {
  // Use a raw query here because we'll soon have a number of post count
  // badges and we could end up with quite a bit of back and fourth
  // querying, whereas here we can just make one roundtrip.
  const newBadgeCount = await db.$executeRaw`
    WITH posts AS (
        SELECT COUNT(*) AS count
        FROM "Post"
        WHERE
          "authorId" = ${userId}
          AND "status" = ${PostStatus.PUBLISHED}
    )
    INSERT INTO "UserBadge" ("type", "userId") (
      (
        SELECT
          ${BadgeType.TEN_POSTS}::"BadgeType" AS "type",
          ${userId}::integer AS "userId"
        FROM posts WHERE posts.count >= 10
      ) UNION (
        SELECT
          ${BadgeType.ONEHUNDRED_POSTS} AS "type",
          ${userId} AS "userId"
        FROM posts WHERE posts.count >= 100
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

const PostTopic = objectType({
  name: 'PostTopic',
  definition(t) {
    t.model.id()
    t.model.post()
    t.model.topic()
  },
})

const PostObjectType = objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.body()
    t.model.excerpt()
    t.model.readTime()
    t.model.author()
    t.model.authorId()
    t.model.status()
    t.model.claps({ pagination: false })
    t.model.threads({ pagination: false })
    t.model.postTopics({ type: 'PostTopic', pagination: false })
    t.model.postComments({
      pagination: false,
      ordering: {
        createdAt: true,
      },
    })
    t.model.language()
    t.model.publishedLanguageLevel()
    t.model.privateShareId()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.bodySrc()
    t.model.headlineImage()
    t.model.publishedAt()
    t.model.bumpedAt()
    t.model.bumpCount()
    t.int('commentCount', {
      resolve: async (parent, _args, ctx, _info) => {
        const [threadCommentCount, postCommentCount] = await Promise.all([
          ctx.db.comment.count({
            where: {
              thread: {
                postId: parent.id,
              },
            },
          }),
          ctx.db.postComment.count({
            where: {
              postId: parent.id,
            },
          }),
        ])
        return threadCommentCount + postCommentCount
      },
    })
  },
})

// Represents a paginated set of posts.
// Includes 1 page and the total number of posts.
// posts: the returned page after filtering.
// count: the total posts matching the filter.
const PostPage = objectType({
  name: 'PostPage',
  definition(t) {
    t.list.field('posts', {
      type: 'Post',
    })
    t.int('count')
  },
})

const InitiatePostImageUploadResponse = objectType({
  name: 'InitiatePostImageUploadResponse',
  definition(t) {
    t.string('uploadUrl', { description: 'URL for the client to PUT an image to' })
    t.string('checkUrl', { description: 'polling goes here' })
    t.string('finalUrlLarge', { description: 'final url of the large size transform' })
    t.string('finalUrlSmall', { description: 'final url of the mall size transform' })
  },
})

const InitiateInlinePostImageUploadResponse = objectType({
  name: 'InitiateInlinePostImageUploadResponse',
  definition(t) {
    t.string('uploadUrl', { description: 'URL for the client to PUT an image to' })
    t.string('checkUrl', { description: 'polling goes here' })
    t.string('finalUrl', { description: 'final url of the transform' })
  },
})

const PostQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('postById', {
      type: 'Post',
      args: {
        id: intArg({
          description: 'ID of the post to be retreived',
          required: false,
        }),
        privateShareId: stringArg({
          description: 'Private share ID of the post to be retrived',
          required: false,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request

        if (!args.id && !args.privateShareId) {
          throw new Error('A post id or privateShareId must be provided to the postById query')
        }

        let post
        if (args.id) {
          post = await ctx.db.post.findUnique({
            where: {
              id: args.id,
            },
            include: {
              author: true,
            },
          })
          if (post?.status === PostStatus.PRIVATE && post?.authorId !== userId) {
            throw new NotAuthorizedError()
          }
        }
        if (args.privateShareId) {
          post = await ctx.db.post.findUnique({
            where: {
              privateShareId: args.privateShareId,
            },
          })
        }

        if (!post) {
          throw new NotFoundError('Post')
        }

        if (post.status === 'DRAFT' && post.authorId !== ctx.request.userId) {
          throw new NotAuthorizedError()
        }

        return post
      },
    })

    t.field('posts', {
      type: 'PostPage',
      args: {
        search: stringArg({
          description: 'Search phrase to filter posts by.',
          required: false,
        }),
        languages: intArg({
          description: 'Language IDs to filter posts by. No value means all languages.',
          required: false,
          list: true,
        }),
        topics: intArg({
          description: 'topics IDs to filter posts by. No value means all topics.',
          required: false,
          list: true,
        }),
        skip: intArg({
          description: 'Offset into the feed post list to return',
          required: true,
        }),
        first: intArg({
          description: 'Number of posts to return',
          required: true,
        }),
        followedAuthors: booleanArg({
          description: 'Author IDs to filter posts by. No value means all authors.',
          required: false,
        }),
        needsFeedback: booleanArg({
          description: 'If true, return only posts with 0 comments.',
          required: false,
        }),
        hasInteracted: booleanArg({
          description: 'If true, return only posts that the user has commented on in any way.',
          required: false,
        }),
        status: arg({
          type: 'PostStatus',
          description:
            'The post status, indicating Published or Draft. Param is ignored unless the current user is specified in `authorId`',
          required: true,
        }),
        authorId: intArg({
          description: 'Return posts by a given author.',
          required: false,
        }),
        savedPosts: booleanArg({
          description: 'If true, return only posts that the user has saved.',
          required: false,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request

        const currentUser = userId
          ? await ctx.db.user.findUnique({
              where: {
                id: userId,
              },
              include: {
                following: true,
              },
            })
          : null

        if (!args.first) args.first = 10
        if (args.first > 50) args.first = 50

        const joins = []
        const where = []

        if (args.languages?.length) {
          where.push(Prisma.sql`p."languageId" IN (${Prisma.join(args.languages)})`)
        }

        if (args.topics?.length) {
          joins.push(Prisma.sql`
            INNER JOIN (
              SELECT DISTINCT pt."postId"
              FROM "PostTopic" AS pt
              WHERE pt."topicId" IN (${Prisma.join(args.topics)})
            ) ptc ON p.id = ptc."postId"
          `)
        }

        if (args.search) {
          const likeExpr = `%${args.search}%`
          where.push(Prisma.sql`
            p.title ILIKE ${likeExpr}
            OR p.body ILIKE ${likeExpr}
          `)
        }

        if (currentUser && args.followedAuthors) {
          const followingIds = currentUser.following.map((user: User) => user.id)
          where.push(Prisma.sql`p."authorId" IN (${Prisma.join(followingIds)})`)
        }

        if (currentUser && args.savedPosts) {
          joins.push(Prisma.sql`
            INNER JOIN "_UserSavedPosts" as usp
                    ON usp."B" = ${currentUser.id} AND usp."A" = p.id
          `)
        }

        if (args.needsFeedback) {
          joins.push(
            Prisma.sql`LEFT JOIN "PostComment" AS pc ON pc."postId" = p.id`,
            Prisma.sql`LEFT JOIN "Thread" AS t ON t."postId" = p.id`,
          )
          where.push(Prisma.sql`pc.id IS NULL`, Prisma.sql`t.id IS NULL`)
        }

        if (currentUser && args.hasInteracted) {
          joins.push(Prisma.sql`
            INNER JOIN (
              (
                SELECT hi_pc."postId" as "postId"
                FROM "PostComment" AS hi_pc
                WHERE hi_pc."authorId" = ${currentUser.id}
              )
              UNION
              (
                SELECT hi_t."postId" as "postId"
                FROM "Comment" AS hi_c
                JOIN "Thread" AS hi_t ON hi_c."threadId" = hi_t.id
                WHERE hi_c."authorId" = ${currentUser.id}
              )
            ) "interactedPostIds" ON p.id = "interactedPostIds"."postId"
          `)
        }

        if (args.authorId) {
          where.push(Prisma.sql`p."authorId" = ${args.authorId}`)
        }

        // Only logged in users looking at their own posts may filter on status,
        // everyone else _must_ see only published posts.
        if (!currentUser || args.authorId !== currentUser.id) {
          where.push(Prisma.sql`p."status" = 'PUBLISHED'`)
        } else if (args.status) {
          where.push(Prisma.sql`p."status" = ${args.status}`)
        }

        let whereQueryFragment = where[0] ? Prisma.sql`WHERE (${where[0]})` : Prisma.empty
        for (let i = 1; i < where.length; i++) {
          whereQueryFragment = Prisma.sql`${whereQueryFragment} AND (${where[i]})`
        }

        let joinQueryFragment = joins[0] || Prisma.empty
        for (let i = 1; i < joins.length; i++) {
          joinQueryFragment = Prisma.sql`${joinQueryFragment}\n${joins[i]}`
        }

        const queryPred = Prisma.sql`
          FROM "public"."Post" AS p
          ${joinQueryFragment}
          ${whereQueryFragment}
        `

        const [posts, [{ count }]] = await Promise.all([
          ctx.db.$queryRaw<Post[]>`
            SELECT p.* ${queryPred}
            ORDER BY p."bumpedAt" DESC
            LIMIT ${args.first}
            OFFSET ${args.skip};
          `,
          ctx.db.$queryRaw<{ count: number }[]>`SELECT COUNT(*) ${queryPred};`,
        ])

        return { posts, count }
      },
    })
  },
})

const PostMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createPost', {
      type: 'Post',
      args: {
        title: stringArg({ required: true }),
        body: EditorNode.asArg({ list: true, required: true }),
        languageId: intArg({ required: true }),
        topicIds: intArg({ list: true, required: false }),
        status: arg({ type: 'PostStatus', required: true }),
        headlineImage: HeadlineImageInput.asArg({ required: true }),
      },
      resolve: async (_parent, args, ctx) => {
        const { title, body, languageId, status, headlineImage } = args
        const { userId } = ctx.request
        const isPublished = status === PostStatus.PUBLISHED
        const isPrivate = status === PostStatus.PRIVATE

        if (!body) {
          throw new ResolverError('We need a body!', {})
        }

        const user = await ctx.db.user.findUnique({
          where: {
            id: userId,
          },
          include: {
            languages: true,
            auth: true,
            followedBy: true,
          },
        })

        if (!user?.auth) throw new Error('User not found')

        if (
          (isPublished || isPrivate) &&
          user.auth.emailVerificationStatus !== EmailVerificationStatus.VERIFIED
        ) {
          throw new Error('Please verify your email address in order to begin publishing posts')
        }

        const userLanguageLevel = user.languages.filter(
          (language: LanguageRelation) => language.languageId === languageId,
        )[0].level

        let privateShareId = null
        if (isPrivate) privateShareId = generatePostPrivateShareId()

        const post = await ctx.db.post.create({
          data: {
            language: { connect: { id: languageId } },
            author: { connect: { id: userId } },
            title,
            status,
            privateShareId,
            publishedAt: isPublished ? new Date() : null,
            bumpedAt: isPublished ? new Date() : null,
            publishedLanguageLevel: userLanguageLevel,
            postCommentSubscriptions: {
              create: [
                {
                  user: { connect: { id: userId } },
                },
              ],
            },
            headlineImage: {
              create: {
                ...headlineImage,
              },
            },
            ...processEditorDocument(body),
          },
        })

        if (args.topicIds) {
          const insertPromises = args.topicIds.map((topicId) => {
            return ctx.db.postTopic.create({
              data: {
                post: { connect: { id: post.id } },
                topic: { connect: { id: topicId } },
              },
            })
          })

          await Promise.all(insertPromises)
        }

        if (isPublished) {
          const promises: Promise<unknown>[] = user.followedBy.map((follower) => {
            return createInAppNotification(ctx.db, {
              userId: follower.id,
              type: InAppNotificationType.NEW_POST,
              key: {},
              subNotification: {
                postId: post.id,
              },
            })
          })
          promises.push(assignPostCountBadges(ctx.db, userId))
          await Promise.all(promises)
        }

        return post
      },
    })

    t.field('updatePost', {
      type: 'Post',
      args: {
        postId: intArg({ required: true }),
        title: stringArg({ required: false }),
        languageId: intArg({ required: false }),
        topicIds: intArg({ list: true, required: false }),
        body: EditorNode.asArg({ list: true, required: false }),
        status: arg({ type: 'PostStatus', required: false }),
        headlineImage: HeadlineImageInput.asArg({ required: true }),
      },
      resolve: async (_parent, args, ctx) => {
        // Check user can actually do this
        const { userId } = ctx.request
        if (!userId) throw new NotAuthorizedError()

        const [currentUser, originalPost] = await Promise.all([
          ctx.db.user.findUnique({
            where: {
              id: userId,
            },
            include: {
              languages: true,
              membershipSubscription: true,
              followedBy: true,
            },
          }),
          ctx.db.post.findUnique({
            where: {
              id: args.postId,
            },
            include: {
              threads: true,
              headlineImage: true,
            },
          }),
        ])

        if (!currentUser) throw new NotFoundError('User')
        if (!originalPost) throw new NotFoundError('Post')

        hasAuthorPermissions(originalPost, currentUser)

        // Actually make the change in the DB
        let data: Prisma.PostUpdateInput = {}
        if (args.title) {
          data.title = args.title
        }

        if (args.languageId) {
          data.language = { connect: { id: args.languageId } }
        }

        if (args.status) {
          if (args.status === PostStatus.PRIVATE) {
            data.privateShareId = generatePostPrivateShareId()
          }
          data.status = args.status
        }

        if (args.body) {
          data = { ...data, ...processEditorDocument(args.body) }

          const newThreadPositions = updatedThreadPositions(
            JSON.parse(originalPost.bodySrc) as NodeType[],
            args.body,
            originalPost.threads,
          )

          await Promise.all<unknown>(
            newThreadPositions.map(({ id, startIndex, endIndex, archived }) => {
              if (archived) {
                return new Promise<void>((res) => res())
              } else if (startIndex === -1) {
                return ctx.db.thread.update({
                  where: { id },
                  data: { archived: true },
                })
              } else {
                return ctx.db.thread.update({
                  where: { id },
                  data: { startIndex, endIndex },
                })
              }
            }),
          )

          if (data.body === originalPost.body) {
            await assignBadge(ctx.db, userId, BadgeType.ODRADEK)
          }
        }

        const languageId = args.languageId || originalPost.languageId
        const userLanguageLevel = currentUser.languages.filter(
          (language: LanguageRelation) => language.languageId === languageId,
        )[0].level
        data.publishedLanguageLevel = userLanguageLevel

        if (args.status === 'PUBLISHED' && !originalPost.publishedAt) {
          data.publishedAt = new Date()
          data.bumpedAt = new Date()
        }

        if (args.headlineImage.smallSize !== originalPost.headlineImage.smallSize) {
          const headlineImage = await ctx.db.headlineImage.create({
            data: {
              smallSize: args.headlineImage.smallSize,
              largeSize: args.headlineImage.largeSize,
            },
          })
          data.headlineImage = {
            connect: { id: headlineImage.id },
          }
        }

        if (args.topicIds) {
          await ctx.db.postTopic.deleteMany({
            where: { postId: args.postId },
          })

          const insertPromises = args.topicIds.map((topicId) => {
            return ctx.db.postTopic.create({
              data: {
                post: { connect: { id: args.postId } },
                topic: { connect: { id: topicId } },
              },
            })
          })

          await Promise.all(insertPromises)
        }

        const post = await ctx.db.post.update({
          where: { id: args.postId },
          data,
        })

        if (args.status === 'PUBLISHED' && !originalPost.publishedAt) {
          const promises: Promise<unknown>[] = currentUser.followedBy.map((follower) => {
            return createInAppNotification(ctx.db, {
              userId: follower.id,
              type: InAppNotificationType.NEW_POST,
              key: {},
              subNotification: {
                postId: post.id,
              },
            })
          })
          promises.push(assignPostCountBadges(ctx.db, userId))
          await Promise.all(promises)
        }

        return post
      },
    })

    t.field('deletePost', {
      type: 'Post',
      args: {
        postId: intArg({ required: true }),
      },
      resolve: async (_parent, args, ctx) => {
        const { postId } = args
        const { userId } = ctx.request
        if (!userId) throw new NotAuthorizedError()

        const post = await ctx.db.post.findUnique({
          where: {
            id: postId,
          },
          select: {
            id: true,
            authorId: true,
            headlineImage: true,
          },
        })

        if (!post) throw new Error('Post not found.')

        const currentUser = await ctx.db.user.findUnique({
          where: {
            id: userId,
          },
        })

        if (!currentUser) {
          throw new Error('User not found.')
        }

        hasAuthorPermissions(post, currentUser)

        const deleteFirstPhasePromises = [
          ctx.db.commentThanks.deleteMany({
            where: {
              comment: {
                thread: {
                  post: {
                    id: postId,
                  },
                },
              },
            },
          }),
          ctx.db.threadSubscription.deleteMany({
            where: {
              thread: {
                post: {
                  id: postId,
                },
              },
            },
          }),
          ctx.db.postCommentSubscription.deleteMany({
            where: {
              post: {
                id: postId,
              },
            },
          }),
          ctx.db.postCommentThanks.deleteMany({
            where: {
              PostComment: {
                post: {
                  id: postId,
                },
              },
            },
          }),
          ctx.db.postTopic.deleteMany({
            where: {
              post: {
                id: postId,
              },
            },
          }),
          ctx.db.postClap.deleteMany({
            where: {
              post: {
                id: postId,
              },
            },
          }),
        ]

        await Promise.all(deleteFirstPhasePromises)

        await ctx.db.comment.deleteMany({
          where: {
            thread: {
              post: {
                id: postId,
              },
            },
          },
        })

        const deleteSecondPhasePromises = [
          ctx.db.postComment.deleteMany({
            where: {
              post: {
                id: postId,
              },
            },
          }),
          ctx.db.thread.deleteMany({
            where: {
              post: {
                id: postId,
              },
            },
          }),
        ]

        await Promise.all(deleteSecondPhasePromises)

        return ctx.db.post.delete({
          where: {
            id: postId,
          },
        })
      },
    })

    t.field('initiatePostImageUpload', {
      type: 'InitiatePostImageUploadResponse',
      resolve: async (_parent, _args, ctx) => {
        const { userId } = ctx.request
        const [transformBucket, cdnDomain] = getThumbusterVars()

        const currentUser = await ctx.db.user.findUnique({
          where: {
            id: userId,
          },
        })

        if (!currentUser) {
          throw new NotAuthorizedError()
        }

        const [uuid, uploadUrl] = await generateThumbbusterUrl('post-image')

        return {
          uploadUrl,
          checkUrl: `https://${transformBucket}.s3.us-east-2.amazonaws.com/post-image/${uuid}-large`,
          finalUrlLarge: `https://${cdnDomain}/post-image/${uuid}-large`,
          finalUrlSmall: `https://${cdnDomain}/post-image/${uuid}-small`,
        }
      },
    })

    t.field('initiateInlinePostImageUpload', {
      type: 'InitiateInlinePostImageUploadResponse',
      resolve: async (_parent, _args, ctx) => {
        const { userId } = ctx.request
        const [transformBucket, cdnDomain] = getThumbusterVars()

        const currentUser = await ctx.db.user.findUnique({
          where: {
            id: userId,
          },
        })

        if (!currentUser) {
          throw new NotAuthorizedError()
        }

        const [uuid, uploadUrl] = await generateThumbbusterUrl('inline-post-image')

        return {
          uploadUrl,
          checkUrl: `https://${transformBucket}.s3.us-east-2.amazonaws.com/inline-post-image/${uuid}-default`,
          finalUrl: `https://${cdnDomain}/inline-post-image/${uuid}-default`,
        }
      },
    })

    t.field('bumpPost', {
      type: 'Post',
      args: {
        postId: intArg({ required: true }),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request
        if (!userId) throw new NotAuthorizedError()

        const [currentUser, post] = await Promise.all([
          ctx.db.user.findUnique({
            where: {
              id: userId,
            },
            include: {
              membershipSubscription: true,
            },
          }),
          ctx.db.post.findUnique({
            where: {
              id: args.postId,
            },
          }),
        ])

        if (!currentUser) throw new NotFoundError('User')
        if (!post) throw new NotFoundError('Post')

        const canBump =
          (currentUser.membershipSubscription?.expiresAt &&
            currentUser.membershipSubscription.expiresAt > new Date()) ||
          currentUser.userRole === UserRole.ADMIN ||
          currentUser.userRole === UserRole.MODERATOR

        hasAuthorPermissions(post, currentUser)

        if (!canBump) {
          throw new Error('Only Journaly Premium members can access this feature')
        }

        if (post.bumpCount >= POST_BUMP_LIMIT) {
          throw new Error("You've already reached your limit for bumping this post")
        }

        return ctx.db.post.update({
          where: {
            id: args.postId,
          },
          data: {
            bumpedAt: new Date(),
            bumpCount: post.bumpCount + 1,
          },
        })
      },
    })
  },
})

export default [
  PostTopic,
  PostObjectType,
  PostPage,
  InitiatePostImageUploadResponse,
  InitiateInlinePostImageUploadResponse,
  PostQueries,
  PostMutations,
]
