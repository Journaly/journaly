import React from 'react'
import { ApolloError } from '@apollo/client'

import { useTranslation } from 'next-i18next'
import LoadingSpinner from '@/components/Icons/LoadingSpinner'

type Props = {
  loading: boolean
  error?: ApolloError
}

/**
 * Prevents rendering until loading and error are falsey.
 */

const LoadingWrapper: React.FC<Props> = ({ loading, error, children }) => {
  const { t } = useTranslation('common')

  if (error) {
    return <p>{t('error')}</p>
  } else if (loading) {
    return <LoadingSpinner size={60} />
  } else {
    return <>{children}</>
  }
}

export default LoadingWrapper
