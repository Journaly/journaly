import React from 'react'

import theme from '../../theme'
import XIcon from '../../components/Icons/XIcon'
import { Option, OptionValue } from '../../elements/Select/Select'

type Props<T extends OptionValue> = {
  selectedOptions: Option<T>[]
  onRemove?: (value: T) => void
}

const OptionPills = <T extends OptionValue>({ selectedOptions, onRemove = () => {} }: Props<T>) => {
  return (
    <>
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

      <style jsx>{`
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
    </>
  )
}

export default OptionPills

