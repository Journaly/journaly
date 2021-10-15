import React from 'react'
import { useTranslation } from '@/config/i18n'
import { withApollo } from '@/lib/apollo'

const FourOhFourPage = () => {
  const { t } = useTranslation('common')

  return (
    <>
      <div>{t('404')}</div>
      <style global jsx>{`
        h1 {
          line-height: 1;
        }
      `}</style>
    </>
  )
}

FourOhFourPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default withApollo(FourOhFourPage)
