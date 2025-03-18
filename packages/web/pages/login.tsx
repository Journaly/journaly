import { GetServerSideProps, NextPage } from 'next'
import LoginForm from '@/components/LoginForm'
import LandingPageLayout from '@/components/Layouts/LandingPageLayout'
import { journalyMiddleware } from '@/lib/journalyMiddleware'

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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const namespacesRequired = ['common', 'authentication']
  const props = await journalyMiddleware(ctx, namespacesRequired)

  return {
    props,
  }
}

export default LoginPage
