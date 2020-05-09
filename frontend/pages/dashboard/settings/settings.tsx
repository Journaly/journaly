import React from 'react'
import { NextPage } from 'next'

import { withApollo } from '../../../lib/apollo'
import DashboardLayout from '../../../components/Layouts/DashboardLayout'

const ProfileInfo: NextPage = () => {
  return (
    <DashboardLayout>
      <h1>Settings</h1>
      <style jsx>{`
        h1 {
          margin: 50px auto;
        }
      `}</style>
    </DashboardLayout>
  )
}

ProfileInfo.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withApollo(ProfileInfo)
