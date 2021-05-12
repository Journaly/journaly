import { stringArg, objectType, extendType } from 'nexus'
import { NotAuthorizedError, UserInputError } from './errors'
import { validateSocialMediaInput } from './utils/socialMedia'

const SocialMedia = objectType({
  name: 'SocialMedia',
  definition(t) {
    t.model.id()
    t.model.facebook()
    t.model.youtube()
    t.model.instagram()
    t.model.website()
  },
})

const SocialMediaMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateSocialMedia', {
      type: 'SocialMedia',
      args: {
        facebook: stringArg({ required: false }),
        instagram: stringArg({ required: false }),
        youtube: stringArg({ required: false }),
        website: stringArg({ required: false }),
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

export default [SocialMedia, SocialMediaMutations]
