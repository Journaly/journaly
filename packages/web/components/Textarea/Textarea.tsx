import React from 'react'

const onKeyPress = (e: React.KeyboardEvent) => {
  if (e.which === 13 && (e.ctrlKey)) {
    e.preventDefault()

    const nativeEvent = e.nativeEvent as any
    if (nativeEvent?.target?.form) {
      nativeEvent.target.form.dispatchEvent(new Event('submit'))
    }
  }
}


const Textarea = (props: JSX.IntrinsicElements['textarea']) => (
  <textarea {...props} onKeyPress={onKeyPress} />
)

export default Textarea
