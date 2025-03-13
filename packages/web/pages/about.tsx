import { GetServerSideProps, NextPage } from 'next'
import LandingPageLayout from '@/components/Layouts/LandingPageLayout'
import About from '@/components/Site/About'
import { journalyMiddleware } from '@/lib/journalyMiddleware'

const AboutPage: NextPage = () => (
  <LandingPageLayout>
    <About />
  </LandingPageLayout>
)

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const namespacesRequired = ['common']
  const props = await journalyMiddleware(ctx, namespacesRequired)

  return {
    props,
  }
}

export default AboutPage
