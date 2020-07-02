import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { withApollo } from '../../lib/apollo'
import Post from '../../components/Dashboard/Post'
import LoadingWrapper from '../../components/LoadingWrapper'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import { useCurrentUserQuery, usePostByIdQuery } from '../../generated/graphql'

const PostPage: NextPage = () => {
  const idStr = useRouter().query.id as string
  const id = parseInt(idStr, 10)
  const { refetch, loading: postLoading, error: postError, data: postData } = usePostByIdQuery({
    variables: { id },
  })
  const { loading: userLoading, error: userError, data: userData } = useCurrentUserQuery()

  return (
    <DashboardLayout>
      <LoadingWrapper loading={postLoading || userLoading} error={postError || userError}>
        <Post post={postData?.postById} currentUser={userData?.currentUser} refetch={refetch} />
      </LoadingWrapper>
    </DashboardLayout>
  )
}

PostPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'post'],
})

export default withApollo(PostPage)
