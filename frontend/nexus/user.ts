import { schema } from 'nexus'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import { NotAuthorizedError } from './errors'

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.handle()
    t.model.bio()
    t.model.userRole()
    t.model.location()
    t.model.posts({
      pagination: false,
    })
    t.model.profileImage()
    t.model.createdAt()
    t.model.languagesNative()
    t.model.languagesLearning()
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.list.field('users', {
      type: 'User',
      resolve: async (_parent, _args, ctx) => {
        return ctx.db.user.findMany()
      },
    })

    t.field('currentUser', {
      type: 'User',
      resolve: async (_parent, _args, ctx) => {
        const userId = ctx.request.userId
        // check for current userId
        if (!userId) {
          return null
        }
        return ctx.db.user.findOne({
          where: {
            id: userId,
          },
        })
      },
    })

    t.field('userById', {
      type: 'User',
      args: {
        id: schema.intArg({ required: true }),
      },
      resolve: async (_parent, args, ctx) => {
        const user = await ctx.db.user.findOne({
          where: {
            id: args.id,
          },
        })

        if (!user) {
          throw new Error('User not found')
        }

        return user
      },
    })
  },
})

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: 'User',
      args: {
        handle: schema.stringArg({ required: true }),
        email: schema.stringArg({ required: true }),
        password: schema.stringArg({ required: true }),
      },
      resolve: async (_parent, args, ctx: any) => {
        const password = await bcrypt.hash(args.password, 10)
        const user = await ctx.db.user.create({
          data: {
            handle: args.handle,
            email: args.email.toLowerCase(),
            auth: {
              create: { password },
            },
          },
        })
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET!)
        ctx.response.setHeader(
          'Set-Cookie',
          serialize('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
          }),
        )
        return user
      },
    })

    t.field('updateUser', {
      type: 'User',
      args: {
        email: schema.stringArg({ required: false }),
        name: schema.stringArg({ required: false }),
        profileImage: schema.stringArg({ required: false }),
      },
      resolve: async (_parent, args, ctx: any) => {
        const { userId } = ctx.request
        const updates = { ...args }

        return ctx.db.user.update({
          data: updates,
          where: {
            id: userId,
          },
        })
      },
    })

    t.field('loginUser', {
      type: 'User',
      args: {
        identifier: schema.stringArg({ required: true }),
        password: schema.stringArg({ required: true }),
      },
      resolve: async (_parent, args, ctx: any) => {
        const user = await ctx.db.user.findOne({
          where: {
            email: args.identifier,
          },
          include: {
            auth: true,
          },
        })
        if (!user) {
          throw new Error('User not found')
        }

        const isValid = await bcrypt.compare(args.password, user.auth.password)

        if (!isValid) {
          throw new Error('Invalid password')
        }
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET!)
        ctx.response.setHeader(
          'Set-Cookie',
          serialize('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
          }),
        )
        return user
      },
    })

    t.field('logout', {
      type: 'User',
      resolve: async (_parent, _args, ctx) => {
        const id = ctx.request.userId

        if (!id) {
          throw new NotAuthorizedError()
        }

        const user = await ctx.db.user.findOne({
          where: { id: ctx.request.userId },
        })

        if (!user) {
          throw new NotAuthorizedError()
        }

        ctx.response.setHeader(
          'Set-Cookie',
          serialize('token', '', {
            httpOnly: true,
            expires: new Date(0),
          }),
        )

        return user
      },
    })
  },
})
