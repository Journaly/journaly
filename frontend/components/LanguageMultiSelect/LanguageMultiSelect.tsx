import React from 'react'

import Button from '../../elements/Button'
import LanguageSelect from '../LanguageSelect'
import XIcon from '../Icons/XIcon'
import theme from '../../theme'
import { useTranslation } from '../../config/i18n'
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
  onRemove = () => undefined
}) => {
  const { t } = useTranslation('common')
  const [selectedLanguage, setSelectedLanguage] = React.useState<number>(-1)
  const selectableLanguages = languages.filter(
    lang => value.find(id => lang.id === id) === undefined)

  const addLanguage = () => {
    onAdd(selectedLanguage)
    onChange([...value, selectedLanguage])
    setSelectedLanguage(-1)
  }

  const removeLanguage = (removeLanguage: number) => {
    onRemove(removeLanguage)
    onChange(value.filter(lang => lang !== removeLanguage))
    setSelectedLanguage(-1)
  }

  return (
    <>
      {!value.length && <span className="empty-message">{t('emptyMessage')}</span>}
      {(value.length > 0) && (
        <ul className="lang-list">
          {value.map(id => {
            const lang = languages.find(lang => lang.id === id)
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
          {t('add')}
        </Button>
      </div>
      <style jsx>{`
        .empty-message {
          text-align: center;
          font-style: italic;
        }

        .lang-row {
          display: flex;
          padding: 4px 15px;
        }

        .lang-list li:nth-child(odd) {
          background-color: ${theme.colors.gray100}
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
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .add-container {
          padding-top: 4px;
          display: flex;
        }
      `}</style>
    </>
  )
}

export default LanguageMultiSelect
