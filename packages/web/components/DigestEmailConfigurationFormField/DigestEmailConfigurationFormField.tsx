import React, { useState } from 'react'
import {
  useAddUserInterestMutation,
  DigestEmailConfiguration as DigestEmailConfigurationType,
} from '@/generated/graphql'
import Button, { ButtonVariant } from '@/components/Button'
import { useTranslation } from '@/config/i18n'
import Select from '../Select'

type Props = {
  digestEmailConfig: DigestEmailConfigurationType
  refetch: () => void
}

const DigestEmailConfigurationFormField: React.FC<Props> = ({ digestEmailConfig, refetch }) => {
  const { t } = useTranslation('settings')

  // The filter operation here is just to remove the "WEEKLY" option
  // until we build support for it
  const options = (Object.keys(DigestEmailConfigurationType) as (keyof typeof DigestEmailConfigurationType)[]).map(
    (key, index) => ({
      value: index,
      displayName: DigestEmailConfigurationType[key],
    }),
  ).filter((option) => option.displayName !== DigestEmailConfigurationType.Weekly);

  // TODO: Figure out why this is -1 even though loggig everything before the OR returns 0
  const currentConfig = options.find((option) => option.displayName === digestEmailConfig)?.value || -1
  const [selectedOptionId, setSelectedOptionId] = useState<number>(currentConfig)
  console.log(digestEmailConfig)
  const [
    addUserInterest,
    { loading: addingUserInterest },
  ] = useAddUserInterestMutation()
  
  console.log(currentConfig)

  const handleAddUserInterest = async () => {
    // await addUserInterest({
    //   variables: {
    //     topicId: selectedTopicId,
    //   },
    // })
    refetch()
  }


  return (
    <div>
      <div className="user-interest-select">
        <Select
          placeholder={t('profile.notificationSettings.digestEmailSelectPlaceholder')}
          options={options}
          value={selectedOptionId}
          onChange={setSelectedOptionId}
        />
        <Button
          onClick={handleAddUserInterest}
          disabled={selectedOptionId === -1 || selectedOptionId === currentConfig }
          loading={addingUserInterest}
          variant={ButtonVariant.Secondary}
        >
          {t('profile.notificationSettings.updateSettingsButtonText')}
        </Button>

        <style jsx>{`
          .user-interest-select {
            display: flex;
            padding-top: 15px;
            margin-bottom: 15px;
          }

          .user-interest-select > :global(*:not(:last-child)) {
            margin-right: 10px;
          }
        `}</style>
      </div>
    </div>
  )
}

export default DigestEmailConfigurationFormField