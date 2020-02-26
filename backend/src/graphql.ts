import { schema } from 'nexus-future'

schema.objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.body()
    t.model.author()
    t.model.published()
  },
})

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.posts({
      pagination: false,
    })
  },
})

schema.queryType({
  definition(t) {
    t.list.field('allPosts', {
      type: 'Post',
      resolve: async (_parent, _args, ctx) => {
        return ctx.db.post.findMany()
      },
    }),
      t.list.field('feed', {
        type: 'Post',
        args: {
          published: schema.booleanArg(),
        },
        resolve: async (_parent, _args, ctx) => {
          return ctx.db.post.findMany({
            where: {
              published: _args.published,
            },
          })
        },
      }),
      t.list.field('users', {
        type: 'User',
        resolve: async (_parent, _args, ctx) => {
          return ctx.db.user.findMany()
        },
      })
  },
})

schema.mutationType({
  definition(t) {
    t.field('createPost', {
      type: 'Post',
      args: {
        title: schema.stringArg({ required: true }),
        body: schema.stringArg({ required: true }),
        published: schema.booleanArg({ required: true }),
      },
      resolve: async (_parent, _args, ctx) => {
        return ctx.db.post.create({
          data: {
            title: _args.title,
            body: _args.title,
            author: {
              connect: {
                email: 'ro@bin.com',
              },
            },
            published: _args.published,
          },
        })
      },
    })
  },
})
