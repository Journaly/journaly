import React, { useCallback } from 'react'
import { useSlate } from 'slate-react'

import { useTranslation } from 'next-i18next'

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
  const active = isTypeActive({ type, format, editor })

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
