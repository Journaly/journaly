import React from 'react'
import { useTranslation } from '@/config/i18n'

import SettingsForm from '@/components/Dashboard/Settings/SettingsForm'
import SettingsFieldset from '@/components/Dashboard/Settings/SettingsFieldset'
import UILanguageSelect from '@/components/UILanguageSelect'

const UILanguageForm = () => {
  const { t } = useTranslation('settings')

  return (
    <SettingsForm>
      <SettingsFieldset legend={t('profile.uiLanguage.legend')}>
        <p>{t('profile.uiLanguage.description')}</p>
        <UILanguageSelect />
      </SettingsFieldset>
      <style jsx>{`
        p {
          margin-bottom: 15px;
        }
      `}</style>
    </SettingsForm>
  )
}

export default UILanguageForm
