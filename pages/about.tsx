import { NextPage } from 'next'
import LandingPageLayout from '@components/Layouts/LandingPageLayout'
import About from '@components/Site/About'
import { withApollo } from '@lib/apollo'

const AboutPage: NextPage = () => (
  <LandingPageLayout>
    <About />
  </LandingPageLayout>
)

AboutPage.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withApollo(AboutPage)
