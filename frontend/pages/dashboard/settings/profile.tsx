import React from 'react'
import { useForm, ErrorMessage } from 'react-hook-form'
import { NextPage } from 'next'
import { withApollo } from '../../../lib/apollo'
import SettingsPageLayout from '../../../components/Layouts/SettingsPageLayout'
import SettingsForm from '../../../components/Dashboard/Settings/SettingsForm'
import SettingsFieldset from '../../../components/Dashboard/Settings/SettingsFieldset'
import { useTranslation } from '../../../config/i18n'
import Button, { ButtonVariant } from '../../../elements/Button'
import theme from '../../../theme'

const ProfileInfo: NextPage = () => {
  const { t } = useTranslation('settings')
  const { handleSubmit: handleDetailsSubmit, register, errors } = useForm({
    mode: 'onBlur',
  })

  const onDetailsSubmit = (): void => {}
  const handleLanguagesSubmit = (): void => {}

  // TODO(nick): submit the image separately from the main form, since it has a separate submit button
  return (
    <SettingsPageLayout>
      <div className="forms-container">
        <SettingsForm onSubmit={handleDetailsSubmit(onDetailsSubmit)}>
          <SettingsFieldset legend={t('profile.details.legend')}>
            <div className="details-wrapper">
              <div className="profile-image-wrapper">
                <img className="profile-image" src="/images/robin-small.png" />

                <Button
                  type="submit"
                  className="details-submit-button"
                  variant={ButtonVariant.Secondary}
                >
                  {t('profile.details.submitImage')}
                </Button>
              </div>
              <div className="details-form-fields-wrapper">
                <div className="details-form-fields">
                  <div className="details-form-field">
                    <label htmlFor="first-name">First Name</label>
                    <input
                      type="text"
                      name="first-name"
                      className="j-field"
                      ref={register({ required: 'First name is required' })}
                    />
                    <ErrorMessage errors={errors} name="First Name" as="p" />
                  </div>
                  <div className="details-form-field">
                    <label htmlFor="last-name">Last Name</label>
                    <input
                      type="text"
                      name="last-name"
                      className="j-field"
                      ref={register({ required: 'Last name is required' })}
                    />
                    <ErrorMessage errors={errors} name="Last Name" as="p" />
                  </div>
                  <div className="details-form-field">
                    <label htmlFor="handle">Handle</label>
                    <input type="text" name="handle" className="j-field" ref={register()} />
                  </div>
                  <div className="details-form-field">
                    <label htmlFor="location">Location (optional)</label>
                    <input type="text" name="location" className="j-field" ref={register()} />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="details-submit-button"
                  variant={ButtonVariant.Secondary}
                >
                  {t('updateButton')}
                </Button>
              </div>
            </div>
          </SettingsFieldset>
        </SettingsForm>

        <SettingsForm onSubmit={handleLanguagesSubmit}>
          <SettingsFieldset legend={t('profile.languages.legend')}>
            <div className="languages-wrapper">
              <Button
                type="submit"
                className="languages-submit-button"
                variant={ButtonVariant.Secondary}
              >
                {t('updateButton')}
              </Button>
            </div>
          </SettingsFieldset>
        </SettingsForm>
      </div>

      <style jsx>{`
        .forms-container {
          width: 100%;
        }

        .forms-container :global(form) {
          margin-bottom: 40px;
        }

        .forms-container :global(form):last-child {
          margin-bottom: 0;
        }

        .details-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          margin-top: 30px;
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .details-wrapper {
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
          }
        }

        .profile-image-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
          width: 150px;
          margin: 0 50px;
        }
        @media (min-width: ${theme.breakpoints.LG}) {
          .profile-image-wrapper {
            margin-top: 30px;
          }
        }

        .profile-image {
          width: 100%;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
        }

        .details-form-fields-wrapper {
          width: 100%;
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .details-form-fields-wrapper {
            margin: 0 25px;
          }
        }

        .details-form-fields {
          display: grid;
          grid-gap: 24px;
          margin-top: 40px;
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .details-form-fields {
            grid-template-columns: 320px;
            margin-top: 0;
          }
        }
        @media (min-width: ${theme.breakpoints.LG}) {
          .details-form-fields {
            grid-template-columns: 320px 320px;
          }
        }

        .details-form-field {
          display: flex;
          flex-direction: column;
        }

        .details-form-field label {
          margin-bottom: 4px;
        }

        :global(.details-submit-button) {
          margin-top: 40px;
        }
      `}</style>
    </SettingsPageLayout>
  )
}

ProfileInfo.getInitialProps = async () => ({
  namespacesRequired: ['settings'],
})

export default withApollo(ProfileInfo)
