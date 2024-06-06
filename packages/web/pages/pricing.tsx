import React from 'react'
import { NextPage } from 'next'

import LandingPageLayout from '@/components/Layouts/LandingPageLayout'
import Pricing from '@/components/Site/Pricing'

const PricingPage: NextPage = () => {
  return (
    <LandingPageLayout>
      <Pricing />
    </LandingPageLayout>
  )
}

PricingPage.getInitialProps = async () => ({
  namespacesRequired: ['settings'],
})

export default PricingPage
