import { NextPage } from 'next'
import TermsOfService from '@/components/Site/TermsOfService'

const TermsOfServicePage: NextPage = () => <TermsOfService />

TermsOfServicePage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default TermsOfServicePage
