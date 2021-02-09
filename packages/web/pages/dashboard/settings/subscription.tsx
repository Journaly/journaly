import React from 'react'
import { NextPage } from 'next'
import { withApollo } from '@/lib/apollo'
import SettingsPageLayout from '@/components/Layouts/SettingsPageLayout'
import AuthGate from '@/components/AuthGate'
import SubscriptionForm from '@/components/Dashboard/Settings/SubscriptionForm'

const Subscription: NextPage = () => {
  return (
    <AuthGate>
      <>
        <SettingsPageLayout>
          <div className="forms-container">
            <SubscriptionForm />
          </div>
        </SettingsPageLayout>
        <style jsx>{`
          .forms-container {
            width: 100%;
            max-width: 1008px;
          }
        `}</style>
      </>
    </AuthGate>
  )
}

Subscription.getInitialProps = async () => ({
  namespacesRequired: ['common', 'settings'],
})

export default withApollo(Subscription)
