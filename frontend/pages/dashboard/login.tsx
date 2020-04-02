import { NextPage } from 'next'
import { withApollo } from '../../lib/apollo'
import LogInForm from '../../components/LogInForm'
import LandingPageLayout from '../../components/Layouts/LandingPageLayout'

const LogInPage: NextPage = () => (
  <LandingPageLayout>
    <LogInForm />
    <style jsx>{`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      grid-gap: 20px;
    `}</style>
  </LandingPageLayout>
)

export default withApollo(LogInPage)
