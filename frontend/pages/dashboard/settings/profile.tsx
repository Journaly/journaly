import React from 'react'
import { NextPage } from 'next'
import { withApollo } from '../../../lib/apollo'
import SettingsPageLayout from '../../../components/Layouts/SettingsPageLayout'
import SettingsForm from '../../../components/Dashboard/Settings/SettingsForm'
import SettingsFieldset from '../../../components/Dashboard/Settings/SettingsFieldset'
import { useTranslation } from '../../../config/i18n'
import Button, { ButtonVariant } from '../../../elements/Button'

const ProfileInfo: NextPage = () => {
  const { t } = useTranslation('settings')

  const handleDetailsSubmit = (): void => {}
  const handleLanguagesSubmit = (): void => {}

  return (
    <SettingsPageLayout>
      <div className="forms-container">
        <SettingsForm onSubmit={handleDetailsSubmit}>
          <SettingsFieldset legend={t('profile.details.legend')}>
            <div className="details-wrapper">
              <img className="profile-image" src="/images/robin-small.png" />

              <Button
                type="submit"
                className="details-submit-button"
                variant={ButtonVariant.Secondary}
              >
                {t('profile.details.submitImage')}
              </Button>
            </div>
          </SettingsFieldset>
        </SettingsForm>

        <SettingsForm onSubmit={handleLanguagesSubmit}>
          <SettingsFieldset legend={t('profile.languages.legend')}>
            <div className="languages-wrapper">
              <Button
                type="submit"
                className="details-submit-button"
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
          align-items: center;
          width: 150px;
          margin-top: 40px;
        }

        .profile-image {
          width: 100%;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
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
