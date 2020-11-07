import React from 'react'
import { NextPage } from 'next'
import { withApollo } from '../../../lib/apollo'
import SettingsPageLayout from '../../../components/Layouts/SettingsPageLayout'
import AuthGate from '../../../components/AuthGate'
import UpdatePasswordForm from '../../../components/Dashboard/Settings/UpdatePasswordForm'

const Account: NextPage = () => {
  return (
    <AuthGate>
      <SettingsPageLayout>
        <div className="forms-container">
          <UpdatePasswordForm />
        </div>
      </SettingsPageLayout>
      <style jsx>{`
        .forms-container {
          width: 100%;
        }
      `}</style>
    </AuthGate>
  )
}

Account.getInitialProps = async () => ({
  namespacesRequired: ['common', 'settings'],
})

export default withApollo(Account)
