import {
  intArg,
  stringArg,
  objectType,
  extendType,
} from 'nexus'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import { isAcademic } from 'swot-node'
import {
  PostStatus,
  EmailVerificationStatus,
  InAppNotificationType,
} from '@journaly/j-db-client'

import { User, UserBadge } from 'nexus-prisma'

import { NotAuthorizedError, UserInputError } from './errors'
import {
  generateThumbbusterUrl,
  sendEmailAddressVerificationEmail,
  sendPasswordResetTokenEmail,
  createInAppNotification,
} from './utils'
import { generateToken, validateUpdateUserMutationData } from './utils/userValidation'

const DatedActivityCount = objectType({
  name: 'DatedActivityCount',
  definition(t) {
    t.string('date')
    t.int('postCount')
    t.int('threadCommentCount')
    t.int('postCommentCount')
  },
})

const User = objectType({
  name: User.$name,
  definition(t) {
    t.field(User.id)
    t.field(User.name)
    t.nullable.string('email', {
      resolve(parent, _args, ctx) {
        const { userId } = ctx.request

        if (userId && userId === parent.id) {
          return parent.email
        }

        return null
      },
    })
    t.field(User.handle)
    t.field(User.bio)
    t.field(User.userRole)
    t.field(User.city)
    t.field(User.country)
    t.field(User.badges)
    t.field(User.posts)
    t.field(User.savedPosts)
    t.field(User.profileImage)
    t.field(User.createdAt)
    t.field(User.membershipSubscription)
    t.field(User.isStudent)
    t.field(User.socialMedia, {
      type: 'SocialMedia',
      resolve: async (parent, _args, ctx) => {
        return ctx.db.socialMedia.findFirst({
          where: {
            userId: parent.id,
          },
        })
      },
    })
    t.field(User.languages)
    t.field(User.following)
    t.field(User.followedBy)
    t.field(User.lastFourCardNumbers)
    t.field(User.cardBrand)
    t.field(User.userInterests, {
      type: 'UserInterests',
    })
    t.boolean('emailAddressVerified', {
      async resolve(parent, _args, ctx, _info) {
        const auth = await ctx.db.auth.findUnique({
          where: {
            userId: parent.id,
          },
        })
        return auth?.emailVerificationStatus === EmailVerificationStatus.VERIFIED
      },
    })
    t.int('postsWrittenCount', {
      resolve(parent, _args, ctx, _info) {
        return ctx.db.post.count({
          where: {
            authorId: parent.id,
            status: PostStatus.PUBLISHED,
          },
        })
      },
    })
    t.int('languagesPostedInCount', {
      async resolve(parent, _args, ctx, _info) {
        const q = await ctx.db.$queryRaw<{ count: number }[]>`
          SELECT COUNT(DISTINCT "languageId") as count
          FROM "Post"
          WHERE
            "authorId" = ${parent.id}
            AND "status" = 'PUBLISHED'
          ;
        `

        return q[0].count
      },
    })
    t.int('thanksReceivedCount', {
      resolve(parent, _args, ctx, _info) {
        return ctx.db.commentThanks.count({
          where: {
            comment: { authorId: parent.id },
          },
        })
      },
    })
    t.int('threadCommentsCount', {
      resolve(parent, _args, ctx, _info) {
        return ctx.db.comment.count({
          where: { authorId: parent.id },
        })
      },
    })
    t.int('postCommentsCount', {
      resolve(parent, _args, ctx, _info) {
        return ctx.db.postComment.count({
          where: { authorId: parent.id },
        })
      },
    })
    t.list.field('notifications', {
      type: 'InAppNotification',
      resolve(parent, _args, ctx, _info) {
        const { userId } = ctx.request

        if (!userId || userId !== parent.id) {
          return []
        }

        return ctx.db.inAppNotification.findMany({
          where: {
            userId: userId,
          },
          take: 99,
          orderBy: [{ readStatus: 'desc' }, { bumpedAt: 'desc' }],
        })
      },
    })
    t.list.field('activityGraphData', {
      type: 'DatedActivityCount',
      resolve(parent, _args, ctx, _info) {
        const stats = ctx.db.$queryRaw`
          WITH
            post_activity AS (
              SELECT
                DATE("publishedAt") as date,
                COUNT(*) as count
              FROM "Post"
              WHERE
                "authorId" = ${parent.id}
                AND "status" = 'PUBLISHED'
              GROUP BY date
              ORDER BY date DESC
            ),
            thread_comment_activity AS (
              SELECT
                DATE("createdAt") as date,
                COUNT(*) as count
              FROM "Comment"
              WHERE
                "authorId" = ${parent.id}
              GROUP BY date
              ORDER BY date DESC
            ),
            post_comment_activity AS (
              SELECT
                DATE("createdAt") as date,
                COUNT(*) as count
              FROM "PostComment"
              WHERE
                "authorId" = ${parent.id}
              GROUP BY date
              ORDER BY date DESC
            )
          SELECT
            COALESCE(
              post_activity.date,
              thread_comment_activity.date,
              post_comment_activity.date
            ) AS date,
            COALESCE(post_activity.count, 0) AS "postCount",
            COALESCE(thread_comment_activity.count, 0) AS "threadCommentCount",
            COALESCE(post_comment_activity.count, 0) AS "postCommentCount"
          FROM post_activity
          FULL JOIN thread_comment_activity
            ON post_activity.date = thread_comment_activity.date
          FULL JOIN post_comment_activity
            ON post_activity.date = post_comment_activity.date
          ;
        `
        return (stats as any) || []
      },
    })
  },
})

const InitiateAvatarImageUploadResponse = objectType({
  name: 'InitiateAvatarImageUploadResponse',
  definition(t) {
    t.string('uploadUrl', { description: 'URL for the client to PUT an image to' })
    t.string('checkUrl', { description: 'polling goes here' })
    t.string('finalUrl', { description: 'final url of the transform' })
  },
})

const UserBadge = objectType({
  name: UserBadge.$name,
  definition(t) {
    t.field(UserBadge.id)
    t.field(UserBadge.type)
    t.field(UserBadge.createdAt)
  },
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
        return ctx.db.user.findUnique({
          where: {
            id: userId,
          },
        })
      },
    })

    t.field('userByIdentifier', {
      type: 'User',
      args: {
        id: intArg({ required: false }),
        handle: stringArg({ required: false }),
      },
      resolve: async (_parent, args, ctx) => {
        if (!args.id && !args.handle) throw new Error('You must provide an ID or handle')
        if (args.id && args.handle) throw new Error('Expected one argument, received two')

        let user

        if (args.handle) {
          user = await ctx.db.user.findUnique({
            where: {
              handle: args.handle,
            },
          })
        } else if (args.id) {
          user = await ctx.db.user.findUnique({
            where: {
              id: args.id,
            },
          })
        }

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
      resolve: async (_parent, args, ctx) => {
        if (!args.handle.match(/^[a-zA-Z0-9_-]+$/)) {
          throw new Error('Invalid handle')
        }
        const isStudent = await isAcademic(args.email)
        const password = await bcrypt.hash(args.password, 10)
        const emailVerificationToken = await generateToken()
        let user
        try {
          user = await ctx.db.user.create({
            data: {
              handle: args.handle,
              email: args.email.toLowerCase(),
              isStudent,
              auth: {
                create: {
                  password,
                  emailVerificationToken,
                },
              },
            },
          })
        } catch (ex) {
          // Prisma's error code for unique constraint violation
          if (ex.code === 'P2002') {
            if (ex.meta.target.find((x: string) => x === 'email')) {
              throw new UserInputError(
                'This email address is already in use. Please try logging in',
              )
            } else if (ex.meta.target.find((x: string) => x === 'handle')) {
              throw new UserInputError('This handle is already in use')
            } else {
              throw ex
            }
          } else {
            throw ex
          }
        }

        await sendEmailAddressVerificationEmail({ user, verificationToken: emailVerificationToken })

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
        country: stringArg({ required: false }),
        city: stringArg({ required: false }),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request

        await validateUpdateUserMutationData(args, ctx)

        const preUpdateUser = await ctx.db.user.findUnique({
          where: { id: userId },
        })

        if (!preUpdateUser) throw new Error('User not found')

        const updates = {
          ...args,
          handle: args.handle || undefined,
          isStudent: false,
          email: args.email?.toLowerCase(),
        }

        if (args.email) {
          updates.isStudent = await isAcademic(args.email)
        }

        const user = await ctx.db.user.update({
          data: updates,
          where: {
            id: userId,
          },
        })

        if (args.email && args.email.toLowerCase() !== preUpdateUser.email) {
          const emailVerificationToken = await generateToken()
          await ctx.db.auth.update({
            where: { userId },
            data: {
              emailVerificationToken,
              emailVerificationStatus: EmailVerificationStatus.PENDING,
            },
          })
          await sendEmailAddressVerificationEmail({
            user,
            verificationToken: emailVerificationToken,
          })
        }

        return user
      },
    })

    t.field('initiateAvatarImageUpload', {
      type: 'InitiateAvatarImageUploadResponse',
      resolve: async (_parent, _args, ctx) => {
        const transformBucket = process.env.THUMBBUSTER_TRANSFORM_BUCKET
        const cdnDomain = process.env.THUMBBUSTER_CDN_DOMAIN

        if (!transformBucket) {
          throw new Error('Must specify `THUMBBUSTER_TRANSFORM_BUCKET` env var')
        } else if (!cdnDomain) {
          throw new Error('Must specify `THUMBBUSTER_CDN_DOMAIN` env var')
        }

        const { userId } = ctx.request
        const currentUser = await ctx.db.user.findUnique({
          where: {
            id: userId,
          },
        })

        if (!currentUser) {
          throw new NotAuthorizedError()
        }

        const [uuid, uploadUrl] = await generateThumbbusterUrl('avatar-image')

        return {
          uploadUrl,
          checkUrl: `https://${transformBucket}.s3.us-east-2.amazonaws.com/avatar-image/${uuid}-large`,
          finalUrl: `https://${cdnDomain}/avatar-image/${uuid}-large`,
        }
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

        const user = await ctx.db.user.findUnique({
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
          throw new Error('Old password is incorrect')
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
        const user = await ctx.db.user.findUnique({
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
        const user = await ctx.db.user.findUnique({
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

        const resetToken = await generateToken()
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

        const user = await ctx.db.user.findUnique({
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

        const follower = await ctx.db.user.update({
          where: {
            id: followerId,
          },
          data: {
            following: {
              connect: [{ id: args.followedUserId }],
            },
          },
        })

        await createInAppNotification(ctx.db, {
          userId: args.followedUserId,
          type: InAppNotificationType.NEW_FOLLOWER,
          key: {},
          subNotification: {
            followingUserId: follower.id
          }
        })

        return follower
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

    t.field('resendEmailVerificationEmail', {
      type: 'User',
      args: {},
      resolve: async (_parent, _args, ctx, _info) => {
        const { userId } = ctx.request
        const user = await ctx.db.user.findUnique({
          where: { id: userId },
          include: { auth: true },
        })
        if (!user?.auth) throw new Error('User not found')
        let verificationToken = user.auth.emailVerificationToken
        if (!verificationToken) {
          verificationToken = await generateToken()
          await ctx.db.auth.update({
            where: { userId },
            data: {
              emailVerificationToken: verificationToken,
            },
          })
        }
        await sendEmailAddressVerificationEmail({
          user,
          verificationToken,
        })
        return user
      },
    })

    t.field('savePost', {
      type: 'User',
      args: {
        postId: intArg({ required: true }),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request

        if (!userId) {
          throw new Error('You must be logged in to save a post')
        }

        return await ctx.db.user.update({
          where: { id: userId },
          data: {
            savedPosts: {
              connect: [{ id: args.postId }],
            },
          },
        })
      },
    })

    t.field('unsavePost', {
      type: 'User',
      args: {
        postId: intArg({ required: true }),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request

        if (!userId) {
          throw new Error('You must be logged in to save a post')
        }

        return await ctx.db.user.update({
          where: { id: userId },
          data: {
            savedPosts: {
              disconnect: [{ id: args.postId }],
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
  InitiateAvatarImageUploadResponse,
  DatedActivityCount,
]
