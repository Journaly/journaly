import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { withApollo } from '../../../../lib/apollo'
import LoadingWrapper from '../../../../components/LoadingWrapper'
import DashboardLayout from '../../../../components/Layouts/DashboardLayout'
import {
  useProfileQuery,
  useCurrentUserQuery,
  User as UserType,
  Post as PostType,
} from '../../../../generated/graphql'
import Profile from '../../../../components/Dashboard/Profile'

interface InitialProps {
  namespacesRequired: string[]
}

const ProfilePage: NextPage<InitialProps> = () => {
  const idStr = useRouter().query.id as string
  const userId = parseInt(idStr, 10)

  const {
    data: userData,
    loading: loadingCurrentUser,
    error: currentUserError,
  } = useCurrentUserQuery()
  const { data: profileData, loading: loadingProfile, error: profileError } = useProfileQuery({
    variables: { userId },
  })

  const isLoading = loadingCurrentUser || loadingProfile
  const hasError = currentUserError || profileError

  return (
    <LoadingWrapper loading={isLoading} error={hasError}>
      <DashboardLayout withPadding={false}>
        <Profile
          isLoggedInUser={userData?.currentUser?.id === userId}
          user={profileData?.userById as UserType}
          posts={profileData?.posts as PostType[]}
        />
      </DashboardLayout>
    </LoadingWrapper>
  )
}

ProfilePage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'profile', 'post'],
})

export default withApollo(ProfilePage)
