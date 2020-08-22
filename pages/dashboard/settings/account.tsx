import React from 'react'
import { useForm } from 'react-hook-form'
import { NextPage } from 'next'
import { withApollo } from '@lib/apollo'
import { useTranslation } from '@config/i18n'
import Button, { ButtonVariant } from '@elements/Button'
import AuthGate from '@components/AuthGate'
import FormError from '@components/FormError'
import SettingsPageLayout from '@components/Layouts/SettingsPageLayout'
import SettingsForm from '@components/Dashboard/Settings/SettingsForm'
import SettingsFieldset from '@components/Dashboard/Settings/SettingsFieldset'
import theme from '@theme'

const Account: NextPage = () => {
  const { t } = useTranslation('settings')
  const { handleSubmit, register, getValues, errors } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  })

  const fieldErrorName = Object.keys(errors)[0] || ''
  const fieldError = errors[fieldErrorName]

  const onChangePasswordSubmit = () => {}

  return (
    <AuthGate>
      <SettingsPageLayout>
        <SettingsForm
          onSubmit={handleSubmit(onChangePasswordSubmit)}
          errorInputName={fieldErrorName}
        >
          <SettingsFieldset legend={t('accountForm.legend')}>
            <div className="password-fields-wrapper">
              {fieldError && <FormError error={fieldError.message as string} />}

              <div className="password-form-fields">
                <div className="password-field">
                  <label htmlFor="old-password" className="settings-label">
                    {t('accountForm.oldPasswordLabel')}
                  </label>
                  <input
                    type="text"
                    id="old-password"
                    name="old-password"
                    className="j-field"
                    ref={register({ required: t('accountForm.oldPasswordError') as string })}
                  />
                </div>

                <div className="password-field">
                  <label htmlFor="new-password" className="settings-label">
                    {t('accountForm.newPasswordLabel')}
                  </label>
                  <input
                    type="text"
                    id="new-password"
                    name="new-password"
                    className="j-field"
                    ref={register({ required: t('accountForm.newPasswordError') as string })}
                  />
                </div>

                <div className="password-field">
                  <label htmlFor="confirm-new-password" className="settings-label">
                    {t('accountForm.confirmNewPasswordLabel')}
                  </label>
                  <input
                    type="text"
                    id="confirm-new-password"
                    name="confirm-new-password"
                    className="j-field"
                    ref={register({
                      required: t('accountForm.confirmNewPasswordError') as string,
                      validate: (value) =>
                        value === getValues('new-password') ||
                        (t('accountForm.confirmNewPasswordMatchError') as string),
                    })}
                  />
                </div>
              </div>

              <Button
                className="change-password-submit-button settings-submit-button"
                variant={ButtonVariant.Secondary}
              >
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
            flex-direction: column;
            margin-top: 15px;
          }

          @media (min-width: ${theme.breakpoints.MD}) {
            .password-field {
              flex-direction: row;
              align-items: center;
            }
          }

          .password-field:first-child {
            margin-top: 0;
          }

          .password-field label {
            width: 175px;
            flex-shrink: 0;
            margin-right: 30px;
          }
          @media (min-width: ${theme.breakpoints.MD}) {
            .password-field label {
              text-align: right;
            }
          }

          .password-field input {
            width: 300px;
          }

          :global(.change-password-submit-button) {
            margin-left: 205px;
          }
        `}</style>
      </SettingsPageLayout>
    </AuthGate>
  )
}

Account.getInitialProps = async () => ({
  namespacesRequired: ['settings'],
})

export default withApollo(Account)
