import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { withApollo } from '@/lib/apollo'
import ResetPasswordForm from '@/components/ResetPasswordForm'
import LandingPageLayout from '@/components/Layouts/LandingPageLayout'

const ResetPasswordPage: NextPage = () => {
  const { query } = useRouter()
  const resetToken = query.resetToken as string

  return (
    <LandingPageLayout>
      <ResetPasswordForm resetToken={resetToken!} />
      <style jsx>{`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-gap: 20px;
      `}</style>
    </LandingPageLayout>
  )
}

ResetPasswordPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'authentication'],
})

export default withApollo(ResetPasswordPage)
