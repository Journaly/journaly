import React, { useState } from 'react'
import Select, { Option } from '../../elements/Select/Select'
import XIcon from '../../components/Icons/XIcon'
import theme from '../../theme'

export type { Option }

type Props = {
  options: Option[]
  selections: Option[]
  placeholder: string
  name?: string
  id?: string
  loading?: boolean
  onAdd?: (value: string) => void
  onRemove?: (value: string) => void
}

const MultiSelect: React.FC<Props> = ({
  options,
  selections,
  placeholder,
  name,
  id,
  loading = false,
  onAdd = () => {},
  onRemove = () => {},
}) => {
  const [availableOptions, setAvailableOptions] = useState(options)
  const handleAddSelection = (value: string) => {
    setAvailableOptions(availableOptions.filter((option) => option.value != value))
    onAdd(value)
  }
  const handleRemoveSelection = (value: string) => {
    const availableOption = options.find((option) => option.value == value) as Option
    setAvailableOptions([...availableOptions, availableOption])
    onRemove(value)
  }

  return (
    <div className="multiselect-container">
      {selections.length > 0 && (
        <ul className="selections">
          {selections.map((selection, i) => {
            const { value, displayName } = selection

            return (
              <li key={`${value}-${i}`}>
                <div className="selection-row">
                  <span className="selection">{displayName}</span>

                  <button
                    type="button"
                    className="remove-selection-button"
                    onClick={() => handleRemoveSelection(value)}
                  >
                    <XIcon size={20} />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}

      <Select
        options={availableOptions}
        value=""
        placeholder={placeholder}
        loading={loading}
        name={name}
        id={id}
        className="select-field"
        onChange={handleAddSelection}
      />

      <style jsx>{`
        .multiselect-container {
          width: 100%;
        }

        .multiselect-container :global(.select-field) {
          margin-top: 4px;
        }

        .selections {
          display: flex;
          flex-wrap: wrap;
        }

        .selections li {
          margin: 4px 8px 4px 0;
          border-radius: 16px;
          background-color: ${theme.colors.gray100};
        }

        .selection-row {
          display: flex;
          padding: 4px 15px;
        }

        .selection {
          flex: 1;
          margin-right: 4px;
        }

        .remove-selection-button {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0px;
          border: none;
          background-color: transparent;
          cursor: pointer;
          -webkit-appearance: none;
        }
      `}</style>
    </div>
  )
}

export default MultiSelect
