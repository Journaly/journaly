import React from 'react'
import MultiSelect from '@/components/MultiSelect'
import { Topic } from '@/generated/graphql'
import { useTranslation } from '@/config/i18n'

type Props = {
  topics: Topic[] | undefined
  selectedTopicsIds: number[]
  onAdd: (id: number) => void
  onRemove: (id: number) => void
  showPostCount?: boolean
}

const TopicSelect: React.FC<Props> = ({
  topics,
  selectedTopicsIds,
  onAdd,
  onRemove,
  showPostCount = true,
}) => {
  const { t } = useTranslation('my-feed')
  const formattedTopicOptions = (topics || []).map(({ name, id, postCount }) => ({
    value: id,
    displayName: `${name} ${
      showPostCount ? `${postCount} post${(postCount || 0) === 1 ? '' : 's'}` : ''
    }`,
    selectedDisplayName: `${name}`,
    disabled: postCount < 1,
  }))

  return (
    <MultiSelect
      options={formattedTopicOptions || []}
      selectedOptionValues={selectedTopicsIds}
      onAdd={onAdd}
      onRemove={onRemove}
      placeholder={t('topicSelectPlaceholder')}
    />
  )
}

export default React.memo(TopicSelect)
