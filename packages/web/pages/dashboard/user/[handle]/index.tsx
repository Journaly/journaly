import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { withApollo } from '@/lib/apollo'
import LoadingWrapper from '@/components/LoadingWrapper'
import DashboardLayout from '@/components/Layouts/DashboardLayout'
import { useProfilePageQuery, useUserByIdentifierQuery } from '@/generated/graphql'
import useUILanguage from '@/hooks/useUILanguage'
import Profile from '@/components/Dashboard/Profile'

interface InitialProps {
  namespacesRequired: string[]
}

const ProfilePage: NextPage<InitialProps> = () => {
  // TODO: consider implactions of casing
  const userHandle = useRouter().query.handle as string
  const uiLanguage = useUILanguage()

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useUserByIdentifierQuery({
    variables: {
      handle: userHandle,
    },
  })

  if (!userData) {
    return null
  }

  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
  } = useProfilePageQuery({
    variables: { uiLanguage, userId: userData?.userByIdentifier.id },
  })

  const { userByIdentifier, currentUser } = profileData || {}
  const posts = profileData?.posts?.posts

  return (
    <LoadingWrapper loading={userLoading || profileLoading} error={userError || profileError}>
      <DashboardLayout pad="never">
        {userByIdentifier && posts && (
          <Profile
            isLoggedInUser={currentUser?.handle === userData.userByIdentifier.handle}
            user={userByIdentifier}
            posts={posts}
          />
        )}
      </DashboardLayout>
    </LoadingWrapper>
  )
}

ProfilePage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'profile', 'post'],
})

export default withApollo(ProfilePage)
