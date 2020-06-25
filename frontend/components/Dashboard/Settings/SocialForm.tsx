import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from '../../../config/i18n'
import SettingsForm from '../../../components/Dashboard/Settings/SettingsForm'
import SettingsFieldset from '../../../components/Dashboard/Settings/SettingsFieldset'
import XIcon from '../../../components/Icons/XIcon'
import Button, { ButtonVariant } from '../../../elements/Button'
import theme from '../../../theme'

const SocialForm: React.FC = () => {
  const { t } = useTranslation('settings')
  const { handleSubmit, register } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  })

  const handleSocialSubmit = (): void => {}

  return (
    <SettingsForm onSubmit={handleSubmit(handleSocialSubmit)}>
      <SettingsFieldset legend={t('profile.social.legend')}>
        <h3 className="social-description">{t('profile.social.socialLabel')}</h3>

        <div className="social-wrapper">
          <div className="social-form-fields">
            <div className="social-form-field">
              <XIcon />
              <input
                type="text"
                name="facebook"
                placeholder={t('profile.social.facebookPlaceholder')}
                className="j-field"
                ref={register()}
              />
            </div>
            <div className="social-form-field">
              <XIcon />
              <input
                type="text"
                name="instagram"
                placeholder={t('profile.social.instagramPlaceholder')}
                className="j-field"
                ref={register()}
              />
            </div>
            <div className="social-form-field">
              <XIcon />
              <input
                type="text"
                name="youtube"
                placeholder={t('profile.social.youtubePlaceholder')}
                className="j-field"
                ref={register()}
              />
            </div>
            <div className="social-form-field">
              <XIcon />
              <input
                type="text"
                name="personal-website"
                placeholder={t('profile.social.personalWebsitePlaceholder')}
                className="j-field"
                ref={register()}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="settings-submit-button"
            variant={ButtonVariant.Secondary}
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
