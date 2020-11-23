import { schema } from 'nexus'
import { SocialMedia } from '@prisma/client'
import { NotAuthorizedError, UserInputError } from './errors'
import { Context } from './utils'
import { getSocialMediaUpdate, prepareNewSocialMedia } from './utils/socialMedia'

schema.objectType({
  name: 'SocialMedia',
  definition(t) {
    t.model.id()
    t.model.platform()
    t.model.url()
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.list.field('socialMedia', {
      type: 'SocialMedia',
      resolve: async (_parent, args, ctx: Context): Promise<SocialMedia[]> => {
        return ctx.db.socialMedia.findMany({
          where: {
            authorId: _parent.id,
          },
        })
      },
    })
  },
})

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.list.field('updateSocialMedia', {
      type: 'SocialMedia',
      args: {
        facebook: schema.stringArg({ required: false }),
        instagram: schema.stringArg({ required: false }),
        youtube: schema.stringArg({ required: false }),
        website: schema.stringArg({ required: false }),
        linkedin: schema.stringArg({ required: false }),
      },
      resolve: async (_parent, args, ctx: Context): Promise<SocialMedia[]> => {
        const { userId } = ctx.request

        if (!userId) throw new NotAuthorizedError()

        const { socialMediaUpdate, errors } = getSocialMediaUpdate(args)

        if (errors.length > 0) throw new UserInputError('User', errors)

        const userSocialMedia = await ctx.db.socialMedia.findMany({
          where: {
            authorId: userId,
          },
        })

        const newSocialMedia = prepareNewSocialMedia(userSocialMedia, socialMediaUpdate)

        const updatePromises = newSocialMedia.map((s) => {
          if (s.id > 0) {
            return ctx.db.socialMedia.update({
              data: { platform: s.platform, url: s.url },
              where: { id: s.id },
            })
          } else {
            return ctx.db.socialMedia.create({
              data: {
                platform: s.platform,
                url: s.url,
                author: { connect: { id: userId } },
              },
            })
          }
        })

        return Promise.all(updatePromises)
      },
    })
  },
})
