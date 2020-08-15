import React, { useState } from 'react'
import { NextPage } from 'next'
import { withApollo } from '../../lib/apollo'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import MyFeed from '../../components/Dashboard/MyFeed'
import AuthGate from '../../components/AuthGate'
import WelcomeModal from '../../components/Modals/WelcomeModal'

interface InitialProps {
  namespacesRequired: string[]
}

const welcomeModalKey = 'welcome-modal-july-2020'

const MyFeedPage: NextPage<InitialProps> = () => {
  const hasSeenModalBefore =
    typeof window !== 'undefined' ? localStorage.getItem(welcomeModalKey) : false
  const [shouldShowWelcomeModal, setShouldShowWelcomeModal] = useState(!hasSeenModalBefore)

  const handleWelcomeModalClose = () => {
    setShouldShowWelcomeModal(false)
    localStorage.setItem(welcomeModalKey, 'seen')
  }

  return (
    <AuthGate>
      <DashboardLayout>
        <MyFeed />
        <WelcomeModal show={shouldShowWelcomeModal} onClose={handleWelcomeModalClose} />
      </DashboardLayout>
    </AuthGate>
  )
}

MyFeedPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'settings'],
})

export default withApollo(MyFeedPage)
