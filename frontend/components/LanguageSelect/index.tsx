import React from 'react'

import { Language as LanguageType } from '../../generated/graphql'

type LanguageSelectProps = {
  languages: LanguageType[]
  value: number
  onChange: (newValue: number) => void
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({
  languages,
  value,
  onChange,
}: LanguageSelectProps) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value={-1}>Select language...</option>
      {languages.map((lang) => (
        <option value={lang.id} key={lang.id}>
          {lang.name} {lang.dialect && `(${lang.dialect})`}
        </option>
      ))}
    </select>
  )
}

export default LanguageSelect
