import React from 'react'
import { ApolloError } from '@apollo/client'

import { useTranslation } from '@/config/i18n'
import LoadingSpinner from '@/components/Icons/LoadingSpinner'
import theme from '@/theme'

type Props = {
  children: React.ReactNode
  loading: boolean
  error?: ApolloError
}

/**
 * Prevents rendering until loading and error are falsey.
 */

const LoadingWrapper: React.FC<Props> = ({ loading, error, children }) => {
  const { t } = useTranslation('common')

  if (error) {
    return (
      <div className="container">
        <h1>{t('error')}</h1>
        <p>{error.message}</p>
        <style jsx>{`
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
            font-size: 24px;
            margin: 20px 0;
          }

          p {
            margin-bottom: 35px;
          }
        `}</style>
      </div>
    )
  } else if (loading) {
    return <LoadingSpinner size={60} />
  } else {
    return <>{children}</>
  }
}

export default LoadingWrapper
