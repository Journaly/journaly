import React from 'react'
import { ApolloQueryResult } from '@apollo/client'
import { useTranslation } from '../../../config/i18n'
import {
  LanguagesFormDataQuery,
  Language as LanguageType,
  LanguageNative as LanguageNativeType,
  LanguageLearning as LanguageLearningType,
} from '../../../generated/graphql'

import NativeLanguageFormField from '../../../components/NativeLanguageFormField'
import LearningLanguageFormField from '../../../components/LearningLanguageFormField'
import SettingsForm from '../../../components/Dashboard/Settings/SettingsForm'
import SettingsFieldset from '../../../components/Dashboard/Settings/SettingsFieldset'

type Props = {
  languages: LanguageType[]
  nativeLanguages: LanguageNativeType[]
  learningLanguages: LanguageLearningType[]
  refetch: () => Promise<ApolloQueryResult<LanguagesFormDataQuery>>
}

const LanguagesForm: React.FC<Props> = ({
  languages,
  nativeLanguages,
  learningLanguages,
  refetch,
}) => {
  const { t } = useTranslation('settings')

  return (
    <SettingsForm>
      <SettingsFieldset legend={t('profile.languages.legend')}>
        <div className="languages-wrapper">
          <div className="languages-form-fields">
            <div className="languages-form-field">
              <label className="settings-label" htmlFor="native-languages">
                {t('profile.languages.nativeLanguagesLabel')}
              </label>

              <NativeLanguageFormField
                languages={languages}
                nativeLanguages={nativeLanguages}
                refetch={refetch}
              />
            </div>
            <div className="languages-form-field">
              <label className="settings-label" htmlFor="learning-languages">
                {t('profile.languages.learningLanguagesLabel')}
              </label>

              <LearningLanguageFormField
                languages={languages}
                learningLanguages={learningLanguages}
                refetch={refetch}
              />
            </div>
          </div>
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
