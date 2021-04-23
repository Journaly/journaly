import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm, ErrorMessage } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useTranslation } from 'next-i18next'
import { useRequestResetPasswordMutation } from '@/generated/graphql'
import FormError from '@/components/FormError'
import Button from '@/components/Button'
import { brandBlue } from '@/utils'
import theme from '@/theme'

const RequestResetPasswordForm: React.FC = () => {
  const { t } = useTranslation('authentication')

  const router = useRouter()
  const { handleSubmit, register, errors } = useForm({
    mode: 'onBlur',
  })

  const fieldErrorName = Object.keys(errors)[0] || ''

  const [requestReset, { loading, error }] = useRequestResetPasswordMutation({
    onCompleted: async () => {
      toast.success(t('requestReset.successMessage'))
      router.push({
        pathname: '/dashboard/login',
      })
    },
  })

  const onSubmit = (data: any) => {
    if (!loading && Object.keys(errors).length === 0) {
      requestReset({
        variables: {
          identifier: data.email,
        },
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>{t('requestReset.title')}</h2>
        <p className="helper-text">{t('requestReset.helperText')}</p>
        {error && <FormError error={error} />}
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
        <Button type="submit">{t('requestReset.submitButtonText')}</Button>
      </fieldset>
      <em>
        {t('requestReset.goToLoginText')}
        <Link href="/dashboard/login">
          <a className="j-link"> {t('requestReset.goToLoginLink')}</a>
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

        .helper-text {
          font-size: 14px;
          text-align: center;
          font-style: italic;
          margin-bottom: 5px;
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
          font-style: italic;
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

export default RequestResetPasswordForm
