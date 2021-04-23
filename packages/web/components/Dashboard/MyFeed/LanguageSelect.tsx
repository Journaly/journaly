import React from 'react'
import MultiSelect from '@/components/MultiSelect'
import { LanguagesQuery } from '@/generated/graphql'
import { useTranslation } from 'next-i18next'

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
  const { t } = useTranslation('my-feed')
  const languageOptions = (languagesData?.languages || []).map(
    ({ dialect, id, name, postCount }) => {
      const languageName =
        typeof dialect === 'string' && dialect.length > 0 ? `${name} - ${dialect}` : `${name}`
      return {
        value: id,
        displayName: `${languageName} (${postCount} post${(postCount || 0) === 1 ? '' : 's'})`,
        selectedDisplayName: languageName,
        disabled: postCount < 1,
      }
    },
  )

  return (
    <MultiSelect
      options={languageOptions}
      selectedOptionValues={selectedLanguagesIds}
      placeholder={t('languageSelectPlaceholder')}
      onAdd={onAdd}
      onRemove={onRemove}
    />
  )
}

export default React.memo(LanguageSelect)
