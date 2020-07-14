import React from 'react'
import { useTranslation } from '../../../config/i18n'
import {
  useLanguagesFormDataQuery
} from '../../../generated/graphql'

import LanguageMultiSelect from '../../../components/LanguageMultiSelect'
import SettingsForm from '../../../components/Dashboard/Settings/SettingsForm'
import SettingsFieldset from '../../../components/Dashboard/Settings/SettingsFieldset'
import Button, { ButtonVariant } from '../../../elements/Button'

const LanguagesForm: React.FC<LanguagesFormProps> = () => {
  const { t } = useTranslation('settings')
  const { data, loading } = useLanguagesFormDataQuery()
  
  const learningLanguages = (data?.currentUser.languagesLearning || []).map(x => x.language.id)
  const onLearningAdd = (langId) => {
    console.log(langId)
  }

  return (
    <SettingsForm>
      <SettingsFieldset legend={t('profile.languages.legend')}>
        <div className="languages-wrapper">
          <div className="languages-form-fields">
            <div className="languages-form-field">
              <label className="settings-label" htmlFor="native-languages">
                {t('profile.languages.nativeLanguagesLabel')}
              </label>
            </div>
            <div className="languages-form-field">
              <label className="settings-label" htmlFor="learning-languages">
                {t('profile.languages.learningLanguagesLabel')}
              </label>
              <LanguageMultiSelect
                languages={data?.languages || []}
                value={learningLanguages}
                onAdd={onLearningAdd}
              />
            </div>
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

      <style jsx>{`
        .languages-form-field {
          display: flex;
          flex-direction: column;
        }

        .languages-form-field {
          margin-bottom: 24px;
        }

        .languages-form-field:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </SettingsForm>
  )
}

export default LanguagesForm
