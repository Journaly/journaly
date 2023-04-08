import React from 'react'
import { NextPage } from 'next'
import { withApollo } from '@/lib/apollo'
import SettingsPageLayout from '@/components/Layouts/SettingsPageLayout'
import AuthGate from '@/components/AuthGate'
import UpdatePasswordForm from '@/components/Dashboard/Settings/UpdatePasswordForm'
import NotificationSettingsForm from '@/components/Dashboard/Settings/NotificationSettingsForm'

const Account: NextPage = () => {
  return (
    <AuthGate>
      {(currentUser) => {
        return (
          <SettingsPageLayout>
          <div className="forms-container">
            <UpdatePasswordForm />
            <NotificationSettingsForm userConfiguration={currentUser.configuration} />
          </div>
          <style jsx>{`
            .forms-container {
              width: 100%;
              max-width: 1008px;
            }

            .forms-container :global(form) {
              margin-bottom: 40px;
            }

            .forms-container :global(form):last-child {
              margin-bottom: 0;
            }
          `}</style>
        </SettingsPageLayout>
        )
      }}
    </AuthGate>
  )
}

Account.getInitialProps = async () => ({
  namespacesRequired: ['common', 'settings'],
})

export default withApollo(Account)
