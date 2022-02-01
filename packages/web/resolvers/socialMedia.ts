import { stringArg, objectType, extendType } from 'nexus'
import { NotAuthorizedError, UserInputError } from './errors'
import { validateSocialMediaInput } from './utils/socialMedia'
import { SocialMedia } from 'nexus-prisma'

const SocialMediaType = objectType({
  name: SocialMedia.$name,
  description: SocialMedia.$description,
  definition(t) {
    t.field(SocialMedia.id)
    t.field(SocialMedia.facebook)
    t.field(SocialMedia.youtube)
    t.field(SocialMedia.instagram)
    t.field(SocialMedia.website)
  },
})

const SocialMediaMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateSocialMedia', {
      type: 'SocialMedia',
      args: {
        facebook: stringArg(),
        instagram: stringArg(),
        youtube: stringArg(),
        website: stringArg(),
      },
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx.request

        if (!userId) throw new NotAuthorizedError()

        const errors = validateSocialMediaInput(args)

        if (errors.length > 0) throw new UserInputError('User', errors)

        const dataToUpdate = { ...args }

        if (dataToUpdate.facebook && !dataToUpdate.facebook.match(/^https?:\/\//))
          dataToUpdate.facebook = `https://${dataToUpdate.facebook}`

        if (dataToUpdate.instagram && !dataToUpdate.instagram.match(/^https?:\/\//))
          dataToUpdate.instagram = `https://${dataToUpdate.instagram}`

        if (dataToUpdate.youtube && !dataToUpdate.youtube.match(/^https?:\/\//))
          dataToUpdate.youtube = `https://${dataToUpdate.youtube}`

        if (dataToUpdate.website && !dataToUpdate.website.match(/^https?:\/\//))
          dataToUpdate.website = `https://${dataToUpdate.website}`

        return ctx.db.socialMedia.upsert({
          update: {
            facebook: dataToUpdate.facebook ?? '',
            instagram: dataToUpdate.instagram ?? '',
            youtube: dataToUpdate.youtube ?? '',
            website: dataToUpdate.website ?? '',
          },
          create: {
            facebook: dataToUpdate.facebook ?? '',
            instagram: dataToUpdate.instagram ?? '',
            youtube: dataToUpdate.youtube ?? '',
            website: dataToUpdate.website ?? '',
            user: { connect: { id: userId } },
          },
          where: { userId: userId },
        })
      },
    })
  },
})

export default [SocialMediaType, SocialMediaMutations]
