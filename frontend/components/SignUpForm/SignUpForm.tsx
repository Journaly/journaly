import { useState } from 'react'
import Link from 'next/link'

import Error from '../Error'

import { useCreateUserMutation } from '../../generated/graphql'
import { brandBlue } from '../../utils'

interface FormValues {
  name: string
  email: string
  password: string
}

const initialState: FormValues = {
  name: '',
  email: '',
  password: '',
}

const SignupForm: React.FC = () => {
  const [values, setValues] = useState(initialState)
  const [createUser, { loading, error }] = useCreateUserMutation({
    onCompleted: () => {
      setValues(initialState)
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!loading) {
      createUser({
        variables: {
          Name: values.name,
          Email: values.email,
          Password: values.password,
        },
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign up for an account</h2>
        <Error error={error} />
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            value={values.name}
            placeholder="Your name"
            autoComplete="on"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="text"
            name="email"
            value={values.email}
            placeholder="Your email address"
            autoComplete="on"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            value={values.password}
            placeholder="A secure password"
            autoComplete="off"
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign up!</button>
      </fieldset>
      <em>
        Already have an account?
        <Link href="/login">
          <a> Log in</a>
        </Link>
      </em>
      <style jsx>{`
        form {
          box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
          background: white;
          border: 5px solid white;
          margin: 25vh auto;
          padding: 20px;
          max-width: 500px;
          font-size: 16px;
          line-height: 1.6;
        }
        label {
          display: block;
          margin-bottom: 10px;
        }
        input,
        textarea,
        select {
          width: 100%;
          padding: 5px;
          font-size: 1rem;
          border: 1px solid black;
        }
        input,
        textarea,
        select:focus {
          outline: 0;
          border-color: ${brandBlue};
        }
        button,
        input[type='submit'] {
          width: auto;
          background: ${brandBlue};
          color: white;
          border: 0;
          font-size: 2rem;
          font-weight: 600;
          padding: 5px 12px;
        }
        fieldset {
          border: 0;
          padding: 0;
          margin-bottom: 10px;
        }
        fieldset[disabled] {
          opacity: 0.5;
        }
        fieldset::before {
          height: 10px;
          content: '';
          display: block;
          background-image: linear-gradient(
            to right,
            #32567e 0%,
            #4391c9 50%,
            #32567e 100%
          );
        }
        @keyframes loading {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 100% 100%;
          }
        }
        &[aria-busy='true']::before {
          background-size: 50% auto;
          animation: loading 0.5s linear infinite;
        }

        h2 {
          margin-bottom: 10px;
        }

        button {
          background-color: ${props => props.color};
          border-radius: 5px;
          color: white;
          font-size: 16px;
          font-weight: 400;
          padding: 10px;
          margin-top: 5px;
          box-shadow: 0px 8px 10px #00000029;
          text-transform: uppercase;
        }
        button[disabled] {
          opacity: 0.5;
        }
      `}</style>
    </form>
  )
}

export default SignupForm
