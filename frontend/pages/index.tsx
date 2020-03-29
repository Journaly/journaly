import { NextPage } from 'next'
import { withApollo } from '../lib/apollo'

import LandingPageLayout from '../components/Layouts/LandingPageLayout'
import Home from '../components/Site/Home'

interface InitialProps {}

interface Props extends InitialProps {}

const HomePage: NextPage<Props, InitialProps> = () => {
  return (
    <LandingPageLayout>
      <Home />
    </LandingPageLayout>
  )
}

export default withApollo(HomePage)
