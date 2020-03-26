import useFormValidation from '../Hooks/useFormValidation'

const INITIAL_STATE = {
  email: '',
  password: '',
}

const SignupForm: React.FC = () => {
  const { handleChange, values } = useFormValidation(INITIAL_STATE)

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
          value={values.email}
          placeholder="Your email address"
          onChange={handleChange}
        />
        <input
          name="password"
          value={values.password}
          placeholder="A safe password"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SignupForm
