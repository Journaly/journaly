import React from 'react'
import { NextPage } from 'next'
import { useTranslation } from '../config/i18n'

interface Props {
  statusCode: number
}

const Error: NextPage<Props> = ({ statusCode }) => {
  const { t } = useTranslation()

  return (
    <p>
      {statusCode
        ? t('errorWithStatus', { statusCode })
        : t('errorWithoutStatus')}
    </p>
  )
}

Error.getInitialProps = async ({ res, err }) => {
  let statusCode = null

  if (res) statusCode = res.statusCode
  else if (err) statusCode = err.statusCode

  return {
    namespacesRequired: ['common'],
    statusCode,
  }
}

export default Error
