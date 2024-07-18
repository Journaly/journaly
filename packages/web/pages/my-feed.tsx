import React from 'react'
import { NextPage } from 'next'
import cookie from 'cookie'
import { Request } from 'express'
import DashboardLayout from '@/components/Layouts/DashboardLayout'
import MyFeed from '@/components/Dashboard/MyFeed'
import AuthGate from '@/components/AuthGate'
import WelcomeModal from '@/components/Modals/WelcomeModal'
import { InitialSearchFilters } from '@/components/Dashboard/MyFeed'
import { journalyMiddleware } from '@/lib/journalyMiddleware'
import {
  CurrentUserDocument,
  LanguagesDocument,
  PostsDocument,
  TopicsDocument,
} from '@/generated/graphql'
import { constructPostQueryVars } from '@/components/Dashboard/MyFeed/MyFeed'
import { getUiLanguage } from '@/utils/getUiLanguage'

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
  let initialSearchFilters: InitialSearchFilters | null = null
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
    await Promise.all([
      apolloClient.query({
        query: CurrentUserDocument,
      }),
      apolloClient.query({
        query: PostsDocument,
        variables: constructPostQueryVars(
          initialSearchFilters,
          ctx.query.page ? Math.max(1, parseInt(ctx.query.page as string, 10)) : 1,
        ),
      }),
      apolloClient.query({
        query: TopicsDocument,
        variables: {
          uiLanguage: getUiLanguage(ctx),
          languages: initialSearchFilters?.languages || [],
          hasPosts: true,
          authoredOnly: false,
        },
      }),
      apolloClient.query({
        query: LanguagesDocument,
        variables: {
          hasPosts: true,
          authoredOnly: false,
        },
      }),
    ])
  })

  return {
    ...props,
    initialSearchFilters,
    namespacesRequired: ['common', 'settings', 'my-feed', 'post'],
  }
}

export default MyFeedPage
