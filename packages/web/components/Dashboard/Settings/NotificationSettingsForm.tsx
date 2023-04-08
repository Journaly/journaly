import React from 'react'
import { useTranslation } from '@/config/i18n'
import {
  TopicFragmentFragment as TopicType,
  UserConfiguration,
  UserInterestFragmentFragment as UserInterestType,
} from '@/generated/graphql'
import InterestFormField from '@/components/InterestFormField'
import SettingsForm from '@/components/Dashboard/Settings/SettingsForm'
import SettingsFieldset from '@/components/Dashboard/Settings/SettingsFieldset'
import DigestEmailConfigurationFormField from '@/components/DigestEmailConfigurationFormField/DigestEmailConfigurationFormField'

type Props = {
  userConfiguration: UserConfiguration
  refetch: () => void
}

const NotificationSettingsForm: React.FC<Props> = ({ userConfiguration, refetch }) => {
  const { t } = useTranslation('settings')

  return (
    <SettingsForm>
      <SettingsFieldset legend={t('profile.notificationSettings.legend')}>
        <div className="interests-wrapper">
          <div className="interests-form-field">
            <label className="settings-label" htmlFor="interests">
              {t('profile.notificationSettings.digestEmailSelectLabel')}
            </label>
            <DigestEmailConfigurationFormField digestEmailConfig={userConfiguration.digestEmail} />
          </div>
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

export default NotificationSettingsForm
