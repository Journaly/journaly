import useFormValidation from '../Hooks/useFormValidation'
import validateAuth from '../../lib/validateAuth'

const INITIAL_STATE = {
  email: '',
  password: '',
}

const SignupForm: React.FC = () => {
  const {
    handleChange,
    values,
    handleSubmit,
    handleBlur,
    errors,
    isSubmitting,
  } = useFormValidation(INITIAL_STATE, validateAuth)

  return (
    <div className="form-container">
      <h1>Sign up!</h1>
      <form onSubmit={handleSubmit}>
        {errors.email && <p>{errors.email}</p>}
        <input
          name="email"
          value={values.email}
          placeholder="Your email address"
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.email && 'input-error'}
        />
        {errors.password && <p>{errors.password}</p>}
        <input
          name="password"
          value={values.password}
          placeholder="A safe password"
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.password && 'input-error'}
        />
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default SignupForm
