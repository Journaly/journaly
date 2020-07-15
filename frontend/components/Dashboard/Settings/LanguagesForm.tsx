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
import SettingsForm from '../../../components/Dashboard/Settings/SettingsForm'
import SettingsFieldset from '../../../components/Dashboard/Settings/SettingsFieldset'

type LanguageMutationType = ({ variables: { languageId: number } }) => Promise<any>

const LanguagesForm: React.FC = () => {
  const { t } = useTranslation('settings')
  const { data, refetch } = useLanguagesFormDataQuery()
  const [addLearningLanguage] = useAddLanguageLearningMutation()
  const [addNativeLanguage] = useAddLanguageNativeMutation()
  const [removeLearningLanguage] = useRemoveLanguageLearningMutation()
  const [removeNativeLanguage] = useRemoveLanguageNativeMutation()

  const mutateLanguageM2M = (mutation: LanguageMutationType) => async languageId => {
    await mutation({ variables: { languageId } })
    refetch()
  }
  
  const learningLanguages = (data?.currentUser.languagesLearning || []).map(x => x.language.id)
  const nativeLanguages = (data?.currentUser.languagesNative || []).map(x => x.language.id)

  const onLearningAdd = mutateLanguageM2M(addLearningLanguage) 
  const onNativeAdd = mutateLanguageM2M(addNativeLanguage) 
  const onLearningRemove = mutateLanguageM2M(removeLearningLanguage) 
  const onNativeRemove = mutateLanguageM2M(removeNativeLanguage) 

  return (
    <SettingsForm>
      <SettingsFieldset legend={t('profile.languages.legend')}>
        <div className="languages-wrapper">
          <div className="languages-form-fields">
            <div className="languages-form-field">
              <label className="settings-label" htmlFor="native-languages">
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
              <label className="settings-label" htmlFor="learning-languages">
                {t('profile.languages.learningLanguagesLabel')}
              </label>
              <LanguageMultiSelect
                languages={data?.languages || []}
                value={learningLanguages}
                onAdd={onLearningAdd}
                onRemove={onLearningRemove}
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
