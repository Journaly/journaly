import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { withApollo } from '../../lib/apollo'
import Post from '../../components/Dashboard/Post'
import LoadingWrapper from '../../components/LoadingWrapper'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import { usePostByIdQuery } from '../../generated/graphql'

const PostPage: NextPage = () => {
  const { id: idStr } = useRouter().query
  const id = parseInt(idStr, 10)
  const { loading, error, data } = usePostByIdQuery({
    variables: { id },
  })

  console.log(data)
  const post = data?.postById

  return (
    <DashboardLayout>
      <LoadingWrapper loading={loading} error={error}>
        <Post post={post} />
      </LoadingWrapper>
    </DashboardLayout>
  )
}

export default withApollo(PostPage)
