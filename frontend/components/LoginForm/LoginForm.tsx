import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm, ErrorMessage } from 'react-hook-form'
import { trackLogIn } from '../../events/users'
import { useLoginUserMutation, CurrentUserDocument } from '../../generated/graphql'
import FormError from '../FormError'
import Button from '../../elements/Button'
import { brandBlue } from '../../utils'
import theme from '../../theme'

const LoginForm: React.FC = () => {
  const router = useRouter()
  const { handleSubmit, register, errors } = useForm({
    mode: 'onBlur',
  })

  const fieldErrorName = Object.keys(errors)[0] || ''

  const [loginUser, { loading, error }] = useLoginUserMutation({
    onCompleted: () => {
      trackLogIn()
      router.push({
        pathname: '/dashboard/my-feed',
      })
    },
  })

  const onSubmit = (data: any) => {
    if (!loading && Object.keys(errors).length === 0) {
      loginUser({
        variables: {
          identifier: data.email,
          password: data.password,
        },
        refetchQueries: [{ query: CurrentUserDocument }],
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Log into your account</h2>
        {error && <FormError error={error} />}
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
          />
          <ErrorMessage errors={errors} name="password" as="p" />
        </label>

        <Button type="submit">Log In</Button>
      </fieldset>
      <em>
        Don't have an account?
        <Link href="/dashboard/signup">
          <a> Sign up</a>
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
        &[aria-busy='true']::before {
          background-size: 50% auto;
          animation: loading 0.5s linear infinite;
        }

        h2 {
          margin: 10px 0;
          ${theme.typography.headingLG}
          text-align: center;
        }

        :global(button) {
          border-radius: 5px;
          font-size: 16px;
          font-weight: 400;
          padding: 10px;
          margin-top: 5px;
          box-shadow: 0px 8px 10px #00000029;
        }

        :global(label > p) {
          color: ${theme.colors.red};
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

export default LoginForm
