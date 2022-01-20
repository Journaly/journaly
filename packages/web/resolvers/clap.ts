import { extendType, intArg, objectType, nonNull } from 'nexus'
import { EmailNotificationType, InAppNotificationType } from '@journaly/j-db-client'
import { createInAppNotification, createEmailNotification, hasAuthorPermissions } from './utils'
import { PostClap as PostClapType } from 'nexus-prisma'

const PostClap = objectType({
  name: PostClapType.$name,
  description: PostClapType.$description,
  definition(t) {
    t.field(PostClapType.id)
    t.field(PostClapType.author)
    t.field(PostClapType.post)
  },
})

const PostClapMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createPostClap', {
      type: 'PostClap',
      args: {
        postId: nonNull(intArg()),
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

        await createEmailNotification(ctx.db, post.author, {
          type: EmailNotificationType.POST_CLAP,
          postClap,
        })

        await createInAppNotification(ctx.db, {
          userId: post.authorId,
          type: InAppNotificationType.POST_CLAP,
          key: { postId: post.id },
          subNotification: {
            postClapId: postClap.id,
          },
        })

        return postClap
      },
    }),
      t.field('deletePostClap', {
        type: 'PostClap',
        args: {
          postClapId: nonNull(intArg()),
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
              include: {
                postClapNotifications: true,
              },
            }),
          ])

          if (!currentUser) throw new Error('User not found.')
          if (!originalPostClap) throw new Error('PostClap not found.')

          hasAuthorPermissions(originalPostClap, currentUser)

          return ctx.db.postClap.delete({
            where: {
              id: postClapId,
            },
          })
        },
      })
  },
})

export default [PostClap, PostClapMutations]
