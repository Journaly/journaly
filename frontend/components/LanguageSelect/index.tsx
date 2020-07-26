import React from 'react'
import classNames from 'classnames'

import { LanguageFragmentFragment as LanguageType } from '../../generated/graphql'
import ChevronIcon from '../Icons/ChevronIcon'

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

      <ChevronIcon className="select-arrow" />

      <style jsx>{`
        .language-select-container {
          position: relative;
          width: 100%;
        }

        select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          width: 100%;
        }

        .language-select-container :global(svg) {
          position: absolute;
          display: block;
          right: 0;
          bottom: 7px;
          padding: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}

export default LanguageSelect
