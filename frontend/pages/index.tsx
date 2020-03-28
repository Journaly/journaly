import { NextPage } from 'next'
import { withApollo } from '../lib/apollo'
import LandingPageLayout from '../components/Layouts/LandingPageLayout'
import Home from '../components/Site/Home'

const HomePage: NextPage = () => (
  <LandingPageLayout>
    <Home />
  </LandingPageLayout>
)

export default withApollo(HomePage)
