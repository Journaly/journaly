import {
  intArg,
  stringArg,
  objectType,
  extendType,
} from '@nexus/schema'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import { randomBytes } from 'crypto'
import { promisify } from 'util'
import { BadgeType } from '@prisma/client'

import { NotAuthorizedError } from './errors'
import { sendPasswordResetTokenEmail } from './utils'
import { validateUpdateUserMutationData } from './utils/userValidation'

const User = objectType({
  name: 'User',
  rootTyping: 'prisma.User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.string('email', {
      nullable: true,
      resolve(parent, _args, ctx, _info) {
        const { userId } = ctx.request

        if (userId && userId === parent.id) {
          return parent.email
        }

        return null
      },
    })
    t.model.handle()
    t.model.bio()
    t.model.userRole()
    t.model.location()
    t.model.badges()
    t.model.posts({ pagination: false })
    t.model.profileImage()
    t.model.createdAt()
    t.model.languages({ pagination: false })
    t.model.following({ pagination: false })
    t.model.followedBy({ pagination: false })
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


const UserBadge = objectType({
  name: 'UserBadge',
  definition(t) {
    t.model.id()
    t.model.type()
    t.model.createdAt()
  }
})

const UserQueries = extendType({
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
      nullable: true,
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
        id: intArg({ required: true }),
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

const UserMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: 'User',
      args: {
        handle: stringArg({ required: true }),
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
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
            badges: {
              create: [
                { type: BadgeType.BETA_USER },
              ],
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
        email: stringArg({ required: false }),
        name: stringArg({ required: false }),
        profileImage: stringArg({ required: false }),
        bio: stringArg({ required: false }),
        handle: stringArg({ required: false }),
      },
      resolve: async (_parent, args, ctx: any) => {
        const { userId } = ctx.request

        await validateUpdateUserMutationData(args, ctx)

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
        oldPassword: stringArg({ required: true }),
        newPassword: stringArg({ required: true }),
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
        const updatedAuth = await ctx.db.auth.update({
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
        return updatedAuth.user
      },
    })

    t.field('loginUser', {
      type: 'User',
      args: {
        identifier: stringArg({ required: true }),
        password: stringArg({ required: true }),
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
        identifier: stringArg({ required: true }),
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
        resetToken: stringArg({ required: true }),
        password: stringArg({ required: true }),
        confirmPassword: stringArg({ required: true }),
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

export default [
  User,
  UserBadge,
  UserQueries,
  UserMutations,
]
