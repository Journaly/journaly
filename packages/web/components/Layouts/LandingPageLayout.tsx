import { useEffect } from 'react'
import { useRouter } from 'next/router'
import LoadingWrapper from '@/components/LoadingWrapper'
import { useCurrentUserQuery, User as UserType } from '@/generated/graphql'
import Nav from '@/components/Site/Nav'

type LandingPageLayoutProps = {
  children: React.ReactNode
}

const LandingPageLayout: React.FC<LandingPageLayoutProps> = ({ children }) => {
  const router = useRouter()
  const { data, loading, error } = useCurrentUserQuery()

  const currentUser = data?.currentUser as UserType


  useEffect(() => {
    if (currentUser) {
      router.push({ pathname: '/my-feed' })
    }
  }, [currentUser])

  if (loading || error) {
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
