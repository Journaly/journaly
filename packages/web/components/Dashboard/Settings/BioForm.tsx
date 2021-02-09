import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { sanitize } from '@/utils'
import { useTranslation } from '@/config/i18n'
import FormError from '@/components/FormError'
import SettingsForm from '@/components/Dashboard/Settings/SettingsForm'
import SettingsFieldset from '@/components/Dashboard/Settings/SettingsFieldset'
import Button, { ButtonVariant } from '@/components/Button'
import { useUpdateUserMutation } from '@/generated/graphql'
import theme from '@/theme'

type Props = {
  bio: string
}

type FormValues = {
  bio: string
}

const BIO_MAX_LENGTH = 400

const BioForm: React.FC<Props> = ({ bio }) => {
  const { t } = useTranslation('settings')
  const [updateUser, { loading }] = useUpdateUserMutation({
    onCompleted: () => {
      toast.success(t('profile.bio.bioSuccess'))
    },
    onError: () => {
      toast.error(t('profile.error.updateError'))
    },
  })
  const { handleSubmit, register, errors } = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const handleBioSubmit = (data: FormValues): void => {
    if (!loading && Object.keys(errors).length === 0) {
      updateUser({
        variables: {
          bio: sanitize(data.bio.trim().slice(0, BIO_MAX_LENGTH)),
        },
      })
    }
  }

  return (
    <SettingsForm
      onSubmit={handleSubmit(handleBioSubmit)}
      errorInputName={Object.keys(errors)[0] || ''}
    >
      <SettingsFieldset legend={t('profile.bio.legend')}>
        <div className="bio-wrapper">
          {errors.bio && <FormError error={errors.bio.message as string} />}

          <div className="bio-form-field">
            <label className="settings-label" htmlFor="bio">
              {t('profile.bio.bioLabel')}
            </label>

            <textarea
              rows={4}
              id="bio"
              name="bio"
              className="j-textarea"
              defaultValue={sanitize(bio)}
              ref={register({
                maxLength: {
                  value: BIO_MAX_LENGTH,
                  message: t('profile.bio.bioError', { characters: BIO_MAX_LENGTH }),
                },
              })}
            />

            <p className="textarea-details">
              {t('profile.bio.bioInputDescription', { characters: BIO_MAX_LENGTH })}
            </p>
          </div>

          <Button
            type="submit"
            className="settings-submit-button"
            variant={ButtonVariant.Secondary}
            loading={loading}
          >
            {t('updateButton')}
          </Button>
        </div>
      </SettingsFieldset>

      <style jsx>{`
        .textarea-details {
          ${theme.typography.paragraphSM};
          color: ${theme.colors.gray800};
        }
      `}</style>
    </SettingsForm>
  )
}

export default BioForm
