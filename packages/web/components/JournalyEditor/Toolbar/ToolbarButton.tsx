import React, { useCallback } from 'react'
import { useSlate, useFocused } from 'slate-react'

import { useTranslation } from '@/config/i18n'

import BaseToolbarButton from './BaseToolbarButton'
import { ButtonType, toogleByType, isTypeActive } from '../helpers'

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

  const handleClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault()
    toogleByType({ type, format, editor, t })
  }, [type, format, editor, t])

  return (
    <BaseToolbarButton active={active} onClick={handleClick}>
      {children}
    </BaseToolbarButton >
  )
}

export default ToolbarButton
