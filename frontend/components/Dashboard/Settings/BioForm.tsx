import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from '../../../config/i18n'
import SettingsForm from '../../../components/Dashboard/Settings/SettingsForm'
import SettingsFieldset from '../../../components/Dashboard/Settings/SettingsFieldset'
import Button, { ButtonVariant } from '../../../elements/Button'

const BioForm: React.FC = () => {
  const { t } = useTranslation('settings')
  const { handleSubmit, register } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  })

  const handleBioSubmit = (): void => {}

  return (
    <SettingsForm onSubmit={handleSubmit(handleBioSubmit)}>
      <SettingsFieldset legend={t('profile.bio.legend')}>
        <div className="bio-wrapper">
          <div className="bio-form-field">
            <label className="settings-label" htmlFor="bio">
              {t('profile.bio.bioLabel')}
            </label>
            {/* TODO: add native maxlength attribute when we know how long this field can be */}
            <textarea rows={4} id="bio" name="bio" className="j-textarea" ref={register()} />
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
    </SettingsForm>
  )
}

export default BioForm
