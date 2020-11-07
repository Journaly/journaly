import { schema } from 'nexus'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import { randomBytes } from 'crypto'
import { promisify } from 'util'

import { NotAuthorizedError } from './errors'
import { sendPasswordResetTokenEmail } from './utils'
import { intArg } from 'nexus/components/schema'

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
    t.model.languages()
    t.model.following()
    t.model.followedBy()
    t.int('postsWrittenCount', {
      resolve(parent, _args, ctx, _info) {
        return ctx.db.post.count({
          where: {
            authorId: parent.id,
          },
        })
      },
    })
    t.int('thanksReceivedCount', {
      resolve(parent, _args, ctx, _info) {
        return ctx.db.commentThanks.count({
          where: {
            comment: {
              authorId: parent.id,
            },
          },
        })
      },
    })
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
        if (!args.id) throw new Error('ID is required')

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
        if (!args.handle.match(/^[a-zA-Z0-9_-]+$/)) {
          throw new Error('Invalid handle')
        }

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
            maxAge: 60 * 60 * 24 * 365,
            path: '/',
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
        bio: schema.stringArg({ required: false }),
      },
      resolve: async (_parent, args, ctx: any) => {
        const { userId } = ctx.request
        const updates = {
          ...args,
          email: args.email?.toLowerCase(),
        }

        return ctx.db.user.update({
          data: updates,
          where: {
            id: userId,
          },
        })
      },
    })

    t.field('updatePassword', {
      type: 'User',
      args: {
        oldPassword: schema.stringArg({ required: true }),
        newPassword: schema.stringArg({ required: true }),
      },
      resolve: async (_parent, args, ctx: any) => {
        const { userId } = ctx.request

        const user = await ctx.db.user.findOne({
          where: {
            id: userId,
          },
          include: {
            auth: true,
          },
        })
        if (!user) {
          throw new Error('User not found')
        }

        const isValid = await bcrypt.compare(args.oldPassword, user.auth.password)

        if (!isValid) {
          throw new Error('Invalid old password')
        }

        const newPassword = await bcrypt.hash(args.newPassword, 10)
        return ctx.db.auth.update({
          where: {
            userId: userId,
          },
          data: {
            password: newPassword,
          },
          include: {
            user: true,
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
            email: args.identifier.toLowerCase(),
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
            maxAge: 60 * 60 * 24 * 365,
            path: '/',
          }),
        )
        return user
      },
    })

    t.field('requestResetPassword', {
      type: 'User',
      args: {
        identifier: schema.stringArg({ required: true }),
      },
      resolve: async (_parent, args, ctx, _info) => {
        const user = await ctx.db.user.findOne({
          where: {
            email: args.identifier.toLowerCase(),
          },
          include: {
            auth: true,
          },
        })
        if (!user) {
          throw new Error('User not found')
        }

        const randomBytesPromisified = promisify(randomBytes)
        const resetToken = (await randomBytesPromisified(20)).toString('hex')
        const resetTokenExpiry = Date.now() + 3600000 // 1 hour from now

        await ctx.db.auth.update({
          where: {
            userId: user.id,
          },
          data: {
            resetToken,
            resetTokenExpiry,
          },
        })

        await sendPasswordResetTokenEmail({
          user,
          resetToken,
        })

        return user
      },
    })

    t.field('resetPassword', {
      type: 'User',
      args: {
        resetToken: schema.stringArg({ required: true }),
        password: schema.stringArg({ required: true }),
        confirmPassword: schema.stringArg({ required: true }),
      },
      resolve: async (_parent, args, ctx, _info) => {
        const { password, confirmPassword, resetToken } = args

        if (password !== confirmPassword) throw new Error('Passwords do not match')

        // Destructure the first (only) user that is returned
        const [user] = await ctx.db.user.findMany({
          where: {
            auth: {
              resetToken,
              resetTokenExpiry: {
                gte: Date.now() - 3600000,
              },
            },
          },
        })

        if (!user) throw new Error('This reset token is either invalid or has expired')

        const newPassword = await bcrypt.hash(password, 10)
        const updatedUser = await ctx.db.auth.update({
          where: {
            userId: user.id,
          },
          data: {
            password: newPassword,
            resetToken: null,
            resetTokenExpiry: null,
          },
          include: {
            user: true,
          },
        })
        const token = jwt.sign({ userId: updatedUser.userId }, process.env.APP_SECRET!)
        ctx.response.setHeader(
          'Set-Cookie',
          serialize('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 365,
            path: '/',
          }),
        )
        return updatedUser.user
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
            path: '/',
          }),
        )

        return user
      },
    })

    t.field('followUser', {
      type: 'User',
      args: {
        followedUserId: intArg({ required: true }),
      },
      resolve: async (_parent, args, ctx, _info) => {
        const { userId: followerId } = ctx.request

        return ctx.db.user.update({
          where: {
            id: followerId,
          },
          data: {
            following: {
              connect: [{ id: args.followedUserId }],
            },
          },
        })
      },
    })

    t.field('unfollowUser', {
      type: 'User',
      args: {
        followedUserId: intArg({ required: true }),
      },
      resolve: async (_parent, args, ctx, _info) => {
        const { userId: followerId } = ctx.request

        return ctx.db.user.update({
          where: {
            id: followerId,
          },
          data: {
            following: {
              disconnect: [{ id: args.followedUserId }],
            },
          },
        })
      },
    })
  },
})
