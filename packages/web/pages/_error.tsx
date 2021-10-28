import React from 'react'
import { NextPage } from 'next'
import Error, { ErrorProps } from 'next/error'
import { useTranslation } from '@/config/i18n'
import theme from '@/theme'

const ErrorPage: NextPage<ErrorProps> = ({ statusCode }) => {
  const { t } = useTranslation()

  return (
    <div className="container">
      <Error statusCode={statusCode} title={t('error')} />
      <style global jsx>{`
        .container {
          max-width: 900px;
          margin: 30vh auto;
          padding: 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: ${theme.colors.white};
          box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
        }

        h1 {
          text-align: center;
          font-weight: 700;
          font-size: 28px;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
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
