import React, { useCallback } from 'react'
import { useSlate, useFocused } from 'slate-react'

import BaseToolbarButton from './BaseToolbarButton'
import { MarkType, toggleMark, isMarkActive } from '../helpers'

type ButtonProps = {
  type: MarkType
  children: React.ReactNode
}

const ToggleMarkButton = ({ type, children }: ButtonProps) => {
  const editor = useSlate()
  const isEditorFocused = useFocused()
  const active = isEditorFocused && isMarkActive(editor, type)

  const handleClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault()
    toggleMark(editor, type)
  }, [editor, type])

  return (
    <BaseToolbarButton active={active} onClick={handleClick}>
      {children}
    </BaseToolbarButton>
  )
}

export default ToggleMarkButton
