import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { withApollo } from '@/lib/apollo'
import LoadingWrapper from '@/components/LoadingWrapper'
import DashboardLayout from '@/components/Layouts/DashboardLayout'
import { ProfilePageDocument, UiLanguage, useProfilePageQuery } from '@/generated/graphql'
import useUILanguage from '@/hooks/useUILanguage'
import Profile from '@/components/Dashboard/Profile'
import { journalyMiddleware } from '@/lib/journalyMiddleware'

interface InitialProps {
  namespacesRequired: string[]
}

const ProfilePage: NextPage<InitialProps> = () => {
  // TODO: consider implactions of casing
  const userHandle = useRouter().query.handle as string
  const uiLanguage = useUILanguage()

  const { data, loading, error } = useProfilePageQuery({
    variables: { uiLanguage, userHandle },
  })

  const { userByIdentifier, currentUser } = data || {}
  const posts = data?.posts?.posts

  return (
    <LoadingWrapper loading={loading} error={error}>
      <DashboardLayout pad="never">
        {userByIdentifier && posts && (
          <Profile
            isLoggedInUser={currentUser?.handle === userByIdentifier?.handle}
            user={userByIdentifier}
            posts={posts}
          />
        )}
      </DashboardLayout>
    </LoadingWrapper>
  )
}

ProfilePage.getInitialProps = async (ctx) => {
  const props = await journalyMiddleware(ctx, async (apolloClient) => {
    const userHandle = ctx.query.handle as string

    // const uiLanguage = useUILanguage()
    // const { i18n: { language } } = React.useContext(I18nContext)
    // return langCodeToUILangMap[language] || UILanguage.English

    await apolloClient.query({
      query: ProfilePageDocument,
      variables: {
        uiLanguage: UiLanguage.English,
        userHandle,
      },
    })
  })
  return {
    ...props,
    namespacesRequired: ['common', 'profile', 'post'],
  }
}

export default ProfilePage
