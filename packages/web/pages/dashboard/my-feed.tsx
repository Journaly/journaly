import React from 'react'
import { NextPage } from 'next'
import { withApollo } from '@/lib/apollo'
import DashboardLayout from '@/components/Layouts/DashboardLayout'
import MyFeed from '@/components/Dashboard/MyFeed'
import AuthGate from '@/components/AuthGate'
import WelcomeModal from '@/components/Modals/WelcomeModal'

interface InitialProps {
  namespacesRequired: string[]
}

const MyFeedPage: NextPage<InitialProps> = () => {
  return (
    <AuthGate>
      {(currentUser) => (
        <DashboardLayout>
          <MyFeed currentUser={currentUser} />
          <WelcomeModal />
        </DashboardLayout>
      )}
    </AuthGate>
  )
}

MyFeedPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'post', 'settings', 'my-feed'],
})

export default withApollo(MyFeedPage)
