import React from 'react'
import { NextPage } from 'next'
import SettingsPageLayout from '@/components/Layouts/SettingsPageLayout'
import AuthGate from '@/components/AuthGate'
import SubscriptionForm from '@/components/Dashboard/Settings/Subscription/SubscriptionForm'
import {
  CurrentUserDocument,
  SubscriptionSettingsPageDocument,
  useSubscriptionSettingsPageQuery,
} from '@/generated/graphql'
import theme from '@/theme'
import { journalyMiddleware } from '@/lib/journalyMiddleware'

const Subscription: NextPage = () => {
  const { loading, data, refetch: refetchUser } = useSubscriptionSettingsPageQuery()

  return (
    <AuthGate>
      <>
        <SettingsPageLayout>
          {data?.currentUser && !loading && (
            <div className="forms-container">
              <SubscriptionForm user={data.currentUser} onSuccess={refetchUser} />
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

Subscription.getInitialProps = async (ctx) => {
  const props = await journalyMiddleware(ctx, async (apolloClient) => {
    await apolloClient.query({
      query: SubscriptionSettingsPageDocument,
    })

    await apolloClient.query({
      query: CurrentUserDocument,
    })
  })

  return {
    ...props,
    namespacesRequired: ['common', 'settings', 'marketing'],
  }
}

export default Subscription
