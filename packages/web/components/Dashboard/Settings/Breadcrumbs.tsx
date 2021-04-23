import React from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import theme from '@/theme'

const Breadcrumbs: React.FC = () => {
  const { pathname } = useRouter()
  const { t } = useTranslation('settings')
  const lastPathName = pathname.split('/').pop()

  const pathToBreadcrumb: { [key: string]: string } = {
    profile: t('breadcrumbs.profile'),
    account: t('breadcrumbs.account'),
  }

  return (
    <h1 className="breadcrumbs">
      <span>
        {t('breadcrumbs.settings')}
        <span className="separator">&gt;</span>
        {pathToBreadcrumb[lastPathName!]}
      </span>

      <style jsx>{`
        .breadcrumbs {
          ${theme.typography.headingXL};
        }
        .separator {
          margin: 0 16px;
        }
      `}</style>
    </h1>
  )
}

export default Breadcrumbs
