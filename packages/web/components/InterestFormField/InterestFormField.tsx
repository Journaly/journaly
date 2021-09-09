import React from 'react'
import {
  TopicFragmentFragment as TopicType,
  UserInterest,
  useAddUserInterestMutation,
  useRemoveUserInterestMutation,
} from '@/generated/graphql'
import Button, { ButtonVariant } from '@/components/Button'
import { OptionPills } from '@/components/MultiSelect'
import { useTranslation } from '@/config/i18n'
import Select from '../Select'

type Props = {
  topics: TopicType[]
  userInterests: UserInterest[]
  refetch: () => void
}

const InterestFormField: React.FC<Props> = ({ topics, userInterests, refetch }) => {
  const { t } = useTranslation('settings')
  const [
    addUserInterest,
    { loading: addingUserInterest },
  ] = useAddUserInterestMutation()
  const [
    removeUserInterest,
    { loading: removingUserInterest },
  ] = useRemoveUserInterestMutation()

  const userInterestOptions = userInterests.map(({topic}) => ({
    value: topic.id,
    displayName: topic.name || ''
  }))

  const topicOptions = topics
    .filter(({ id }) => !userInterests.find(({ topic }) => topic.id === id))
    .map((topic) => ({
      value: topic.id,
      displayName: topic.name || ''
    }))

  const [selectedTopicId, setSelectedTopicId] = React.useState<number>(-1)

  const handleAddUserInterest = async () => {
    await addUserInterest({
      variables: {
        topicId: selectedTopicId,
      },
    })
    refetch()
  }

  const handleRemoveUserInterest = async (topicId: number) => {
    await removeUserInterest({ variables: { topicId } })
    refetch()
  }

  return (
    <div>
      <OptionPills selectedOptions={userInterestOptions} onRemove={handleRemoveUserInterest} />

      <div className="user-interest-select">
        <Select
          placeholder={t('profile.interests.interestSelectPlaceholder')}
          options={topicOptions}
          value={selectedTopicId}
          onChange={setSelectedTopicId}
        />
        <Button
          onClick={handleAddUserInterest}
          disabled={selectedTopicId === -1 }
          loading={addingUserInterest || removingUserInterest}
          variant={ButtonVariant.Secondary}
        >
          {t('profile.interests.addInterestButtonText')}
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

export default InterestFormField