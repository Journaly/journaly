import React from 'react'
import { ApolloError } from '@apollo/client'

import { useTranslation } from '../../config/i18n'
import LoadingSpinner from '../Icons/LoadingSpinner'

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
