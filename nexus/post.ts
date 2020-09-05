import { schema } from 'nexus'

import { processEditorDocument, hasAuthorPermissions } from './utils'
import { NotFoundError, NotAuthorizedError, ResolverError } from './errors'
import { PostUpdateInput } from '.prisma/client/index'
import { EditorNode, ImageInput } from './inputTypes'

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
    t.model.bodySrc()
    t.model.images()
    t.model.publishedAt()
    t.int('commentCount', {
      resolve(parent, _args, ctx, _info) {
        return ctx.db.comment.count({
          where: {
            thread: {
              postId: parent.id,
            },
          },
        })
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
      },
      resolve: async (_parent, args, ctx) => {
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

        console.log(args)
        if (args.topicIds) {
          console.log('here')
          const insertPromises = args.topicIds.map(topicId => {
            console.log('there', post.id, topicId)
            return ctx.db.postTopic.create({
              data: {
                post: { connect: { id: post.id } },
                topic: { connect: { id: topicId } },
              }
            })
          })

          await Promise.all(insertPromises)
        }

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
            where: { postId: args.postId }
          })

          const insertPromises = args.topicIds.map(topicId => {
            return ctx.db.postTopic.create({
              data: {
                post: { connect: { id: args.postId } },
                topic: { connect: { id: topicId } },
              }
            })
          })

          await Promise.all(insertPromises)
        }

        return ctx.db.post.update({
          where: { id: args.postId },
          data,
        })
      },
    })
  },
})
