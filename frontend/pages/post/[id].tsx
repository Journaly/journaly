import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { withApollo } from '../../lib/apollo'
import Post from '../../components/Dashboard/Post'
import LoadingWrapper from '../../components/LoadingWrapper'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import { usePostByIdQuery } from '../../generated/graphql'

const PostPage: NextPage = () => {
  const idStr = useRouter().query.id as string
  const id = parseInt(idStr, 10)
  const { refetch, loading, error, data } = usePostByIdQuery({
    variables: { id },
  })

  const post = data?.postById

  return (
    <DashboardLayout>
      <LoadingWrapper
        loading={loading}
        error={error}
        render={() => <Post post={post} refetch={refetch} />}
      />
    </DashboardLayout>
  )
}

PostPage.getInitialProps = async () => ({
  namespacesRequired: ['posts'],
})

export default withApollo(PostPage)
