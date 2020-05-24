import React from 'react'
import { NextPage } from 'next'

import { withApollo } from '../../lib/apollo'
import Post from '../../components/Dashboard/Post'
import DashboardLayout from '../../components/Layouts/DashboardLayout'

const samplePost = {
  Id: '123456',
  Title: 'Why I Love TypeWriters',
  Body: 'I just got a new typewriter and I cannot wait to tell you all about it.',
  Published: true,
  author: {
    Name: 'Jean-Claude Delouche',
  },
}

const PostPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Post post={samplePost} />
    </DashboardLayout>
  )
}

PostPage.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withApollo(PostPage)
