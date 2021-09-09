import { useRouter } from 'next/router'
import LoadingWrapper from '@/components/LoadingWrapper'
import { useCurrentUserQuery, User as UserType } from '@/generated/graphql'
import useUILanguage from '@/hooks/useUILanguage'
import Nav from '@/components/Site/Nav'

const LandingPageLayout: React.FC = ({ children }) => {
  const router = useRouter()
  const uiLanguage = useUILanguage()
  const { data, loading, error } = useCurrentUserQuery({
    variables: { uiLanguage }
  })

  const currentUser = data?.currentUser as UserType

  if (loading || error) {
    return null
  }

  if (currentUser && typeof window !== 'undefined') {
    router.push({
      pathname: '/dashboard/my-feed',
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
