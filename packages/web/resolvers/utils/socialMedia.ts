import { InvalidInput } from '../errors'

const socialMediaPatterns = [
  {
    platform: 'facebook',
    pattern:
      /^(?:(?:http|https):\/\/)?(?:www\.)?(?:facebook\.com|fb\.com)\/([A-Za-z0-9-_\.]+)\/?$/im,
  },
  {
    platform: 'instagram',
    pattern:
      /^(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/([A-Za-z0-9-_\.]+)\/?$/im,
  },
  {
    platform: 'youtube',
    pattern:
      /^(?:(?:http|https):\/\/)?(?:www\.)?(?:youtube\.com)\/(channel|user)\/([A-Za-z0-9-_\.]+)\/?$/im,
  },
  {
    platform: 'website',
    pattern:
      /^(?:(?:http|https):\/\/)?(?:www\.)?(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]\/?$/im,
  },
]

const validatePlatform = (platform: string, socialMediaUrl: string): InvalidInput | undefined => {
  const pattern = socialMediaPatterns.find((s) => s.platform === platform)?.pattern
  if (pattern && !socialMediaUrl.match(pattern)) {
    const errorFieldName = platform.toLowerCase()
    return {
      name: errorFieldName,
      message: `profile.error.${errorFieldName}PatternError`,
    }
  }
}

export const validateSocialMediaInput = (args: {
  facebook?: string | undefined | null
  youtube?: string | undefined | null
  instagram?: string | undefined | null
  website?: string | undefined | null
}): InvalidInput[] => {
  const errors: InvalidInput[] = []

  if (args.facebook) {
    const error = validatePlatform('facebook', args.facebook)
    if (error) errors.push(error)
  }

  if (args.youtube) {
    const error = validatePlatform('youtube', args.youtube)
    if (error) errors.push(error)
  }

  if (args.instagram) {
    const error = validatePlatform('instagram', args.instagram)
    if (error) errors.push(error)
  }

  if (args.website) {
    const error = validatePlatform('website', args.website)
    if (error) errors.push(error)
  }

  return errors
}
