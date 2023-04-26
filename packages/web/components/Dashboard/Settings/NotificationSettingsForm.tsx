import React, { useState } from 'react'
import { useTranslation } from '@/config/i18n'
import {
  DigestEmailConfiguration as DigestEmailConfigurationType,
  useUpdateUserConfigurationMutation,
} from '@/generated/graphql'
import SettingsForm from '@/components/Dashboard/Settings/SettingsForm'
import SettingsFieldset from '@/components/Dashboard/Settings/SettingsFieldset'
import { toast } from 'react-toastify'
import Select from '@/components/Select'
import Button, { ButtonVariant } from '@/components/Button'

export type UserConfigurationArgType = {
  digestEmail: DigestEmailConfigurationType
}

type Props = {
  userConfiguration: UserConfigurationArgType
  refetch: () => void
}

const NotificationSettingsForm: React.FC<Props> = ({ userConfiguration, refetch }) => {
  const { t } = useTranslation('settings')
  console.log(userConfiguration)
  // The filter operation here is just to remove the "WEEKLY" option
  // until we build support for it
  const digestEmailOptions = (
    Object.keys(DigestEmailConfigurationType) as (keyof typeof DigestEmailConfigurationType)[]
  )
    .filter((key) => DigestEmailConfigurationType[key] !== DigestEmailConfigurationType.Weekly)
    .map((key, index) => ({
      value: index,
      displayName: DigestEmailConfigurationType[key],
    }))

  const currentConfig =
    digestEmailOptions.find((option) => option.displayName === userConfiguration.digestEmail)
      ?.value ?? -1

  const [selectedOptionId, setSelectedOptionId] = useState<number>(currentConfig)

  const [updateUserConfiguration, { loading }] = useUpdateUserConfigurationMutation({
    onCompleted: () => {
      // TODO: add translation
      toast.success('Your settings have been updated successfully!')
    },
    onError: (err) => {
      toast.error(`There was an error updating your settings: ${err}`)
    },
  })

  const handleUpdateDigestEmailConfiguration = () => {
    console.log(userConfiguration.digestEmail)
    updateUserConfiguration({
      variables: {
        digestEmailConfig: digestEmailOptions[selectedOptionId].displayName,
      },
    })
    refetch()
  }

  return (
    <SettingsForm>
      <SettingsFieldset legend={t('profile.notificationSettings.legend')}>
        <div>
          <div className="form-field">
            <label className="settings-label" htmlFor="interests">
              {t('profile.notificationSettings.digestEmailSelectLabel')}
            </label>
            <div className="select-container">
              <Select
                placeholder={t('profile.notificationSettings.digestEmailSelectPlaceholder')}
                options={digestEmailOptions}
                value={selectedOptionId}
                onChange={setSelectedOptionId}
              />
              <Button
                onClick={handleUpdateDigestEmailConfiguration}
                disabled={selectedOptionId === -1 || selectedOptionId === currentConfig}
                loading={loading}
                variant={ButtonVariant.Secondary}
              >
                {t('profile.notificationSettings.updateSettingsButtonText')}
              </Button>
            </div>
          </div>
        </div>
      </SettingsFieldset>

      <style jsx>{`
        .form-field input {
          width: 100%;
        }

        .select-container {
          display: flex;
          padding-top: 15px;
          margin-bottom: 15px;
        }

        .select-container > :global(*:not(:last-child)) {
          margin-right: 10px;
        }
      `}</style>
    </SettingsForm>
  )
}

export default NotificationSettingsForm
