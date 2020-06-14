import React from 'react'

import { useTranslation } from '../../config/i18n'

const LoadingWrapper = ({ loading, error, render }) => {
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
