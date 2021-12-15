export interface IValues {
  handle?: string
  email?: string
  password?: string
}

export interface IErrors extends IValues {}

export default function validateAuth(values: IValues): IErrors {
  let errors: IErrors = {}

  // Email validation errors
  if (!values.email) {
    errors.email = 'Email is required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  // Password validation errors
  if (!values.password) {
    errors.password = 'Password is required.'
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  // Password validation errors
  if (!values.handle) {
    errors.handle = 'Name is required.'
  }
  return errors
}
