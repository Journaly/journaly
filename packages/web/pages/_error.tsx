import React from 'react'
import { NextPage } from 'next'
import Error, { ErrorProps } from 'next/error'
import { useTranslation } from '@/config/i18n'

const ErrorPage: NextPage<ErrorProps> = ({ statusCode }) => {
  const { t } = useTranslation()

  return (
    <>
      <Error statusCode={statusCode} title={t('error')} />
      <style global jsx>{`
        h1 {
          line-height: 1;
        }
      `}</style>
    </>
  )
}

ErrorPage.getInitialProps = async ({ res, err }) => {
  let statusCode = 404

  if (res) statusCode = res.statusCode
  if (err && err.statusCode) statusCode = err.statusCode

  return {
    namespacesRequired: ['common'],
    title: `Error | ${statusCode}`,
    statusCode,
  }
}

export default ErrorPage
