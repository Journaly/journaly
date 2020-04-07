import { NextPage } from 'next'

import { withApollo } from '../lib/apollo'

import LandingPageLayout from '../components/Layouts/LandingPageLayout'
import Home from '../components/Site/Home'

interface Props {
  namespacesRequired: string[]
}

const HomePage: NextPage<Props> = () => {
  return (
    <LandingPageLayout>
      <Home />
    </LandingPageLayout>
  )
}

HomePage.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withApollo(HomePage)
