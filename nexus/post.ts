import {
  arg,
  intArg,
  stringArg,
  booleanArg,
  objectType,
  extendType,
} from '@nexus/schema'

import {
  processEditorDocument,
  updatedThreadPositions,
  hasAuthorPermissions,
  NodeType,
  sendNewBadgeEmail,
} from './utils'
import { NotFoundError, NotAuthorizedError, ResolverError } from './errors'
import {
  PostStatus,
  BadgeType,
  PostUpdateInput,
  PrismaClient,
  LanguageRelation,
} from '@journaly/j-db-client'
import { EditorNode, ImageInput } from './inputTypes'

const assignPostCountBadges = async (
  db: PrismaClient,
  userId: number,
): Promise<void> => {
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
      orderBy: { createdAt: 'desc', },
      take: newBadgeCount
    })

    await Promise.all(newBadges.map(badge => {
      return sendNewBadgeEmail({
        badgeType: badge.type,
        user: badge.user
      })
    }))
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

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.body()
    t.model.excerpt()
    t.model.readTime()
    t.model.author()
    t.model.status()
    t.model.likes({ pagination: false })
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
    t.model.createdAt()
    t.model.updatedAt()
    t.model.bodySrc()
    t.model.images({ pagination: false })
    t.model.publishedAt()
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
              postId: parent.id
            }
          })
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

const PostQueries = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('posts', {
      type: 'Post',
      args: {
        status: arg({ type: 'PostStatus', required: true }),
        authorId: intArg({ required: true }),
      },
      resolve: async (_parent, args, ctx) => {
        return ctx.db.post.findMany({
          where: {
            author: { id: args.authorId },
            status: args.status,
          },
          orderBy: {
            publishedAt: 'desc',
          },
        })
      },
    })

    t.field('postById', {
      type: 'Post',
      args: {
        id: intArg({
          description: 'ID of the post to be retreived',
          required: true
        }),
      },
      resolve: async (_parent, args, ctx) => {
        const post = await ctx.db.post.findUnique({
          where: {
            id: args.id,
          },
        })

        if (!post) {
          throw new NotFoundError('Post')
        }

        if (post.status === 'DRAFT' && post.authorId !== ctx.request.userId) {
          throw new NotAuthorizedError()
        }

        return post
      },
    })

    t.field('feed', {
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
          description: 'Author IDs to filter posts by. No value means all languages.',
          required: false,
        }),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request

        const currentUser = await ctx.db.user.findUnique({
          where: {
            id: userId,
          },
          include: {
            following: true,
          },
        })

        const filterClauses = []
        if (!args.first) args.first = 10
        if (args.first > 50) args.first = 50

        if (args.languages) {
          const languageFilters = args.languages.map((language) => {
            return {
              language: {
                id: {
                  equals: language,
                },
              },
            }
          })

          filterClauses.push({
            OR: languageFilters,
          })
        }

        if (args.topics) {
          const topicFilters = args.topics.map((topic) => {
            return {
              postTopics: {
                some: {
                  topicId: {
                    equals: topic,
                  },
                },
              },
            }
          })

          filterClauses.push({
            OR: topicFilters,
          })
        }

        if (args.search) {
          filterClauses.push({
            OR: [
              {
                title: {
                  contains: args.search,
                  mode: 'insensitive',
                },
              },
              {
                body: {
                  contains: args.search,
                  mode: 'insensitive',
                },
              },
            ],
          })
        }

        if (currentUser && args.followedAuthors) {
          filterClauses.push({
            author: {
              followedBy: {
                some: { id: currentUser.id },
              },
            },
          })
        }

        const countQuery = ctx.db.post.count({
          where: {
            AND: filterClauses,
            status: {
              not: 'DRAFT',
            },
          },
        })

        const postQuery = ctx.db.post.findMany({
          where: {
            AND: filterClauses,
            status: {
              not: 'DRAFT',
            },
          },
          skip: args.skip,
          take: args.first,
          orderBy: {
            publishedAt: 'desc',
          },
        })

        const [count, posts] = await Promise.all([countQuery, postQuery])
        return {
          count,
          posts,
        }
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
        images: ImageInput.asArg({ list: true, nullable: true }),
      },
      resolve: async (_parent, args, ctx) => {
        const { title, body, languageId, status, images } = args
        const { userId } = ctx.request
        const isPublished = status === 'PUBLISHED'

        if (!body) {
          throw new ResolverError('We need a body!', {})
        }

        const user = await ctx.db.user.findUnique({
          where: {
            id: userId
          },
          include: {
            languages: true,
          }
        })

        if (!user) throw new Error("User not found")

        const userLanguageLevel = user.languages.filter((language: LanguageRelation) => language.languageId === languageId)[0].level

        const post = await ctx.db.post.create({
          data: {
            language: { connect: { id: languageId } },
            author: { connect: { id: userId } },
            title,
            status,
            publishedAt: isPublished ? new Date().toISOString() : null,
            publishedLanguageLevel: userLanguageLevel,
            postCommentSubscriptions: {
              create: [
                {
                  user: { connect: { id: userId } },
                }
              ]
            },
            ...processEditorDocument(body),
          },
        })

        if (images) {
          const insertPromises = []

          for (let image of images) {
            if (image.imageRole === 'HEADLINE') {
              insertPromises.push(
                ctx.db.image.create({
                  data: {
                    ...image,
                    post: {
                      connect: {
                        id: post.id,
                      },
                    },
                  },
                }),
              )
            }
          }
          await Promise.all(insertPromises)
        }

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

        if (isPublished) await assignPostCountBadges(ctx.db, userId)

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
        images: ImageInput.asArg({ list: true, nullable: true }),
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
            }
          }),
          ctx.db.post.findUnique({
            where: {
              id: args.postId,
            },
            include: {
              threads: true,
            },
          }),
        ])

        if (!currentUser) throw new NotFoundError('User')
        if (!originalPost) throw new NotFoundError('Post')

        hasAuthorPermissions(originalPost, currentUser)

        // Actually make the change in the DB
        let data: PostUpdateInput = {}
        if (args.title) {
          data.title = args.title
        }

        if (args.languageId) {
          data.language = { connect: { id: args.languageId } }
        }

        if (args.status) {
          data.status = args.status
        }

        if (args.body) {
          data = { ...data, ...processEditorDocument(args.body) }

          const newThreadPositions = updatedThreadPositions(
            JSON.parse(originalPost.bodySrc) as NodeType[],
            args.body,
            originalPost.threads
          )

          await Promise.all(newThreadPositions.map(({
            id,
            startIndex,
            endIndex,
            archived
          }) => {
            if (archived) {
              return new Promise(res => res())
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
          }))
        }

        const languageId = args.languageId  || originalPost.languageId
        const userLanguageLevel = currentUser.languages.filter((language: LanguageRelation) => language.languageId === languageId)[0].level
        data.publishedLanguageLevel = userLanguageLevel
        
        if (args.status === 'PUBLISHED' && !originalPost.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }

        if (args.images) {
          const headlineImage = args.images.find((i) => i.imageRole === 'HEADLINE')

          if (headlineImage) {
            await ctx.db.image.deleteMany({
              where: {
                postId: args.postId,
                imageRole: 'HEADLINE',
              },
            })

            await ctx.db.image.create({
              data: {
                ...headlineImage,
                post: {
                  connect: {
                    id: args.postId,
                  },
                },
              },
            })
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

        if (post.status === PostStatus.PUBLISHED)
          await assignPostCountBadges(ctx.db, userId)

        return post
      },
    })

    t.field('deletePost', {
      type: 'Post',
      args: {
        postId: intArg({ required: true })
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
          },
        })

        if (!post) throw new Error('Post not found.');

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
          ctx.db.postLike.deleteMany({
            where: {
              post: {
                id: postId,
              },
            },
          }),
          ctx.db.image.deleteMany({
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
  },
})

export default [
  PostTopic,
  Post,
  PostPage,
  PostQueries,
  PostMutations,
]
