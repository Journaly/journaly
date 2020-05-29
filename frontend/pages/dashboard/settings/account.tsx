import React from 'react'
import { NextPage } from 'next'
import SettingsPageLayout from '../../../components/Layouts/SettingsPageLayout'
import SettingsForm from '../../../components/Dashboard/Settings/SettingsForm'
import SettingsFieldset from '../../../components/Dashboard/Settings/SettingsFieldset'
import { useTranslation } from '../../../config/i18n'
import Button, { ButtonVariant } from '../../../elements/Button'

const Account: NextPage = () => {
  const { t } = useTranslation('settings')

  const handleSubmit = () => {}

  return (
    <SettingsPageLayout>
      <SettingsForm onSubmit={handleSubmit}>
        <SettingsFieldset legend={t('accountForm.legend')}>
          <div className="password-fields-wrapper">
            <div className="password-field">
              <label htmlFor="old-password">{t('accountForm.oldPasswordLabel')}</label>
              <input type="text" id="old-password" />
            </div>

            <div className="password-field">
              <label htmlFor="new-password">{t('accountForm.newPasswordLabel')}</label>
              <input type="text" id="new-password" />
            </div>

            <div className="password-field">
              <label htmlFor="confirm-new-password">
                {t('accountForm.confirmNewPasswordLabel')}
              </label>
              <input type="text" id="confirm-new-password" />
            </div>

            <Button className="change-password-submit-button" variant={ButtonVariant.Secondary}>
              {t('accountForm.submitButton')}
            </Button>
          </div>
        </SettingsFieldset>
      </SettingsForm>

      <style jsx>{`
        .password-fields-wrapper {
          margin-top: 40px;
        }

        .password-field {
          display: flex;
          align-items: center;
          margin-top: 15px;
        }

        .password-field:first-child {
          margin-top: 0;
        }

        .password-field label {
          width: 175px;
          flex-shrink: 0;
          margin-right: 30px;
          text-align: right;
        }

        .password-field input {
          width: 300px;
          height: 50px;
          border: 1px solid #95989a;
          border-radius: 5px;
        }

        :global(.change-password-submit-button) {
          margin-top: 20px;
          margin-left: 205px;
        }
      `}</style>
    </SettingsPageLayout>
  )
}

Account.getInitialProps = async () => ({
  namespacesRequired: ['settings'],
})

export default Account
