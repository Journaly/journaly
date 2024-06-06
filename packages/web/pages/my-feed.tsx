import React from 'react'
import { NextPage } from 'next'
import cookie from 'cookie'
import { Request } from 'express'
import { withApollo } from '@/lib/apollo'
import DashboardLayout from '@/components/Layouts/DashboardLayout'
import MyFeed from '@/components/Dashboard/MyFeed'
import AuthGate from '@/components/AuthGate'
import WelcomeModal from '@/components/Modals/WelcomeModal'
import { InitialSearchFilters } from '@/components/Dashboard/MyFeed'
import { journalyMiddleware } from '@/lib/journalyMiddleware'
import { PostsDocument } from '@/generated/graphql'

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
  let initialSearchFilters = null
  if (typeof window !== 'undefined') {
    try {
      const defaultSearchFilters = cookie.parse(document.cookie).default_search_filters
      initialSearchFilters = defaultSearchFilters
        ? (JSON.parse(defaultSearchFilters) as InitialSearchFilters)
        : null
    } catch (e) {
      console.log('Error parsing default_search_filters cookie', e)
    }
  } else {
    try {
      const request = ctx.req as Request
      const defaultSearchFilters = request.cookies.default_search_filters
      initialSearchFilters = defaultSearchFilters
        ? (JSON.parse(defaultSearchFilters) as InitialSearchFilters)
        : null
    } catch (e) {
      console.log('Error parsing default_search_filters cookie', e)
    }
  }
  const props = await journalyMiddleware(ctx, async (apolloClient) => {
    await apolloClient.query({
      query: PostsDocument,
      variables: {
        ...initialSearchFilters,
      },
    })
  })
  return {
    ...props,
    initialSearchFilters,
    namespacesRequired: ['common', 'settings', 'my-feed'],
  }
}

export default MyFeedPage
