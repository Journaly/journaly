import React from 'react'
import { NextPage } from 'next'
import Error from 'next/error'
import { useTranslation } from '../config/i18n'

interface Props {
  statusCode: number
}

const ErrorPage: NextPage<Props> = ({ statusCode }) => {
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
  let statusCode = null

  if (res) statusCode = res.statusCode
  else if (err) statusCode = err.statusCode

  return {
    namespacesRequired: ['common'],
    statusCode,
  }
}

export default ErrorPage
