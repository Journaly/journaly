import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { sanitize } from '../../../utils'
import { useTranslation } from '../../../config/i18n'
import SettingsForm from '../../../components/Dashboard/Settings/SettingsForm'
import SettingsFieldset from '../../../components/Dashboard/Settings/SettingsFieldset'
import Button, { ButtonVariant } from '../../../elements/Button'
import { useUpdateUserMutation } from '../../../generated/graphql'

type Props = {
  bio: string
}

type FormValues = {
  bio: string
}

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
  const { handleSubmit, register } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  })

  const handleBioSubmit = (data: FormValues): void => {
    if (!loading) {
      updateUser({
        variables: {
          bio: sanitize(data.bio),
        },
      })
    }
  }

  return (
    <SettingsForm onSubmit={handleSubmit(handleBioSubmit)}>
      <SettingsFieldset legend={t('profile.bio.legend')}>
        <div className="bio-wrapper">
          <div className="bio-form-field">
            <label className="settings-label" htmlFor="bio">
              {t('profile.bio.bioLabel')}
            </label>
            {/* TODO: add native maxlength attribute when we know how long this field can be */}
            <textarea
              rows={4}
              id="bio"
              name="bio"
              className="j-textarea"
              defaultValue={sanitize(bio)}
              ref={register()}
            />
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
    </SettingsForm>
  )
}

export default BioForm
