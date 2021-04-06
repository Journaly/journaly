import React from 'react'
import { NextPage } from 'next'
import { withApollo } from '@/lib/apollo'
import SettingsPageLayout from '@/components/Layouts/SettingsPageLayout'
import AuthGate from '@/components/AuthGate'
import SubscriptionForm from '@/components/Dashboard/Settings/Subscription/SubscriptionForm'
import { useSubscriptionSettingsPageQuery } from '@/generated/graphql'
import theme from '@/theme'

const Subscription: NextPage = () => {
  const { loading, data } = useSubscriptionSettingsPageQuery()

  return (
    <AuthGate>
      <>
        <SettingsPageLayout>
          {data?.currentUser && !loading && (
            <div className="forms-container">
              <h1 >Journaly Premium</h1>
              <SubscriptionForm user={data.currentUser} />
            </div>
          )}
        </SettingsPageLayout>
        <style jsx>{`
          .forms-container {
            width: 100%;
            max-width: 1008px;
          }
          h1 {
            ${theme.typography.headingLG}
            text-align: center;
            margin-bottom: 20px;
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
