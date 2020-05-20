import React from 'react'
import { NextPage } from 'next'
import { withApollo } from '../../../lib/apollo'
import SettingsPageLayout from '../../../components/Layouts/SettingsPageLayout'
import Form from '../../../components/Form'
import { useTranslation } from '../../../config/i18n'
import Button, { Variant } from '../../../elements/Button'

const ProfileInfo: NextPage = () => {
  const { t } = useTranslation('settings')
  const loading = false

  const handleSubmit = () => {}

  return (
    <SettingsPageLayout>
      <Form onSubmit={handleSubmit}>
        <fieldset disabled={loading} aria-busy={loading}>
          <legend>
            <h2>{t('profileForm.legend')}</h2>
          </legend>

          <div className="details-wrapper">
            <img className="profile-image" src="/images/robin-small.png" />

            <Button className="details-submit-button" variant={Variant.Secondary}>
              {t('profileForm.submitButton')}
            </Button>
          </div>
        </fieldset>
      </Form>

      <style jsx>{`
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
