import { NextPage } from 'next'
import { withApollo } from '@lib/apollo'
import LoginForm from '@components/LoginForm'
import LandingPageLayout from '@components/Layouts/LandingPageLayout'

const LoginPage: NextPage = () => (
  <LandingPageLayout>
    <LoginForm />
    <style jsx>{`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      grid-gap: 20px;
    `}</style>
  </LandingPageLayout>
)

LoginPage.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withApollo(LoginPage)
