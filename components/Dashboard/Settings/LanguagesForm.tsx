import React from 'react'
import { ApolloQueryResult } from '@apollo/client'
import { useTranslation } from '../../../config/i18n'
import {
  LanguagesFormDataQuery,
  Language as LanguageType,
  LanguageRelation as LanguageRelationType,
} from '../../../generated/graphql'

import LanguageFormField from '../../../components/LanguageFormField'
import SettingsForm from '../../../components/Dashboard/Settings/SettingsForm'
import SettingsFieldset from '../../../components/Dashboard/Settings/SettingsFieldset'

type Props = {
  languages: LanguageType[]
  languageRelations: LanguageRelationType[]
  refetch: () => Promise<ApolloQueryResult<LanguagesFormDataQuery>>
}

const LanguagesForm: React.FC<Props> = ({
  languages,
  languageRelations,
  refetch,
}) => {
  const { t } = useTranslation('settings')

  return (
    <SettingsForm>
      <SettingsFieldset legend={t('profile.languages.legend')}>
        <div className="languages-wrapper">
          <div className="languages-form-fields">
            <div className="languages-form-field">
              <label className="settings-label" htmlFor="learning-languages">
                {t('profile.languages.welcomeModalFormLabel')}
              </label>

              <LanguageFormField
                languages={languages}
                languageRelations={languageRelations}
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
