import React from 'react'
import { NextPage } from 'next'
// import AuthGate from '@/components/AuthGate'
import JAdmin from '@/components/Dashboard/JAdmin'
import { withApollo } from '@/lib/apollo'
import DashboardLayout from '@/components/Layouts/DashboardLayout'

type InitialProps = {
  namespacesRequired: string[]
}

const JAdminPage: NextPage<InitialProps> = () => {
  return (
    <>
      <DashboardLayout>
        <JAdmin />
      </DashboardLayout>
    </>
  )
}

JAdminPage.getInitialProps = async () => {
  return {
    namespacesRequired: ['common'],
  }
}

export default withApollo(JAdminPage)
