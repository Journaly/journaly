import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import SettingsForm from '@/components/Dashboard/Settings/SettingsForm'
import SettingsFieldset from '@/components/Dashboard/Settings/SettingsFieldset'
import Button, { ButtonVariant } from '@/components/Button'

const InterestsForm: React.FC = () => {
  const { t } = useTranslation('settings')
  const { handleSubmit, register } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  })

  const handleInterestsSubmit = (): void => {}
  return (
    <SettingsForm onSubmit={handleSubmit(handleInterestsSubmit)}>
      <SettingsFieldset legend={t('profile.interests.legend')}>
        <div className="interests-wrapper">
          <div className="interests-form-field">
            <label className="settings-label" htmlFor="interests">
              {t('profile.interests.topicsLabel')}
            </label>
            <input
              type="text"
              id="interests"
              name="interests"
              className="j-field"
              ref={register()}
              placeholder={t('profile.interests.topicsPlaceholder')}
              disabled={true}
            />
          </div>
          <Button
            type="submit"
            className="settings-submit-button"
            variant={ButtonVariant.Secondary}
            disabled={true}
          >
            {t('updateButton')}
          </Button>
        </div>
      </SettingsFieldset>

      <style jsx>{`
        .interests-form-field input {
          width: 100%;
        }
      `}</style>
    </SettingsForm>
  )
}

export default InterestsForm
