import { stringArg, objectType, extendType } from '@nexus/schema'
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

const SocialMediaQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('socialMedia', {
      type: 'SocialMedia',
      resolve: async (parent, _args, ctx) => {
        return ctx.db.socialMedia.findMany({
          where: {
            authorId: parent.id,
          },
        })
      },
    })
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

        for (const key in dataToUpdate) {
          if (dataToUpdate[key] && !dataToUpdate[key].match(/^https?:\/\//))
            dataToUpdate[key] = `https://${dataToUpdate[key]}`
        }

        return ctx.db.socialMedia.upsert({
          update: { ...dataToUpdate },
          create: { ...dataToUpdate, user: { connect: { id: userId } } },
          where: { userId: userId },
        })
      },
    })
  },
})

export default [SocialMedia, SocialMediaQuery, SocialMediaMutations]
