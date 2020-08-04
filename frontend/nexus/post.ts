import { schema } from 'nexus'

import { processEditorDocument, hasPostPermissions } from './utils'
import { NotFoundError, NotAuthorizedError, ResolverError } from './errors'
import { PostUpdateInput } from '.prisma/client/index'

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
    t.model.images()
    t.model.likes()
    t.model.threads()
    t.model.language()
    t.model.createdAt()
    t.model.bodySrc()
  },
})

// create object for image
schema.objectType({
  name: 'Image',
  definition(t) {
    t.model.id()
    t.model.imageRole({})
    t.model.smallSize()
    t.model.largeSize()
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

// Input type modeling the FE editor data structure. Not the best typing as this
// is concepturally the untion of two types, internal nodes and leaf nodes, but
// AFAIK GQL does not have a native union type, so we simply unify all the fields
// and make them all nullable.
const EditorNode = schema.inputObjectType({
  name: 'EditorNode',
  definition(t) {
    t.string('type', { nullable: true })
    t.string('text', { nullable: true })
    t.boolean('italic', { nullable: true })
    t.boolean('bold', { nullable: true })
    t.boolean('underline', { nullable: true })
    t.field('children', {
      type: EditorNode,
      list: true,
      nullable: true,
    })
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
            AND: {
              author: { id: args.authorId },
              status: args.status,
            },
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
        const post = await ctx.db.post.findOne({ where: { id: args.id } })

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
        language: schema.intArg({ required: false }),
        topic: schema.stringArg({ required: false }),
        skip: schema.intArg(),
        first: schema.intArg(),
      },
      resolve: async (_parent, args, ctx) => {
        const filterClauses = []
        if (!args.first) args.first = 10
        if (args.first > 50) args.first = 50

        if (args.language) {
          filterClauses.push({
            language: {
              id: {
                equals: args.language,
              },
            },
          })
        }
        if (args.topic) {
          filterClauses.push({
            topic: {
              some: {
                name: args.topic,
              },
            },
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
          },
        })

        const postQuery = ctx.db.post.findMany({
          where: {
            AND: filterClauses,
          },
          skip: args.skip,
          first: args.first,
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
        status: schema.arg({ type: 'PostStatus' }),
        images: schema.arg({ type: 'Image', list: true }),
      },
      resolve: async (_parent, args, ctx) => {
        const { title, body, languageId, status, images } = args
        const { userId } = ctx.request

        if (!body) {
          throw new ResolverError('We need a body!', {})
        }

        const post = await ctx.db.post.create({
          data: {
            language: { connect: { id: languageId } },
            author: { connect: { id: userId } },
            title,
            status,
            ...processEditorDocument(body),
          },
        })

        for (let image of images) {
          if (image.imageRole === 'HEADLINE') {
            ctx.db.image.create({
              ...image,
              post: {
                connect: {
                  id: post.id,
                },
              },
            })
          }
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
        body: EditorNode.asArg({ list: true, required: false }),
        status: schema.arg({ type: 'PostStatus', required: false }),
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

        hasPostPermissions(originalPost, currentUser)

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

        return ctx.db.post.update({
          where: { id: args.postId },
          data,
        })
      },
    })
  },
})
