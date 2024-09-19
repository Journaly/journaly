import React from 'react'
import { useTranslation } from 'next-i18next'
import {
  TopicFragmentFragment as TopicType,
  UserInterestFragmentFragment as UserInterestType,
} from '@/generated/graphql'
import InterestFormField from '@/components/InterestFormField'
import SettingsForm from '@/components/Dashboard/Settings/SettingsForm'
import SettingsFieldset from '@/components/Dashboard/Settings/SettingsFieldset'

type Props = {
  topics: TopicType[]
  userInterests: UserInterestType[]
  refetch: () => void
}

const InterestsForm: React.FC<Props> = ({ topics, userInterests, refetch }) => {
  const { t } = useTranslation('settings')

  return (
    <SettingsForm>
      <SettingsFieldset legend={t('profile.interests.legend')}>
        <div className="interests-wrapper">
          <div className="interests-form-field">
            <label className="settings-label" htmlFor="interests">
              {t('profile.interests.topicsLabel')}
            </label>
            
            <InterestFormField
              topics={topics}
              userInterests={userInterests}
              refetch={refetch}
            />
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

export default InterestsForm
