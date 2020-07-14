import React from 'react'

import Button from '../../elements/Button'
import LanguageSelect from '../LanguageSelect'
import XIcon from '../Icons/XIcon'
import { LanguageFragmentFragment as LanguageType } from '../../generated/graphql'

type LanguageMultiSelectProps = {
  languages: LanguageType[]
  value: number[]
  onChange: (newValue: number[]) => void
  onAdd: (addedId: number) => void
  onRemove: (removedId: number) => void
  id: string | undefined
}

const LanguageMultiSelect: React.FC<LanguageMultiSelectProps> = ({
  languages,
  value,
  onChange,
  onAdd,
  onRemove
}: LanguageSelectProps) => {
  const [selectedLanguage, setSelectedLanguage] = React.useState<number>(-1)
  const selectableLanguages = languages.filter(
    lang => value.find(id => lang.id === id) === undefined)

  const addLanguage = () => {
    onAdd(selectedLanguage)
    onChange([selectedLanguage, ...value])
    setSelectedLanguage(-1)
  }

  const removeLanguage = (removeLanguage) => {
    onRemove(removeLanguage)
    onChange(value.filter(lang => lang !== removeLanguage))
    setSelectedLanguage(-1)
  }

  return (
    <>
      {!value.length && <span>Empty...</span>}
      {(value.length > 0) && (
        <ul>
          {value.map(id => {
            const lang = languages.find(lang => lang.id === id)
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
                    <XIcon />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
      <div className="add-container">
        <LanguageSelect
          languages={selectableLanguages}
          value={selectedLanguage}
          onChange={setSelectedLanguage}
          className="lang-select"
          style={{ flex: 1 }}
        />
        <Button
          style={{
            alignSelf: 'stretch',
            marginLeft: '5px'
          }}
          onClick={addLanguage}
          disabled={selectedLanguage === -1}
        >
          Add
        </Button>
      </div>
      <style jsx>{`
        .lang-row {
          display: flex;
        }

        .lang-row .lang {
          flex: 1;
        }

        .remove-lang-button {
          cursor: pointer;
          border: none;
          padding: 0px;
          background-color: transparent;
          -webkit-appearance: none;
        }

        .add-container {
          display: flex;
        }
      `}</style>
    </>
  )
}

LanguageMultiSelect.defaultProps = {
  id: undefined,
  onChange: () => undefined,
  onAdd: () => undefined,
  onRemove: () => undefined,
}

export default LanguageMultiSelect
