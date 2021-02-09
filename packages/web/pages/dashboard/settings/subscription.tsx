import React from 'react'
import { NextPage } from 'next'
import { withApollo } from '@/lib/apollo'
import SettingsPageLayout from '@/components/Layouts/SettingsPageLayout'
import AuthGate from '@/components/AuthGate'

const Subscription: NextPage = () => {
  return (
    <AuthGate>
      <>
        <SettingsPageLayout>
          <div className="forms-container">
            <p>Let's make some monay!</p>
          </div>
        </SettingsPageLayout>
        <style jsx>{`
        `}</style>
      </>
    </AuthGate>
  )
}

Subscription.getInitialProps = async () => ({
  namespacesRequired: ['common', 'settings'],
})

export default withApollo(Subscription)
