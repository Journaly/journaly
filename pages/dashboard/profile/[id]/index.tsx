import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { withApollo } from '../../../../lib/apollo'
import LoadingWrapper from '../../../../components/LoadingWrapper'
import DashboardLayout from '../../../../components/Layouts/DashboardLayout'
import { useUserByIdQuery } from '../../../../generated/graphql'
import Profile from '../../../../components/Dashboard/Profile'

interface InitialProps {
  namespacesRequired: string[]
}

const ProfilePage: NextPage<InitialProps> = () => {
  const idStr = useRouter().query.id as string
  const id = parseInt(idStr, 10)

  const { data, loading, error } = useUserByIdQuery({
    variables: { id },
  })

  return (
    <LoadingWrapper loading={loading} error={error}>
      <DashboardLayout>
        <Profile user={data?.userById} />
      </DashboardLayout>
    </LoadingWrapper>
  )
}

ProfilePage.getInitialProps = async () => ({
  namespacesRequired: ['profile', 'post'],
})

export default withApollo(ProfilePage)
