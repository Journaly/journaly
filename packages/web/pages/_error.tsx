import React from 'react'
import { NextPage } from 'next'
import Error, { ErrorProps } from 'next/error'
import theme from '@/theme'

// TODO: Let's fix the translation of this page one day
const ErrorPage: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <div className="container">
      <Error statusCode={statusCode} title="Error" />
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
    title: `Error | ${statusCode}`,
    statusCode,
  }
}

export default ErrorPage
