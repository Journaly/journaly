import React from 'react'
import CSS from 'csstype'

import { LanguageFragmentFragment as LanguageType } from '../../generated/graphql'

type LanguageSelectProps = {
  languages: LanguageType[]
  value: number
  onChange: (newValue: number) => void
  id: string | undefined,
  className: string | undefined,
  style: CSS.Properties | undefined,
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({
  languages,
  value,
  onChange,
  id,
  style,
}: LanguageSelectProps) => {
  return (
    <select
      id={id}
      value={value}
      style={style}
      className="j-field"
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
