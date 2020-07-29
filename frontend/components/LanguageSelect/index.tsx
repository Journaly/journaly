import React from 'react'
import classNames from 'classnames'

import { LanguageFragmentFragment as LanguageType } from '../../generated/graphql'

type LanguageSelectProps = {
  languages: LanguageType[]
  value: number
  onChange: (newValue: number) => void
  id?: string
  className?: string
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({
  languages,
  value,
  onChange,
  id,
  className,
}: LanguageSelectProps) => {
  return (
    <div className={classNames('language-select-container', className)}>
      <select
        id={id}
        value={value}
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

      <style jsx>{`
        .language-select-container {
          position: relative;
          width: 100%;
        }

        select {
          width: 100%;
        }
      `}</style>
    </div>
  )
}

export default LanguageSelect
