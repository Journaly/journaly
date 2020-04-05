import React, { useState } from 'react'
import Link from 'next/link'

import * as gtag from '../../lib/gtag'
import validateAuth, { IErrors } from '../../lib/validateAuth'
import { useCreateUserMutation } from '../../generated/graphql'
import useFormValidation from '../Hooks/useFormValidation'

import Error from '../Error'
import { brandBlue } from '../../utils'

interface IFormValues {
  name: string
  email: string
  password: string
}

export interface IAnalyticsEvent {
  action: string
  category: string
  label: string
}

const initialState: IFormValues = {
  name: '',
  email: '',
  password: '',
}

const SignupForm: React.FC = () => {
  const {
    handleChange,
    values,
    handleValidate,
    handleBlur,
    errors,
    setValues,
  } = useFormValidation<IFormValues, IErrors>(initialState, validateAuth)

  const [createUser, { loading, error }] = useCreateUserMutation({
    onCompleted: () => {
      setValues(initialState)
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleValidate(e)
    if (!loading && Object.keys(errors).length === 0) {
      createUser({
        variables: {
          Name: values.name,
          Email: values.email,
          Password: values.password,
        },
      })

      gtag.event({
        action: 'submit_form',
        category: 'Sign up',
        label: values.email,
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
          <p>{errors?.name}</p>
          <input
            type="text"
            name="name"
            value={values.name}
            placeholder="Your name"
            autoComplete="on"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </label>
        <label htmlFor="email">
          Email
          <p>{errors?.email}</p>
          <input
            type="text"
            name="email"
            value={values.email}
            placeholder="Your email address"
            autoComplete="on"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </label>
        <label htmlFor="password">
          Password
          <p>{errors?.password}</p>
          <input
            type="password"
            name="password"
            value={values.password}
            placeholder="A secure password"
            autoComplete="off"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </label>
        <button type="submit">Sign up!</button>
      </fieldset>
      <em>
        Already have an account?
        <Link href="/dashboard/login">
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
          background-color: ${brandBlue};
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
