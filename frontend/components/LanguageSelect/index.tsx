import React from 'react'

import { LanguageFragmentFragment as LanguageType } from '../../generated/graphql'

type LanguageSelectProps = {
  languages: LanguageType[]
  value: number
  onChange: (newValue: number) => void
  id: string
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({
  languages,
  value,
  onChange,
  id,
}: LanguageSelectProps) => {
  return (
    <select
      id={id}
      className="j-field"
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value, 10))}
    >
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
