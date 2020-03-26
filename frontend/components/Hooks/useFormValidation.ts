import { useState, useEffect } from 'react'

function useFormValidation(initialState: object, validate: (object) => {}) {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0

      if (noErrors) {
        console.log('authenticated!', values)
        setIsSubmitting(false)
      } else {
        setIsSubmitting(false)
      }
    }
  }, [errors])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  function handleBlur(e: React.FormEvent<HTMLFormElement>) {
    const validationErrors = validate(values)
    setErrors(validationErrors)
    console.log('Blurrrr!')
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    setIsSubmitting(true)
  }

  return {
    handleChange,
    values,
    handleSubmit,
    handleBlur,
    errors,
    isSubmitting,
  }
}

export default useFormValidation
