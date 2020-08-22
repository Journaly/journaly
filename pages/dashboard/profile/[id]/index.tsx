import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { withApollo } from '@lib/apollo'
import { useProfileQuery } from '@generated'
import LoadingWrapper from '@components/LoadingWrapper'
import DashboardLayout from '@components/Layouts/DashboardLayout'
import Profile from '@components/Dashboard/Profile'

interface InitialProps {
  namespacesRequired: string[]
}

const ProfilePage: NextPage<InitialProps> = () => {
  const idStr = useRouter().query.id as string
  const id = parseInt(idStr, 10)

  const { data, loading, error } = useProfileQuery({
    variables: { userId: id },
  })

  return (
    <LoadingWrapper loading={loading} error={error}>
      <DashboardLayout>
        {data?.userById && data?.posts && <Profile user={data?.userById} posts={data?.posts} />}
      </DashboardLayout>
    </LoadingWrapper>
  )
}

ProfilePage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'profile', 'post'],
})

export default withApollo(ProfilePage)
