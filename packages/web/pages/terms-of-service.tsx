import { NextPage } from 'next'
import LandingPageLayout from '@/components/Layouts/LandingPageLayout'
import TermsOfService from '@/components/Site/TermsOfService'
import { withApollo } from '@/lib/apollo'

const TermsOfServicePage: NextPage = () => (
  <LandingPageLayout>
    <TermsOfService />
  </LandingPageLayout>
)

TermsOfServicePage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default withApollo(TermsOfServicePage)
