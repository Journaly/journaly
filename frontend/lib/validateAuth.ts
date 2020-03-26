interface Values {
  email?: string
  password?: string
}

interface Errors extends Values {}

export default function validateAuth(values: Values): Errors {
  let errors: Errors = {}

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
  return errors
}
