import { SocialMedia, SocialMediaPlatform } from '@prisma/client'
import { toUpper } from 'lodash'
import { InvalidInput } from '../errors'

const socialMediaPatterns = [
  {
    platform: SocialMediaPlatform.FACEBOOK,
    pattern: /^(?:(?:http|https):\/\/)(?:www\.)?(?:facebook\.com|fb\.com)\/([A-Za-z0-9-_\.]+)\/?$/im,
  },
  {
    platform: SocialMediaPlatform.INSTAGRAM,
    pattern: /^(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/([A-Za-z0-9-_\.]+)\/?$/im,
  },
  {
    platform: SocialMediaPlatform.LINKEDIN,
    pattern: /^(?:(?:http|https):\/\/)(?:www\.)?linkedin.com\/((in\/[^\/]+\/?)|(pub\/[^\/]+\/((\\w|\\d)+\/?){3}))$/im,
  },
  {
    platform: SocialMediaPlatform.YOUTUBE,
    pattern: /^(?:(?:http|https):\/\/)?(?:www\.)?(?:youtube\.com)\/(channel|user)\/([A-Za-z0-9-_\.]+)\/?$/im,
  },
  {
    platform: SocialMediaPlatform.WEBSITE,
    pattern: /^(?:(?:http|https):\/\/)(?:www\.)?(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]\/?$/im,
  },
]

type socialMediaUpdate = { platform: SocialMediaPlatform; url: string }
type socialMediaUpdateInput = {
  facebook: string
  instagram: string
  youtube: string
  personalWebsite: string
  [key: string]: string
}

const getPlatform = (platform: string): SocialMediaPlatform | undefined => {
  switch (toUpper(platform)) {
    case SocialMediaPlatform.FACEBOOK:
      return SocialMediaPlatform.FACEBOOK
    case SocialMediaPlatform.INSTAGRAM:
      return SocialMediaPlatform.INSTAGRAM
    case SocialMediaPlatform.LINKEDIN:
      return SocialMediaPlatform.LINKEDIN
    case SocialMediaPlatform.YOUTUBE:
      return SocialMediaPlatform.YOUTUBE
    case SocialMediaPlatform.WEBSITE:
      return SocialMediaPlatform.WEBSITE
  }
  return undefined
}

const validatePlatform = (socialMedia: socialMediaUpdate): InvalidInput | undefined => {
  const pattern = socialMediaPatterns.find((s) => s.platform === socialMedia.platform)?.pattern
  if (pattern && !socialMedia.url.match(pattern)) {
    const errorFieldName = socialMedia.platform.toLowerCase()
    return {
      name: errorFieldName,
      message: `profile.error.${errorFieldName}PatternError`,
    }
  }
}

export const getSocialMediaUpdate = (
  args: socialMediaUpdateInput,
): { socialMediaUpdate: socialMediaUpdate[]; errors: InvalidInput[] } => {
  const errors: InvalidInput[] = []
  const socialMediaUpdate: socialMediaUpdate[] = []

  for (const key in args) {
    const platformName = getPlatform(key)

    if (platformName) {
      const value = args[key]
      if (value === undefined) continue

      if (args[key] && !args[key].match(/^https?:\/\//)) args[key] = `https://${args[key]}`

      const platform: socialMediaUpdate = { platform: platformName, url: args[key] }

      if (value) {
        const error = validatePlatform(platform)
        if (error) errors.push(error)
      }

      socialMediaUpdate.push(platform)
    }
  }

  return { socialMediaUpdate, errors }
}

export const prepareNewSocialMedia = (
  userSocialMedia: SocialMedia[],
  socialMediaUpdate: socialMediaUpdate[],
): SocialMedia[] => {
  const newSocialMedia: SocialMedia[] = []

  for (const update of socialMediaUpdate) {
    const oldSocialMedia = userSocialMedia.find((s) => s.platform === update.platform)
    if (oldSocialMedia) {
      newSocialMedia.push({ ...oldSocialMedia, url: update.url })
    } else {
      newSocialMedia.push({ url: update.url, platform: update.platform, authorId: 0, id: 0 })
    }
  }

  return newSocialMedia
}
