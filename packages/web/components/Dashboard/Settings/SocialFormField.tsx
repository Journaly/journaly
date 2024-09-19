import React from 'react'
import { FieldError, ValidationOptions } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import FacebookIcon from '@/components/Icons/FacebookIcon'
import GlobeIcon from '@/components/Icons/GlobeIcon'
import InstagramIcon from '@/components/Icons/InstagramIcon'
import XIcon from '@/components/Icons/XIcon'
import YoutubeIcon from '@/components/Icons/YoutubeIcon'

export enum SocialPlatform {
  FACEBOOK = 'facebook',
  YOUTUBE = 'youtube',
  INSTAGRAM = 'instagram',
  WEBSITE = 'website',
}

const socialMediaPatterns = [
  {
    platform: SocialPlatform.FACEBOOK,
    pattern: /^(?:(?:http|https):\/\/)?(?:www\.)?(?:facebook\.com|fb\.com)\/([A-Za-z0-9-_\.]+)\/?$/im,
  },
  {
    platform: SocialPlatform.INSTAGRAM,
    pattern: /^(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/([A-Za-z0-9-_\.]+)\/?$/im,
  },
  {
    platform: SocialPlatform.YOUTUBE,
    pattern: /^(?:(?:http|https):\/\/)?(?:www\.)?(?:youtube\.com)\/(channel|user)\/([A-Za-z0-9-_\.]+)\/?$/im,
  },
  {
    platform: SocialPlatform.WEBSITE,
    pattern: /^(?:(?:http|https):\/\/)?(?:www\.)?(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]\/?$/im,
  },
]

const PlatformIcon: React.FC<{ name: SocialPlatform }> = ({ name }) => {
  const defaultIconProps = {
    color: '#000',
    circleBorder: false,
    size: 48,
  }

  switch (name) {
    case SocialPlatform.FACEBOOK:
      return <FacebookIcon {...defaultIconProps} />
    case SocialPlatform.INSTAGRAM:
      return <InstagramIcon {...defaultIconProps} />
    case SocialPlatform.YOUTUBE:
      return <YoutubeIcon {...defaultIconProps} />
    case SocialPlatform.WEBSITE:
      return <GlobeIcon {...defaultIconProps} />
  }

  return <XIcon />
}

type Props = {
  name: SocialPlatform
  defaultValue?: string
  register: (validationOptions: ValidationOptions) => (ref: Element | null) => void
  error: FieldError | undefined
}

export const SocialFormField: React.FC<Props> = ({ register, name, error, defaultValue }) => {
  const { t } = useTranslation('settings')
  const pattern = socialMediaPatterns.find((s) => s.platform === name)?.pattern

  return (
    <>
      <div className="social-form-field">
        <PlatformIcon name={name} />
        <input
          type="text"
          name={name}
          placeholder={`${t(`profile.social.${name}Placeholder`)}`}
          className={`j-field ${error ? 'is-invalid' : ''}`}
          defaultValue={defaultValue}
          ref={register(
            pattern
              ? {
                  pattern: {
                    value: pattern,
                    message: `${t(`profile.error.${name}PatternError`)}`,
                  },
                }
              : {},
          )}
        />
      </div>
      <style jsx>{`
        .social-form-field {
          display: flex;
          align-items: center;
        }

        .social-form-field .j-field {
          flex-grow: 1;
        }

        .social-form-field :global(svg) {
          margin-right: 8px;
        }
      `}</style>
    </>
  )
}
