import { useState } from 'react'

function useFormValidation(initialState: object) {
  const [values, setValues] = useState(initialState)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  return {
    handleChange,
    values,
  }
}

export default useFormValidation
