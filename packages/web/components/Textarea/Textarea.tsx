import React, { memo, forwardRef } from 'react'

const onKeyPress = (e: React.KeyboardEvent) => {
  if (e.which === 13 && (e.ctrlKey)) {
    e.preventDefault()

    const nativeEvent = e.nativeEvent as any
    if (nativeEvent?.target?.form) {
      nativeEvent.target.form.dispatchEvent(new Event('submit'))
    }
  }
}


const Textarea = forwardRef<
  HTMLTextAreaElement,
  JSX.IntrinsicElements['textarea']
>((props, ref) => (
  <textarea {...props} onKeyPress={onKeyPress} ref={ref} />
))

export default memo(Textarea)
