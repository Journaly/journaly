import React from 'react'
import { ApolloError } from '@apollo/client'

import { useTranslation } from '../../config/i18n'

const errorCodeToStrNameMap = {
  404: 'e404',
  403: 'e403',
}

type LoadingWrapperProps = {
  loading: boolean
  error: ApolloError | undefined
  render: () => React.ReactElement | null
}

const LoadingWrapper = ({ loading, error, render }: LoadingWrapperProps) => {
  const { t } = useTranslation()

  if (error) {
    const appError = error.networkError?.result?.errors?.find((e) => e.extensions.statusCode)
    const { statusCode } = appError.extensions

    if (statusCode in errorCodeToStrNameMap) {
      return (
        <>
          <div className="container">
            <h1>{statusCode}</h1>
            <h2>{t(errorCodeToStrNameMap[statusCode])}</h2>
          </div>

          <style jsx>{`
            .container {
              height: 100%;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .container h2 {
              margin-left: 1em;
              padding-left: 1em;
              border-left: 1px solid black;
            }
          `}</style>
        </>
      )
    } else {
      return <p>{t('error')}</p>
    }
  } else if (loading) {
    return <p>{t('loading')}</p>
  } else {
    return render()
  }
}

export default LoadingWrapper
