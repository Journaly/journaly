import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import LoadingWrapper from '../LoadingWrapper'
import { useCurrentUserQuery } from '../../generated/graphql'

/**
 * Checks that the user is logged in.
 * If not, redirects them to the login page.
 */

type AuthGateProps = {
  children: ReactElement
}

const AuthGate: React.FC<AuthGateProps> = ({ children }) => {
  const router = useRouter()
  const { data, loading, error } = useCurrentUserQuery()

  if (!(data?.currentUser || loading || error)) {
    router.push({
      pathname: '/dashboard/login',
    })
    return null
  }

  return <LoadingWrapper loading={loading} error={error} render={() => children} />
}

export default AuthGate
