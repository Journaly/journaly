import React from 'react'
import { NextPage } from 'next'

import { withApollo } from '../../lib/apollo'
import DashboardLayout from '../../components/Layouts/DashboardLayout'

const MyPostsPage: NextPage = () => {
  return (
    <DashboardLayout>
      <h1>My Posts</h1>
      <style jsx>{`
        h1 {
          margin: 50px auto;
        }
      `}</style>
    </DashboardLayout>
  )
}

MyPostsPage.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withApollo(MyPostsPage)
