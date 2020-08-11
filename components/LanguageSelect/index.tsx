import React from 'react'
import classNames from 'classnames'

import ChevronIcon from '../Icons/ChevronIcon'
import { LanguageFragmentFragment as LanguageType } from '../../generated/graphql'
import theme from '../../theme'

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

        .language-select-container:hover :global(.select-arrow) {
          fill: ${theme.colors.blueLight};
        }

        .language-select-container :global(.select-arrow) {
          position: absolute;
          display: block;
          right: 0;
          bottom: 0;
          padding: 0;
          pointer-events: none;
          background: ${theme.colors.charcoal};
          border-radius: 0 5px 5px 0;
          fill: ${theme.colors.white};
          transition: 0.25s all ease;
        }

        select {
          width: 100%;
        }
      `}</style>
    </div>
  )
}

export default LanguageSelect
