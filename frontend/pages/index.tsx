import { NextPage } from 'next'
import LandingPageLayout from '../components/Layouts/LandingPageLayout'
import HomePage from '../components/Site/HomePage'

const IndexPage: NextPage = () => (
  <LandingPageLayout>
    <HomePage />
  </LandingPageLayout>
)

export default IndexPage
