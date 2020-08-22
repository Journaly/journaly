import React from 'react'
import { NextPage } from 'next'

import { withApollo } from '@lib/apollo'
import LandingPageLayout from '@components/Layouts/LandingPageLayout'
import Home from '@components/Site/Home'

interface InitialProps {
  namespacesRequired: string[]
}

const HomePage: NextPage<InitialProps> = () => {
  return (
    <LandingPageLayout>
      <Home />
    </LandingPageLayout>
  )
}

HomePage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default withApollo(HomePage)
