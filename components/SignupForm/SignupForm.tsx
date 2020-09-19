import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm, ErrorMessage } from 'react-hook-form'

import { useTranslation } from '../../config/i18n'
import { useCreateUserMutation, useCurrentUserQuery } from '../../generated/graphql'
import FormError from '../FormError'
import Button from '../../elements/Button'
import { brandBlue } from '../../utils'
import theme from '../../theme'

const SignupForm: React.FC = () => {
  const { t } = useTranslation('authentication')

  const router = useRouter()
  const { handleSubmit, register, errors } = useForm({
    mode: 'onBlur',
  })

  const fieldErrorName = Object.keys(errors)[0] || ''

  const { refetch } = useCurrentUserQuery()

  const [createUser, { loading, error }] = useCreateUserMutation({
    onCompleted: async () => {
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
        <h2>{t('signup.title')}</h2>
        {error && <FormError error={error} />}
        <label htmlFor="handle">
          {t('handleInputLabel')}
          <br />
          <span className="handle-helper-text">{t('handleInputHelperMessage')}</span>
          <input
            type="text"
            name="handle"
            placeholder={t('handleInputPlaceholder')}
            autoComplete="on"
            ref={register({
              required: `${t('handleRequiredErrorMessage')}`,
              pattern: {
                value: /^[a-zA-Z0-9_-]{1,}$/i,
                message: `${t('handleValidationErrorMessage')}`,
              },
              minLength: { value: 3, message: `${t('handleMinimumErrorMessage')}` },
            })}
            data-test="display-name"
          />
          <ErrorMessage errors={errors} name="handle" as="p" />
        </label>
        <label htmlFor="email">
          {t('emailInputLabel')}
          <input
            type="text"
            placeholder={t('emailInputPlaceholder')}
            name="email"
            ref={register({
              required: `${t('emailRequiredErrorMessage')}`,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: `${t('emailValidationErrorMessage')}`,
              },
            })}
            data-test="email"
          />
          <ErrorMessage errors={errors} name="email" as="p" />
        </label>
        <label htmlFor="password">
          {t('passwordInputLabel')}
          <input
            type="password"
            placeholder={t('passwordInputPlaceholder')}
            name="password"
            ref={register({
              required: `${t('passwordRequiredErrorMessage')}`,
              minLength: { value: 6, message: `${t('passwordMinimumErrorMessage')}` },
            })}
            data-test="password"
          />
          <ErrorMessage errors={errors} name="password" as="p" />
        </label>

        <Button type="submit">{t('signup.submitButtonText')}</Button>
      </fieldset>
      <em>
        {t('signup.goToLoginText')}
        <Link href="/dashboard/login">
          <a className="j-link"> {t('signup.goToLoginLink')}</a>
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

        .handle-helper-text {
          font-size: 14px;
          font-style: italic;
        }
      `}</style>
    </form>
  )
}

export default SignupForm
