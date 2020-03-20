import { useState } from 'react'

const useFormValidation = (initialState: object) => {
  const [values, setValues] = useState(initialState)

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
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
