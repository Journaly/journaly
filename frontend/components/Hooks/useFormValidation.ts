import { useState } from 'react'

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>
type InputBlurEvent = React.FocusEvent<HTMLInputElement>
type FormEvent = React.FormEvent<HTMLFormElement>

type FormEventHandler = (e: FormEvent) => void
type InputEventHandler = (e: InputChangeEvent) => void
type InputFocusEventHandler = (e: InputBlurEvent) => void

interface FormValidationValues<T, U> {
  handleChange: InputEventHandler
  values: T
  handleValidate: FormEventHandler
  handleBlur: InputFocusEventHandler
  errors: Partial<U>
  setValues: (values: T) => void
}

function useFormValidation<T, U>(
  initialState: T,
  validate: (Values: T) => U,
): FormValidationValues<T, U> {
  const [values, setValues] = useState<T>(initialState)
  const [errors, setErrors] = useState<Partial<U>>({})

  function handleChange(e: InputChangeEvent) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  function handleBlur(e: InputBlurEvent) {
    const validationErrors = validate(values)
    setErrors(validationErrors)
    // here temporarily so we can use `e`
    // TODO (robin-macpherson) finsih handling blur
    console.log(e)
  }

  const handleValidate = (e: FormEvent) => {
    e.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
  }

  return {
    handleChange,
    values,
    handleValidate,
    handleBlur,
    errors,
    setValues,
  }
}

export default useFormValidation
