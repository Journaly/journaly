import React from 'react'
import { useTranslation } from '@config/i18n'
import { ApolloQueryResult } from '@apollo/client'
import {
  LanguagesFormDataQuery,
  Language as LanguageType,
  LanguageNative as LanguageNativeType,
  LanguageLearning as LanguageLearningType,
} from '@generated'
import NativeLanguageFormField from '@components/NativeLanguageFormField'
import LearningLanguageFormField from '@components/LearningLanguageFormField'

type Props = {
  languageFormData: LanguagesFormDataQuery
  refetch: () => Promise<ApolloQueryResult<LanguagesFormDataQuery>>
}

const WelcomeModalBody: React.FC<Props> = ({ languageFormData, refetch }) => {
  const { t } = useTranslation('settings')
  const languages = languageFormData.languages as LanguageType[]
  const nativeLanguages = languageFormData.currentUser?.languagesNative as LanguageNativeType[]
  const learningLanguages = languageFormData.currentUser
    ?.languagesLearning as LanguageLearningType[]

  return (
    <div>
      <p className="welcome-description">
        Let's get started by adding the languages you speak and are learning. This helps us find
        relevant content for you as well as let other users know a bit more about you. If you want
        to add your languages later, you can always update them on the settings page.
      </p>

      <div className="languages-form-field">
        <label className="language-label" htmlFor="native-languages">
          {t('profile.languages.nativeLanguagesLabel')}
        </label>

        <NativeLanguageFormField
          languages={languages}
          nativeLanguages={nativeLanguages}
          refetch={refetch}
        />
      </div>
      <div className="languages-form-field">
        <label className="language-label" htmlFor="learning-languages">
          {t('profile.languages.learningLanguagesLabel')}
        </label>

        <LearningLanguageFormField
          languages={languages}
          learningLanguages={learningLanguages}
          refetch={refetch}
        />
      </div>

      <style jsx>{`
        .welcome-description {
          margin-bottom: 30px;
        }

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

        .language-label {
          margin-bottom: 4px;
        }
      `}</style>
    </div>
  )
}

export default WelcomeModalBody
