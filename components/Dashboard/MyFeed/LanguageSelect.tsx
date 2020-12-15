import React from 'react'
import MultiSelect from '../../../elements/MultiSelect'
import { LanguagesQuery } from '../../../generated/graphql'

type Props = {
  languagesData: LanguagesQuery | undefined
  selectedLanguagesIds: number[]
  onAdd: (id: number) => void
  onRemove: (id: number) => void
}

const LanguageSelect: React.FC<Props> = ({
  languagesData,
  selectedLanguagesIds,
  onAdd,
  onRemove,
}) => {
  const languageOptions = (languagesData?.languages || []).map(
    ({ dialect, id, name, postCount }) => {
      const languageName =
        typeof dialect === 'string' && dialect.length > 0 ? `${name} - ${dialect}` : `${name}`
      return {
        value: id,
        displayName: `${languageName} (${postCount} post${(postCount || 0) === 1 ? '' : 's'})`,
        selectedDisplayName: languageName,
      }
    },
  )

  return (
    <MultiSelect
      options={languageOptions}
      selectedOptionValues={selectedLanguagesIds}
      placeholder="Languages"
      onAdd={onAdd}
      onRemove={onRemove}
    />
  )
}

export default React.memo(LanguageSelect)
