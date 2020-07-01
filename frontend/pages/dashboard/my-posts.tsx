import React from 'react'
import { NextPage } from 'next'

import { withApollo } from '../../lib/apollo'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import AuthGate from '../../components/AuthGate'

const MyPostsPage: NextPage = () => {
  return (
    <AuthGate>
      <DashboardLayout>
        <h1>My Posts</h1>
        <style jsx>{`
          h1 {
            margin: 50px auto;
          }
        `}</style>
      </DashboardLayout>
    </AuthGate>
  )
}

MyPostsPage.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withApollo(MyPostsPage)
