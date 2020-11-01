import React from 'react'
import Select, { Option, OptionValue } from '../../elements/Select/Select'
import XIcon from '../../components/Icons/XIcon'
import theme from '../../theme'

export type { Option }

type Props<T extends OptionValue> = {
  options: Option<T>[]
  selectedOptionValues: T[]
  placeholder: string
  name?: string
  id?: string
  loading?: boolean
  onAdd?: (value: T) => void
  onRemove?: (value: T) => void
  disabled?: boolean
}

/*
 * Pass in all options, the currently selected values (which is an empty array if no
 * value is selected), and onAdd/onRemove handlers that update the currently selected values.
 *
 * Example usage
 * const options = [
 *   { value: '0', displayName: 'Orange' },
 *   { value: '1', displayName: 'Apple' },
 *   { value: '2', displayName: 'Mango' },
 * ]
 *
 * const [values, setValues] = useState<string[]>([])
 *
 * const handleFruitAdd = (value: string) => {
 *   setValues([...values, value])
 * }
 * const handleFruitRemoval = (value: string) => {
 *   setValues(values.filter((currentValue) => currentValue != value))
 * }
 *
 * <MultiSelect
 *   options={options}
 *   selectedOptionValues={values}
 *   placeholder="Choose fruits"
 *   onAdd={handleFruitAdd}
 *   onRemove={handleFruitRemoval}
 * />
 *
 * If you need to update an API will interacting with MultiSelect, set the loading prop to true,
 * which shows a spinner and disables the select.
 */

const MultiSelect = <T extends OptionValue>({
  options,
  selectedOptionValues,
  placeholder,
  name,
  id,
  loading = false,
  onAdd = () => {},
  onRemove = () => {},
  disabled = false,
}: Props<T>) => {
  const availableOptions: Option<T>[] = []
  const selectedOptions: Option<T>[] = []

  options.forEach((option) => {
    const selectedOption = selectedOptionValues.find(
      (selectedValue) => selectedValue === option.value,
    )

    if (selectedOption) {
      selectedOptions.push(option)
    } else {
      availableOptions.push(option)
    }
  })

  return (
    <div className="multiselect-container">
      {selectedOptions.length > 0 && (
        <ul className="selected-options">
          {selectedOptions.map((selectedOption, i) => {
            const { value, displayName, selectedDisplayName } = selectedOption

            return (
              <li key={`${value}-${i}`}>
                <div className="selected-option-row">
                  <span className="selected-option">{selectedDisplayName || displayName}</span>

                  <button
                    type="button"
                    className="remove-selected-option-button"
                    onClick={() => onRemove(value)}
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
        placeholder={placeholder}
        loading={loading}
        name={name}
        id={id}
        className="select-field"
        onChange={(value) => onAdd(value)}
        disabled={disabled}
      />

      <style jsx>{`
        .multiselect-container {
          width: 100%;
        }

        .multiselect-container :global(.select-field) {
          margin-top: 4px;
        }

        .selected-options {
          display: flex;
          flex-wrap: wrap;
        }

        .selected-options li {
          margin: 4px 8px 4px 0;
          border-radius: 16px;
          background-color: ${theme.colors.gray100};
          box-shadow: 0px 3px 4px #00000029;
        }

        .selected-option-row {
          display: flex;
          padding: 4px 15px;
        }

        .selected-option {
          flex: 1;
          margin-right: 4px;
        }

        .remove-selected-option-button {
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
