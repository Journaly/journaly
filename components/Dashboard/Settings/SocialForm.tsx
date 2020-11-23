import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from '../../../config/i18n'
import SettingsForm from '../../../components/Dashboard/Settings/SettingsForm'
import SettingsFieldset from '../../../components/Dashboard/Settings/SettingsFieldset'
import Button, { ButtonVariant } from '../../../elements/Button'
import theme from '../../../theme'
import { SocialPlatform, SocialFormField } from './SocialFormField'
import { toLower, upperCase } from 'lodash'
import FormError from '../../FormError'
import { SocialMedia, useUpdateSocialMediaMutation } from '../../../generated/graphql'
import { toast } from 'react-toastify'
import { ApolloError } from '@apollo/client'

type FormData = {
  facebook: string
  instagram: string
  youtube: string
  website: string
  [key: string]: string
}

const getPlatformValue = (platform: string, data: SocialMedia[]): string => {
  const socialMedia = data?.find(
    (socialMedia) => upperCase(socialMedia.platform) === upperCase(platform),
  )
  return socialMedia?.url || ''
}

type SocialFormProps = {
  socialMedia: SocialMedia[]
  refetch: () => void
}

const SocialForm: React.FC<SocialFormProps> = ({ socialMedia, refetch }) => {
  const { t } = useTranslation('settings')
  const { handleSubmit, register, errors, setError } = useForm<FormData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  })

  const [updateSocialMedia, { loading: updateInProgress }] = useUpdateSocialMediaMutation({
    onCompleted: () => {
      toast.success(t('profile.social.success'))
    },
  })

  const addServerErrors = (apolloError: ApolloError): void => {
    const badRequest = (apolloError.networkError as any)?.result?.errors[0].extensions
    if (!badRequest || badRequest.statusCode !== 400) {
      toast.error(t('profile.error.updateError'))
      return
    }

    badRequest.validationErrors.forEach((err: any): void => {
      setError(err.name, 'server', t(err.message))
    })
  }

  const handleSocialSubmit = async (formData: FormData): Promise<void> => {
    if (formData) {
      await updateSocialMedia({
        variables: {
          facebook: formData.facebook,
          instagram: formData.instagram,
          youtube: formData.youtube,
          website: formData.website,
        },
      })
        .then(() => {
          refetch()
        })
        .catch((err) => {
          addServerErrors(err)
        })
    }
  }

  return (
    <SettingsForm onSubmit={handleSubmit(handleSocialSubmit)}>
      <SettingsFieldset legend={t('profile.social.legend')}>
        <h3 className="social-description">{t('profile.social.socialLabel')}</h3>
        <FormError error={Object.values(errors)} />

        <div className="social-wrapper">
          <div className="social-form-fields">
            <SocialFormField
              name={toLower(SocialPlatform.FACEBOOK)}
              defaultValue={getPlatformValue(SocialPlatform.FACEBOOK, socialMedia)}
              error={errors?.facebook}
              register={register}
            />
            <SocialFormField
              name={toLower(SocialPlatform.INSTAGRAM)}
              defaultValue={getPlatformValue(SocialPlatform.INSTAGRAM, socialMedia)}
              error={errors?.instagram}
              register={register}
            />
            <SocialFormField
              name={toLower(SocialPlatform.YOUTUBE)}
              defaultValue={getPlatformValue(SocialPlatform.YOUTUBE, socialMedia)}
              error={errors?.youtube}
              register={register}
            />
            <SocialFormField
              name={toLower(SocialPlatform.WEBSITE)}
              defaultValue={getPlatformValue(SocialPlatform.WEBSITE, socialMedia)}
              error={errors?.website}
              register={register}
            />
          </div>

          <Button
            type="submit"
            className="settings-submit-button"
            variant={ButtonVariant.Secondary}
            loading={updateInProgress}
          >
            {t('updateButton')}
          </Button>
        </div>
      </SettingsFieldset>

      <style jsx>{`
        .social-description {
          margin-bottom: 24px;
        }

        .social-form-fields {
          display: grid;
          grid-gap: 24px;
          margin-top: 40px;
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .social-form-fields {
            grid-template-columns: 320px;
            margin-top: 0;
          }
        }
        @media (min-width: ${theme.breakpoints.LG}) {
          .social-form-fields {
            grid-template-columns: 320px 320px;
          }
        }

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
    </SettingsForm>
  )
}

export default SocialForm
