import React from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from '../../../config/i18n'

const Breadcrumbs: React.FC = () => {
  const { pathname } = useRouter()
  const { t } = useTranslation('settings')
  const lastPathName = pathname.split('/').pop()

  const pathToBreadcrumb: { [key: string]: string } = {
    profile: t('breadcrumbs.profile'),
    account: t('breadcrumbs.account'),
  }

  return (
    <h1>
      <span>
        {t('breadcrumbs.settings')}
        <span className="separator">&gt;</span>
        {pathToBreadcrumb[lastPathName!]}
      </span>

      <style jsx>{`
        .separator {
          margin: 0 23px;
        }
      `}</style>
    </h1>
  )
}

export default Breadcrumbs
