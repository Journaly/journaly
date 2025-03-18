import { GetServerSideProps, NextPage } from 'next'
import TermsOfService from '@/components/Site/TermsOfService'
import { journalyMiddleware } from '@/lib/journalyMiddleware'

const TermsOfServicePage: NextPage = () => <TermsOfService />

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const namespacesRequired = ['common']
  const props = await journalyMiddleware(ctx, namespacesRequired)

  return {
    props,
  }
}

export default TermsOfServicePage
