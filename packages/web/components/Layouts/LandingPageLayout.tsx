import { useRouter } from 'next/router'
import LoadingWrapper from '@/components/LoadingWrapper'
import { useCurrentUserQuery, User as UserType } from '@/generated/graphql'
import Nav from '@/components/Site/Nav'

const LandingPageLayout: React.FC = ({ children }) => {
  const router = useRouter()
  const { data, loading, error } = useCurrentUserQuery()

  const currentUser = data?.currentUser as UserType

  if (loading || error) {
    return null
  }

  if (currentUser && typeof window !== 'undefined') {
    router.push({
      pathname: '/my-feed',
    })

    return null
  }

  return (
    <LoadingWrapper loading={loading} error={error}>
      <Nav />
      {children}
    </LoadingWrapper>
  )
}

export default LandingPageLayout
