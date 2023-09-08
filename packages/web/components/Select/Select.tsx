import React, { Ref } from 'react'
import classNames from 'classnames'

import LoadingSpinner from '@/components/Icons/LoadingSpinner'
import ChevronIcon from '@/components/Icons/ChevronIcon'
import theme from '@/theme'

export type OptionValue = string | number

export type Option<T extends OptionValue> = {
  value: T
  displayName: string
  selectedDisplayName?: string
  disabled?: boolean
}

type Props<T extends OptionValue> = {
  options: Option<T>[]
  value?: T | undefined
  placeholder: string
  onChange: (value: T, event?: React.ChangeEvent<HTMLSelectElement>) => void
  flat?: boolean
  disabled?: boolean
  loading?: boolean
  id?: string
  name?: string
  className?: string
  dataTestId?: string
}

/*
 * Pass in all options, the current value of the Select (which is an empty string if no
 * value is selected), and an onChange handler that updates the current value.
 *
 * Example usage
 * const options = [
 *   { value: '0', displayName: 'Orange' },
 *   { value: '1', displayName: 'Apple' },
 *   { value: '2', displayName: 'Mango' },
 * ]
 *
 * const [fruitValue, setFruitValue] = useState('')
 *
 * const handleFruitChange = (value: string) => {
 *   setFruitValue(value)
 * }
 *
 * <Select
 *   options={options}
 *   value={fruitValue}
 *   placeholder="Choose a fruit"
 *   onChange={handleFruitChange}
 * />
 */

const SelectBase = <T extends OptionValue>(
  {
    options,
    value,
    placeholder,
    onChange,
    flat = false,
    loading = false,
    disabled = false,
    id,
    name,
    className,
    dataTestId,
  }: Props<T>,
  ref: Ref<HTMLSelectElement>,
) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { selectedIndex } = event.target
    const selectedOption = options[selectedIndex - 1]
    onChange(selectedOption?.value, event)
  }

  return (
    <div className={classNames('select-container', className)}>
      <select
        ref={ref}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={loading || disabled}
        aria-busy={loading}
        data-testid={dataTestId}
      >
        <option value="" key={-1}>
          {placeholder}
        </option>

        {options.map(({ value, displayName, disabled }) => (
          <option value={value} key={value} disabled={disabled}>
            {displayName}
          </option>
        ))}
      </select>

      <div className="select-icon">
        {loading ? (
          <LoadingSpinner size={35} fill={theme.colors.blueLight} />
        ) : (
          <ChevronIcon className="select-arrow" />
        )}
      </div>

      <style jsx>{`
        .select-container {
          position: relative;
          width: 100%;
        }

        .select-container:hover :global(.select-arrow) {
          fill: ${disabled ? '#FFFFFF' : theme.colors.blueLight };
        }

        select {
          height: 50px;
          width: 100%;
          padding: 10px;
          border-radius: 5px;
          background: ${theme.colors.white};

          ${flat
            ? `border: 1px solid ${theme.colors.gray700};`
            : 'box-shadow: 0px 8px 22px #00000029;'
          }

          cursor: ${disabled ? 'auto' : 'pointer'};
          -webkit-appearance: none;
          -moz-appearance: none;
          -ms-appearance: none;
          appearance: none;
        }
        select::-ms-expand {
          display: none;
        }

        .select-icon {
          position: absolute;
          right: 0;
          bottom: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50px;
          width: 50px;
          background: ${theme.colors.charcoal};
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
          pointer-events: none;
        }

        .select-icon :global(.select-arrow) {
          border-radius: 0 5px 5px 0;
          fill: ${theme.colors.white};
          transition: 150ms all ease;
        }
      `}</style>
    </div>
  )
}

const Select = React.forwardRef(SelectBase) as typeof SelectBase

export default Select
