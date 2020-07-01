import React from 'react'
import { ApolloError } from '@apollo/client'

import { useTranslation } from '../../config/i18n'

type LoadingWrapperProps = {
  loading: boolean
  error: ApolloError | undefined
  render: () => React.ReactElement | null
}

/**
 * Prevents rendering until loading and error are falsey.
 */

const LoadingWrapper = ({ loading, error, render }: LoadingWrapperProps) => {
  const { t } = useTranslation()

  if (error) {
    return <p>{t('error')}</p>
  } else if (loading) {
    return <p>{t('loading')}</p>
  } else {
    return render()
  }
}

LoadingWrapper.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default LoadingWrapper
