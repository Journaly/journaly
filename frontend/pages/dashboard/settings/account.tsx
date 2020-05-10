import React from 'react'
import { NextPage } from 'next'
import { withApollo } from '../../../lib/apollo'
import SettingsPageLayout from '../../../components/Layouts/SettingsPageLayout'

const Account: NextPage = () => {
  return (
    <SettingsPageLayout>
      <style jsx>{``}</style>
    </SettingsPageLayout>
  )
}

Account.getInitialProps = async () => ({
  namespacesRequired: ['settings'],
})

export default withApollo(Account)
