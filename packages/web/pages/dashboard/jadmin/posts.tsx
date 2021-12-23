import React from 'react'
import { NextPage } from 'next'
// import AuthGate from '@/components/AuthGate'
import JAdminPosts from '@/components/Dashboard/JAdmin/JAdminPosts'
import { withApollo } from '@/lib/apollo'
import DashboardLayout from '@/components/Layouts/DashboardLayout'

type InitialProps = {
  namespacesRequired: string[]
}

const JAdminPostsPage: NextPage<InitialProps> = () => {
  return (
    <>
      <DashboardLayout>
        <JAdminPosts />
      </DashboardLayout>
    </>
  )
}

JAdminPostsPage.getInitialProps = async () => {
  return {
    namespacesRequired: ['common'],
  }
}

export default withApollo(JAdminPostsPage)
