import { schema } from 'nexus-future'

schema.objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.author()
  },
})

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.name()
    t.model.email()
  },
})

schema.queryType({
  definition(t) {
    t.list.field('allPosts', {
      type: 'Post',
      resolve: async (_parent, _args, ctx) => {
        return ctx.db.post.findMany()
      },
    })

    // t.field('hello', {
    //   type: 'World',
    //   args: {
    //     world: schema.stringArg({ required: false }),
    //   },
    //   async resolve(_root, args, ctx) {
    //     const worldToFindByName = args.world ?? 'Earth'
    //     const world = await ctx.db.world.findOne({
    //       where: {
    //         name: worldToFindByName,
    //       },
    //     })
    //     if (!world) throw new Error(`No such world named "${args.world}"`)
    //     return world
    //   },
    // })
    // t.list.field('worlds', {
    //   type: 'World',
    //   resolve(_root, _args, ctx) {
    //     return ctx.db.world.findMany()
    //   },
    // })
  },
})

schema.mutationType({
  definition(t) {
    t.crud.createOneUser()

    t.field('createPost', {
      type: 'Post',
      args: {
        title: schema.stringArg({ required: true }),
      },
      resolve: async (_parent, args, ctx) => {
        return ctx.db.post.create({
          data: {
            title: args.title.toUpperCase(),
            body: 'body',
            author: {
              connect: {
                email: 'ro@bin.com',
              },
            },
            published: true,
          },
        })
      },
    })
  },
})
