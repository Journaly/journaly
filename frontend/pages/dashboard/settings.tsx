import React from 'react'
import { NextPage } from 'next'

import { withApollo } from '../../lib/apollo'
import DashboardLayout from '../../components/Layouts/DashboardLayout'

const SettingsPage: NextPage = () => {
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

export default withApollo(SettingsPage)
