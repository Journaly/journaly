import React from 'react'
import { useSlate, useFocused } from 'slate-react'
import classNames from 'classnames'

import theme from '@/theme'
import { useTranslation } from '@/config/i18n'

import { ButtonType, toogleByType, isTypeActive } from './helpers'

type ButtonProps = {
  type: ButtonType
  format: string
  children: React.ReactNode
}

const ToolbarButton = ({ type, format, children }: ButtonProps) => {
  const { t } = useTranslation('post')
  const editor = useSlate()
  const isEditorFocused = useFocused()
  const active = isEditorFocused && isTypeActive({ type, format, editor })
  const buttonClasses = classNames('toolbar-button', { active })

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault()
    toogleByType({ type, format, editor, t })
  }

  return (
    <div className={buttonClasses} onMouseDown={handleMouseDown}>
      {children}

      <style jsx>{`
        .toolbar-button {
          height: 100%;
          margin-right: 10px;
          border-radius: 5px;
          background-color: ${theme.colors.gray800};
          cursor: pointer;
        }

        .toolbar-button:last-child {
          margin-right: 0;
        }

        .toolbar-button:hover {
          box-shadow: 0px 8px 10px #00000029;
        }

        .toolbar-button :global(svg) {
          display: block;
        }

        .toolbar-button.active :global(svg) {
          fill: ${theme.colors.blueLight};
          color: ${theme.colors.blueLight};
        }
      `}</style>
    </div>
  )
}

export default ToolbarButton
