import React from 'react'
import { GetServerSideProps, NextPage } from 'next'

import LandingPageLayout from '@/components/Layouts/LandingPageLayout'
import Home from '@/components/Site/Home'
import { journalyMiddleware } from '@/lib/journalyMiddleware'

const HomePage: NextPage = () => {
  return (
    <LandingPageLayout>
      <Home />
    </LandingPageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const namespacesRequired = ['common', 'marketing']
  const props = await journalyMiddleware(ctx, namespacesRequired)

  return {
    props,
  }
}

export default HomePage
