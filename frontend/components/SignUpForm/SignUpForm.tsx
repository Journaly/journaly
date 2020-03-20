import { useState } from 'react'
import useFormValidation from '../Hooks/useFormValidation'

const INITIAL_STATE = {
  email: '' as string,
  password: '' as string,
}

const SignupForm = () => {
  const { handleChange, values: object } = useFormValidation(INITIAL_STATE)

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('authenticated!', values)
  }

  return (
    <div className="form-container">
      <h1>Sign up!</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          // value={values.email}
          placeholder="Your email address"
          onChange={handleChange}
        />
        <input
          name="password"
          // value={values.password}
          placeholder="A safe password"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
