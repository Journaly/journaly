import { schema } from 'nexus'

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
} from '.prisma/client/index'
import { EditorNode, ImageInput } from './inputTypes'

const assignPostCountBadges = async (
  db: PrismaClient,
  userId: number,
): Promise<void> => {
  // Use a raw query here because we'll soon have a number of post count
  // badges and we could end up with quite a bit of back and fourth
  // querying, whereas here we can just make one roundtrip.
  const newBadgeCount = await db.raw`
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
    RETURNING *
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
      first: newBadgeCount
    })

    await Promise.all(newBadges.map(badge => {
      return sendNewBadgeEmail({
        badgeType: badge.type,
        user: badge.user
      })
    }))
  }
}

schema.objectType({
  name: 'PostTopic',
  definition(t) {
    t.model.id()
    t.model.post()
    t.model.topic()
  },
})

schema.objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.body()
    t.model.excerpt()
    t.model.readTime()
    t.model.author()
    t.model.status()
    t.model.likes()
    t.model.threads()
    t.model.postTopics({ type: 'PostTopic' })
    t.model.postComments({
      ordering: {
        createdAt: true,
      },
    })
    t.model.language()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.bodySrc()
    t.model.images()
    t.model.publishedAt()
    t.int('commentCount', {
      resolve: async (parent, _args, ctx, _info) => {
        const threadCommentCount = await ctx.db.comment.count({
          where: {
            thread: {
              postId: parent.id,
            },
          },
        })
        const postCommentCount = await ctx.db.postComment.count({
          where: {
            postId: parent.id
          }
        })
        return threadCommentCount + postCommentCount
      },
    })
  },
})

// Represents a paginated set of posts.
// Includes 1 page and the total number of posts.
// posts: the returned page after filtering.
// count: the total posts matching the filter.
schema.objectType({
  name: 'PostPage',
  definition(t) {
    t.list.field('posts', {
      type: 'Post',
    })
    t.int('count')
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.list.field('posts', {
      type: 'Post',
      args: {
        status: schema.arg({ type: 'PostStatus', required: true }),
        authorId: schema.intArg({ required: true }),
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
        id: schema.intArg(),
      },
      resolve: async (_parent, args, ctx) => {
        const post = await ctx.db.post.findOne({
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
        search: schema.stringArg({ required: false }),
        languages: schema.intArg({ required: false, list: true }),
        topic: schema.intArg({ required: false }),
        skip: schema.intArg(),
        first: schema.intArg(),
        followedAuthors: schema.booleanArg({ required: false }),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request

        const currentUser = await ctx.db.user.findOne({
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
          const languageFilters = []

          for (let language of args.languages) {
            languageFilters.push({
              language: {
                id: {
                  equals: language,
                },
              },
            })
          }
          filterClauses.push({
            OR: languageFilters,
          })
        }
        if (args.search) {
          filterClauses.push({
            OR: [
              {
                title: {
                  contains: args.search,
                },
              },
              {
                body: {
                  contains: args.search,
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
          first: args.first,
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

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createPost', {
      type: 'Post',
      args: {
        title: schema.stringArg({ required: true }),
        body: EditorNode.asArg({ list: true }),
        languageId: schema.intArg({ required: true }),
        topicIds: schema.intArg({ list: true, required: false }),
        status: schema.arg({ type: 'PostStatus' }),
        images: ImageInput.asArg({ list: true }),
      },
      resolve: async (_parent, args, ctx) => {
        const { title, body, languageId, status, images } = args
        const { userId } = ctx.request
        const isPublished = status === 'PUBLISHED'

        if (!body) {
          throw new ResolverError('We need a body!', {})
        }

        const post = await ctx.db.post.create({
          data: {
            language: { connect: { id: languageId } },
            author: { connect: { id: userId } },
            title,
            status,
            publishedAt: isPublished ? new Date().toISOString() : null,
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
        postId: schema.intArg({ required: true }),
        title: schema.stringArg({ required: false }),
        languageId: schema.intArg({ required: false }),
        topicIds: schema.intArg({ list: true, required: false }),
        body: EditorNode.asArg({ list: true, required: false }),
        status: schema.arg({ type: 'PostStatus', required: false }),
        images: ImageInput.asArg({ list: true }),
      },
      resolve: async (_parent, args, ctx) => {
        // Check user can actually do this
        const { userId } = ctx.request
        if (!userId) throw new NotAuthorizedError()

        const [currentUser, originalPost] = await Promise.all([
          ctx.db.user.findOne({
            where: {
              id: userId,
            },
          }),
          ctx.db.post.findOne({
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
        postId: schema.intArg({ required: true })
      },
      resolve: async (_parent, args, ctx) => {
        const { postId } = args
        const { userId } = ctx.request
        if (!userId) throw new NotAuthorizedError()

        const post = await ctx.db.post.findOne({
          where: {
            id: postId,
          },
          select: {
            id: true,
            authorId: true,
          },
        })

        if (!post) throw new Error('Post not found.');

        const currentUser = await ctx.db.user.findOne({
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
