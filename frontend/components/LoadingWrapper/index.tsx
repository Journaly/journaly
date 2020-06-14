import React from 'react'

import { useTranslation } from '../../config/i18n'

const LoadingWrapper = ({ loading, error, children }) => {
  const { t } = useTranslation()

  if (error) {
    return <p>{t('loading')}</p>
  } else if (loading) {
    return <p>{t('error')}</p>
  } else {
    return children
  }
}

LoadingWrapper.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default LoadingWrapper
