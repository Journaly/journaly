import { NextPage } from 'next'
import TermsOfService from '@/components/Site/TermsOfService'
import { withApollo } from '@/lib/apollo'

const TermsOfServicePage: NextPage = () => <TermsOfService />

TermsOfServicePage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default withApollo(TermsOfServicePage)
