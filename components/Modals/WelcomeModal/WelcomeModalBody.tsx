import React from 'react'
import { useTranslation } from '../../../config/i18n'
import {
  useLanguagesFormDataQuery,
  useAddLanguageLearningMutation,
  useAddLanguageNativeMutation,
  useRemoveLanguageLearningMutation,
  useRemoveLanguageNativeMutation,
} from '../../../generated/graphql'
import LanguageMultiSelect from '../../../components/LanguageMultiSelect'

type LanguageMutationType = (arg: { variables: { languageId: number } }) => Promise<any>

const WelcomeModalBody: React.FC = () => {
  const { t } = useTranslation('settings')
  const { data, refetch } = useLanguagesFormDataQuery()
  const [addLearningLanguage] = useAddLanguageLearningMutation()
  const [addNativeLanguage] = useAddLanguageNativeMutation()
  const [removeLearningLanguage] = useRemoveLanguageLearningMutation()
  const [removeNativeLanguage] = useRemoveLanguageNativeMutation()

  const mutateLanguageM2M = (mutation: LanguageMutationType) => async (languageId: number) => {
    await mutation({ variables: { languageId } })
    refetch()
  }

  const learningLanguages = (data?.currentUser?.languagesLearning || []).map((x) => x.language.id)
  const nativeLanguages = (data?.currentUser?.languagesNative || []).map((x) => x.language.id)

  const onLearningAdd = mutateLanguageM2M(addLearningLanguage)
  const onNativeAdd = mutateLanguageM2M(addNativeLanguage)
  const onLearningRemove = mutateLanguageM2M(removeLearningLanguage)
  const onNativeRemove = mutateLanguageM2M(removeNativeLanguage)

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
        <LanguageMultiSelect
          languages={data?.languages || []}
          value={nativeLanguages}
          onAdd={onNativeAdd}
          onRemove={onNativeRemove}
        />
      </div>
      <div className="languages-form-field">
        <label className="language-label" htmlFor="learning-languages">
          {t('profile.languages.learningLanguagesLabel')}
        </label>
        <LanguageMultiSelect
          languages={data?.languages || []}
          value={learningLanguages}
          onAdd={onLearningAdd}
          onRemove={onLearningRemove}
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
