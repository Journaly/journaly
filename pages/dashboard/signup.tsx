import { NextPage } from 'next'
import { withApollo } from '../../lib/apollo'
import SignupForm from '../../components/SignupForm'
import LandingPageLayout from '../../components/Layouts/LandingPageLayout'

const SignupPage: NextPage = () => (
  <LandingPageLayout>
    <SignupForm />
    <style jsx>{`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      grid-gap: 20px;
    `}</style>
  </LandingPageLayout>
)

SignupPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'authentication'],
})

export default withApollo(SignupPage)
