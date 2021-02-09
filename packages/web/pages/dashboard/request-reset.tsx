import { NextPage } from 'next'
import { withApollo } from '@/lib/apollo'
import RequestResetPasswordForm from '@/components/RequestResetPasswordForm'
import LandingPageLayout from '@/components/Layouts/LandingPageLayout'

const RequestResetPasswordPage: NextPage = () => (
  <LandingPageLayout>
    <RequestResetPasswordForm />
    <style jsx>{`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      grid-gap: 20px;
    `}</style>
  </LandingPageLayout>
)

RequestResetPasswordPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'authentication'],
})

export default withApollo(RequestResetPasswordPage)
