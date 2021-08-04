import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { withApollo } from '@/lib/apollo'
import LoadingWrapper from '@/components/LoadingWrapper'
import DashboardLayout from '@/components/Layouts/DashboardLayout'
import { useProfilePageQuery } from '@/generated/graphql'
import useUILanguage from '@/hooks/useUILanguage'
import Profile from '@/components/Dashboard/Profile'

interface InitialProps {
  namespacesRequired: string[]
}

const ProfilePage: NextPage<InitialProps> = () => {
  const idStr = useRouter().query.id as string
  const userId = parseInt(idStr, 10)

  const uiLanguage = useUILanguage()
  const { data, loading, error } = useProfilePageQuery({ variables: { uiLanguage, userId } })

  const { userById, posts, currentUser } = data || {}

  return (
    <LoadingWrapper loading={loading} error={error}>
      <DashboardLayout pad="never">
        {userById && posts && (
          <Profile isLoggedInUser={currentUser?.id === userId} user={userById} posts={posts} />
        )}
      </DashboardLayout>
    </LoadingWrapper>
  )
}

ProfilePage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'profile', 'post'],
})

export default withApollo(ProfilePage)
