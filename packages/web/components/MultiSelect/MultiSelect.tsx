import React from 'react'
import Select, { Option, OptionValue } from '@/components/Select/Select'
import OptionPills from './OptionPills'

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
  const disabledOptions: Option<T>[] = []

  options.forEach((option) => {
    const selectedOption = selectedOptionValues.find(
      (selectedValue) => selectedValue === option.value,
    )

    if (selectedOption) {
      selectedOptions.push(option)
    } else if (option.disabled) {
      disabledOptions.push(option)
    } else {
      availableOptions.push(option)
    }
  })

  return (
    <div className="multiselect-container">
      <OptionPills selectedOptions={selectedOptions} onRemove={onRemove} />
      <Select
        options={[...availableOptions, ...disabledOptions]}
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
      `}</style>
    </div>
  )
}

export default MultiSelect
