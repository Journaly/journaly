import React from 'react'
import MultiSelect from '@/elements/MultiSelect'
import { Topic } from '@/generated/graphql'

type Props = {
  topics: Topic[] | undefined
  selectedTopicsIds: number[]
  onAdd: (id: number) => void
  onRemove: (id: number) => void
}

const TopicSelect: React.FC<Props> = ({ topics, selectedTopicsIds, onAdd, onRemove }) => {
  const formattedTopicOptions = (topics || []).map(({ name, id, postCount }) => ({
    value: id,
    displayName: `${name} (${postCount} post${(postCount || 0) === 1 ? '' : 's'})`,
    selectedDisplayName: `${name}`,
    disabled: postCount < 1,
  }))

  return (
    <MultiSelect
      options={formattedTopicOptions || []}
      selectedOptionValues={selectedTopicsIds}
      onAdd={onAdd}
      onRemove={onRemove}
      placeholder="Select topics"
    />
  )
}

export default React.memo(TopicSelect)
