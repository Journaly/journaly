import React from 'react'
import { NextPage } from 'next'

import LandingPageLayout from '@/components/Layouts/LandingPageLayout'
import Home from '@/components/Site/Home'

const HomePage: NextPage = () => {
  return (
    <LandingPageLayout>
      <Home />
    </LandingPageLayout>
  )
}

HomePage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'marketing'],
})

export default HomePage
