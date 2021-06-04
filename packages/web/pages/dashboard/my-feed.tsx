import React from 'react'
import { NextPage } from 'next'
import cookie from 'cookie'
import { withApollo } from '@/lib/apollo'
import DashboardLayout from '@/components/Layouts/DashboardLayout'
import MyFeed from '@/components/Dashboard/MyFeed'
import AuthGate from '@/components/AuthGate'
import WelcomeModal from '@/components/Modals/WelcomeModal'
import { InitialSearchFilters } from '@/components/Dashboard/MyFeed/MyFeed'
import { Request } from 'express'

interface InitialProps {
  namespacesRequired: string[]
  initialSearchFilters: InitialSearchFilters | null
}

const MyFeedPage: NextPage<InitialProps> = ({ initialSearchFilters }) => {
  return (
    <AuthGate>
      {(currentUser) => (
        <DashboardLayout>
          <MyFeed currentUser={currentUser} initialSearchFilters={initialSearchFilters} />
          <WelcomeModal />
        </DashboardLayout>
      )}
    </AuthGate>
  )
}

MyFeedPage.getInitialProps = async (ctx) => {
  let initialSearchFilters
  if (typeof window !== 'undefined') {
    const defaultSearchFilters = JSON.parse(cookie.parse(document.cookie).default_search_filters)
    initialSearchFilters = defaultSearchFilters ? defaultSearchFilters as InitialSearchFilters : null
  } else {
    // TODO: double check this choice
    const request = ctx.req as Request
    const defaultSearchFilters = JSON.parse(request.cookies.default_search_filters)
    initialSearchFilters = defaultSearchFilters ? defaultSearchFilters as InitialSearchFilters : null
  }
  return {
    namespacesRequired: ['common', 'settings', 'my-feed'],
    initialSearchFilters,
  }
}


export default withApollo(MyFeedPage)
