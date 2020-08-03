import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm, ErrorMessage } from 'react-hook-form'
import { trackCreateAccount } from '../../events/users'
import { useCreateUserMutation, useCurrentUserQuery } from '../../generated/graphql'
import FormError from '../FormError'
import Button from '../../elements/Button'
import { brandBlue } from '../../utils'
import theme from '../../theme'

const SignupForm: React.FC = () => {
  const router = useRouter()
  const { handleSubmit, register, errors } = useForm({
    mode: 'onBlur',
  })

  const fieldErrorName = Object.keys(errors)[0] || ''

  const { refetch } = useCurrentUserQuery()

  const [createUser, { loading, error }] = useCreateUserMutation({
    onCompleted: async () => {
      trackCreateAccount()
      await refetch()
      router.push({
        pathname: '/dashboard/my-feed',
      })
    },
  })

  const onSubmit = (data: any) => {
    if (!loading && Object.keys(errors).length === 0) {
      createUser({
        variables: {
          handle: data.handle,
          email: data.email,
          password: data.password,
        },
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign up for an account</h2>
        {error && <FormError error={error} />}
        <label htmlFor="handle">
          Display Name
          <input
            type="text"
            name="handle"
            placeholder="Your name, or perhaps a fun pseudonym!"
            autoComplete="on"
            ref={register({
              required: 'Display Name is required',
              minLength: { value: 3, message: 'Your display name must be at least 3 characters' },
            })}
            data-test="display-name"
          />
          <ErrorMessage errors={errors} name="handle" as="p" />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="text"
            placeholder="Email address"
            name="email"
            ref={register({
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            data-test="email"
          />
          <ErrorMessage errors={errors} name="email" as="p" />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            placeholder="A secure password"
            name="password"
            ref={register({
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
            data-test="password"
          />
          <ErrorMessage errors={errors} name="password" as="p" />
        </label>

        <Button type="submit">Sign up!</Button>
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
        :global(.form-error) {
          margin: 12px 0;
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
          background-image: linear-gradient(to right, #32567e 0%, #4391c9 50%, #32567e 100%);
        }
        @keyframes loading {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 100% 100%;
          }
        }
        fieldset[aria-busy='true']::before {
          background-size: 50% auto;
          animation: loading 0.5s linear infinite;
        }

        h2 {
          margin: 10px 0;
          ${theme.typography.headingLG}
          text-align: center;
        }

        :global(label > p) {
          color: ${theme.colors.red};
          font-style: italic;
        }

        :global(button) {
          border-radius: 5px;
          font-size: 16px;
          font-weight: 400;
          padding: 10px;
          margin-top: 5px;
          box-shadow: 0px 8px 10px #00000029;
        }

        :global(.form-error) {
          margin-bottom: 24px;
        }
        :global(input[name="${fieldErrorName}"]) {
          border-color: ${theme.colors.red};
        }
      `}</style>
    </form>
  )
}

export default SignupForm
