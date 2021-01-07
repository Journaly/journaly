import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useTranslation } from '@/config/i18n'
import FormError from '@/components/FormError'
import SettingsForm from '@/components/Dashboard/Settings/SettingsForm'
import SettingsFieldset from '@/components/Dashboard/Settings/SettingsFieldset'
import Button, { ButtonVariant } from '@/elements/Button'
import { useUpdatePasswordMutation } from '@/generated/graphql'
import theme from '@/theme'

type Props = {}

type FormValues = {
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
}

const UpdatePasswordForm: React.FC<Props> = () => {
  const { t } = useTranslation('settings')

  const { handleSubmit, register, getValues, errors } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  })

  const [updatePassword, { loading }] = useUpdatePasswordMutation({
    onCompleted: () => {
      toast.success(t('account.updatePasswordForm.passwordChangeSuccess'))
    },
    onError: () => {
      toast.error(t('account.updatePasswordForm.updateError'))
    },
  })

  const handleResetPasswordSubmit = (data: FormValues): void => {
    if (!loading && Object.keys(errors).length === 0) {
      updatePassword({
        variables: {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
      })
    }
  }

  const errorInput = Object.values(errors)[0]

  return (
    <SettingsForm
      onSubmit={handleSubmit(handleResetPasswordSubmit)}
      errorInputName={Object.keys(errors)[0] || ''}
    >
      {errorInput && <FormError error={errorInput.message as string} />}

      <SettingsFieldset legend={t('account.updatePasswordForm.legend')}>
        <div className="password-fields-wrapper">
          <div className="password-form-fields">
            <div className="password-field">
              <label htmlFor="oldPassword" className="settings-label">
                {t('account.updatePasswordForm.oldPasswordLabel')}
              </label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                className="j-field"
                ref={register({
                  required: t('account.updatePasswordForm.oldPasswordError') as string,
                })}
                placeholder="Old password"
              />
            </div>

            <div className="password-field">
              <label htmlFor="newPassword" className="settings-label">
                {t('account.updatePasswordForm.newPasswordLabel')}
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="New password"
                className="j-field"
                ref={register({
                  required: t('account.updatePasswordForm.newPasswordError') as string,
                  minLength: {
                    value: 6,
                    message: `${t('account.updatePasswordForm.newPasswordMinimumErrorMessage')}`,
                  },
                  validate: (value) =>
                    value !== getValues('oldPassword') ||
                    (t('account.updatePasswordForm.newPasswordCannotBeTheSameError') as string),
                })}
              />
            </div>

            <div className="password-field">
              <label htmlFor="confirmNewPassword" className="settings-label">
                {t('account.updatePasswordForm.confirmNewPasswordLabel')}
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                className="j-field"
                placeholder="Confirm password"
                ref={register({
                  required: t('account.updatePasswordForm.confirmNewPasswordError') as string,
                  validate: (value) =>
                    value === getValues('newPassword') ||
                    (t('account.updatePasswordForm.confirmNewPasswordMatchError') as string),
                })}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="change-password-submit-button settings-submit-button"
            variant={ButtonVariant.Secondary}
            loading={loading}
          >
            {t('account.updatePasswordForm.submitButton')}
          </Button>
        </div>
      </SettingsFieldset>
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
    </SettingsForm>
  )
}

export default UpdatePasswordForm
