import React from 'react'
import { NextPage } from 'next'

import { withApollo } from '../../lib/apollo'
import DashboardLayout from '../../components/Layouts/DashboardLayout'

const DraftsPage: NextPage = () => {
  return (
    <DashboardLayout>
      <h1>Drafts</h1>
      <style jsx>{`
        h1 {
          margin: 50px auto;
        }
      `}</style>
    </DashboardLayout>
  )
}

export default withApollo(DraftsPage)
