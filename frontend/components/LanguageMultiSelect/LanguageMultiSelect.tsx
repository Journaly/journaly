import React from 'react'

import LanguageSelect from '../LanguageSelect'
import XIcon from '../Icons/XIcon'
import theme from '../../theme'
import { LanguageFragmentFragment as LanguageType } from '../../generated/graphql'

type LanguageMultiSelectProps = {
  languages: LanguageType[]
  value: number[]
  onChange?: (newValue: number[]) => void
  onAdd?: (addedId: number) => void
  onRemove?: (removedId: number) => void
}

const LanguageMultiSelect: React.FC<LanguageMultiSelectProps> = ({
  languages,
  value,
  onChange = () => undefined,
  onAdd = () => undefined,
  onRemove = () => undefined,
}) => {
  const [selectedLanguage, setSelectedLanguage] = React.useState<number>(-1)
  const selectableLanguages = languages.filter(
    (lang) => value.find((id) => lang.id === id) === undefined,
  )

  const handleOnChange = (addedLanguage: number) => {
    onAdd(addedLanguage)
    onChange([...value, addedLanguage])
    setSelectedLanguage(-1)
  }

  const removeLanguage = (removeLanguage: number) => {
    onRemove(removeLanguage)
    onChange(value.filter((lang) => lang !== removeLanguage))
    setSelectedLanguage(-1)
  }

  return (
    <div className="language-multiselect">
      {value.length > 0 && (
        <ul className="lang-list">
          {value.map((id) => {
            const lang = languages.find((lang) => lang.id === id)
            if (!lang) {
              throw Error('`value` should be a subset of `languages.map(x=>x.id)`, but is not.')
            }
            return (
              <li key={lang.id}>
                <div className="lang-row">
                  <span className="lang">
                    {lang.name} {lang.dialect && `(${lang.dialect})`}
                  </span>
                  <button
                    type="button"
                    className="remove-lang-button"
                    onClick={() => removeLanguage(lang.id)}
                  >
                    <XIcon size={20} />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
      <LanguageSelect
        languages={selectableLanguages}
        value={selectedLanguage}
        onChange={handleOnChange}
        className="language-select"
      />
      <style jsx>{`
        .language-multiselect :global(.language-select) {
          margin-top: 4px;
        }

        .lang-list {
          display: flex;
          flex-wrap: wrap;
        }

        .lang-list li {
          margin: 4px 8px 4px 0;
          border-radius: 16px;
          background-color: ${theme.colors.gray100};
        }

        .lang-row {
          display: flex;
          padding: 4px 15px;
        }

        .lang-row .lang {
          flex: 1;
          margin-right: 4px;
        }

        .remove-lang-button {
          cursor: pointer;
          border: none;
          padding: 0px;
          background-color: transparent;
          -webkit-appearance: none;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      `}</style>
    </div>
  )
}

export default LanguageMultiSelect
