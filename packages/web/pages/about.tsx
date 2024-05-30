import { NextPage } from 'next'
import LandingPageLayout from '@/components/Layouts/LandingPageLayout'
import About from '@/components/Site/About'

const AboutPage: NextPage = () => (
  <LandingPageLayout>
    <About />
  </LandingPageLayout>
)

// TODO: Let's get the about page translated?
AboutPage.getInitialProps = async () => {
  return {
    namespacesRequired: ['common'],
  }
}

export default AboutPage