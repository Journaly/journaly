import React, { useState } from 'react'
import { NextPage } from 'next'
import { withApollo } from '../../lib/apollo'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import MyFeed from '../../components/Dashboard/MyFeed'
import { useFeedQuery, Post } from '../../generated/graphql'
import LoadingWrapper from '../../components/LoadingWrapper'
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
  const { loading, error, data } = useFeedQuery({
    variables: {
      published: true,
    },
  })

  const handleWelcomeModalClose = () => {
    setShouldShowWelcomeModal(false)
    localStorage.setItem(welcomeModalKey, 'seen')
  }

  const posts = data?.feed

  return (
    <AuthGate>
      {(currentUser) => (
        <DashboardLayout>
          <LoadingWrapper loading={loading} error={error}>
            <MyFeed posts={posts as Post[]} currentUser={currentUser} />
          </LoadingWrapper>

          <WelcomeModal show={shouldShowWelcomeModal} onClose={handleWelcomeModalClose} />
        </DashboardLayout>
      )}
    </AuthGate>
  )
}

MyFeedPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default withApollo(MyFeedPage)
