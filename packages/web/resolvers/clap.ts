import { extendType, intArg, objectType } from 'nexus'
import { EmailNotificationType, InAppNotificationType } from '@journaly/j-db-client'
import { createNotification, hasAuthorPermissions } from './utils'

const PostClap = objectType({
  name: 'PostClap',
  definition(t) {
    t.model.id()
    t.model.author()
    t.model.post()
  },
})

const PostClapMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createPostClap', {
      type: 'PostClap',
      args: {
        postId: intArg({ required: true }),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request
        if (!userId) {
          throw new Error('You must be logged in to clap.')
        }

        const { postId } = args
        const post = await ctx.db.post.findUnique({
          where: {
            id: postId,
          },
          include: {
            author: true,
          },
        })

        if (!post) {
          throw new Error('Post not found.')
        }

        const postClap = await ctx.db.postClap.create({
          data: {
            author: {
              connect: { id: userId },
            },
            post: {
              connect: {
                id: post.id,
              },
            },
          },
          include: {
            author: true,
          },
        })

        await createNotification(ctx.db, post.author, {
          type: EmailNotificationType.POST_CLAP,
          postClap,
        })

        const ian = await ctx.db.inAppNotification.upsert({
          create: {
            userId: post.authorId,
            type: InAppNotificationType.POST_CLAP,
            bumpedAt: new Date(),
            postId: post.id,
            triggeringUserId: post.author.id,
          },
          update: {
            bumpedAt: new Date(),
          },
          where: {
            userId_type_postId_triggeringUserId: {
              userId: post.author.id,
              postId: post.id,
              triggeringUserId: post.authorId,
              type: InAppNotificationType.POST_CLAP,
            },
          },
        })

        await ctx.db.postClapNotification.create({
          data: {
            notificationId: ian.id,
            postClapId: postClap.id,
          },
        })

        return postClap
      },
    }),
      t.field('deletePostClap', {
        type: 'PostClap',
        args: {
          postClapId: intArg({ required: true }),
        },
        resolve: async (_parent, args, ctx) => {
          const { userId } = ctx.request
          if (!userId) throw new Error('You must be logged in to do that.')

          const { postClapId } = args

          const [currentUser, originalPostClap] = await Promise.all([
            ctx.db.user.findUnique({
              where: {
                id: userId,
              },
            }),
            ctx.db.postClap.findUnique({
              where: {
                id: postClapId,
              },
            }),
          ])

          if (!currentUser) throw new Error('User not found.')
          if (!originalPostClap) throw new Error('PostClap not found.')

          hasAuthorPermissions(originalPostClap, currentUser)

          return await ctx.db.postClap.delete({
            where: {
              id: postClapId,
            },
          })
        },
      })
  },
})

export default [PostClap, PostClapMutations]
