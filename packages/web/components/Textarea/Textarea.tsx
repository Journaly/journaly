import React from 'react'

const onKeyPress = (e: KeyboardEvent) => {
  if (e.which === 13 && (e.ctrlKey)) {
    e.preventDefault()

    if (e.nativeEvent?.target?.form) {
      e.nativeEvent.target.form.dispatchEvent(new Event('submit'))
    }
  }
}

const Textarea = (props) => <textarea {...props} onKeyPress={onKeyPress} />

export default Textarea
