import React from 'react'
import { GetServerSideProps, NextPage } from 'next'

import LandingPageLayout from '@/components/Layouts/LandingPageLayout'
import Pricing from '@/components/Site/Pricing'
import { journalyMiddleware } from '@/lib/journalyMiddleware'

const PricingPage: NextPage = () => {
  return (
    <LandingPageLayout>
      <Pricing />
    </LandingPageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const namespacesRequired = ['settings']
  const props = await journalyMiddleware(ctx, namespacesRequired)

  return {
    props,
  }
}

export default PricingPage
