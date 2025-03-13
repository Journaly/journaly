import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import ResetPasswordForm from '@/components/ResetPasswordForm'
import LandingPageLayout from '@/components/Layouts/LandingPageLayout'
import { journalyMiddleware } from '@/lib/journalyMiddleware'

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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const namespacesRequired = ['common', 'authentication']
  const props = await journalyMiddleware(ctx, namespacesRequired)

  return {
    props,
  }
}

export default ResetPasswordPage
