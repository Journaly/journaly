import { schema } from 'nexus-future'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Time constants
const ONE_YEAR = 1000 * 60 * 60 * 24 * 365
const ONE_HOUR_FROM_NOW = Date.now() + 3600000
const WITHIN_ONE_HOUR = Date.now() - 3600000

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.Id()
    t.model.Name()
    t.model.Email()
    t.model.Handle()
    t.model.Password()
    t.model.Bio()
    t.model.userRole()
    t.model.location()
  },
})

schema.objectType({
  name: 'Post',
  definition(t) {
    t.model.Id()
    t.model.Title()
    t.model.Body()
    t.model.author()
    t.model.status()
    t.model.language({ type: 'Language' })
  },
})

schema.objectType({
  name: 'Location',
  definition(t) {
    t.model.Id()
    t.model.Country()
    t.model.City()
  },
})

schema.objectType({
  name: 'Language',
  definition(t) {
    t.model.Id()
    t.model.Name()
    t.model.posts()
    t.model.Dialect()
    t.model.nativeUsers()
    t.model.learningUsers()
  },
})

schema.queryType({
  definition(t) {
    t.list.field('posts', {
      type: 'Post',
      resolve: async (parent, args, ctx) => ctx.db.post.findMany(),
    }),
      t.list.field('feed', {
        type: 'Post',
        args: {
          status: schema.stringArg(),
        },
        resolve: async (parent, args, ctx) => {
          return ctx.db.post.findMany({
            where: {
              status: args.status as any,
            },
          })
        },
      }),
      t.list.field('users', {
        type: 'User',
        resolve: async (parent, args, ctx) => {
          return ctx.db.user.findMany()
        },
      })
  },
})

schema.mutationType({
  definition(t) {
    t.field('createUser', {
      type: 'User',
      args: {
        Name: schema.stringArg({ required: true }),
        Email: schema.stringArg({ required: true }),
        Handle: schema.stringArg({ required: true }),
        Password: schema.stringArg({ required: true }),
      },
      resolve: async (parent, args, ctx: any) => {
        const Password = await bcrypt.hash(args.Password, 10)
        const user = await ctx.db.user.create({
          data: {
            Name: args.Name,
            Email: args.Email,
            Handle: args.Handle,
            Password: args.Password,
          },
        })
        const token = jwt.sign({ userId: user.Id }, process.env.APP_SECRET!)
        ctx.response.cookie('token', token, {
          httpOnly: true,
          maxAge: ONE_YEAR,
        })
        return user
      },
    })
    t.field('createPost', {
      type: 'Post',
      args: {
        Title: schema.stringArg({ required: true }),
        Body: schema.stringArg({ required: true }),
        status: schema.stringArg(),
        authorEmail: schema.stringArg({ required: true }),
      },
      resolve: async (parent, args, ctx) =>
        ctx.db.post.create({
          data: {
            Title: args.Title,
            Body: args.Title,
            status: args.status as any,
            author: {
              connect: {
                Email: 'ro@bin.com',
              },
            },
          },
        }),
    })
  },
})
