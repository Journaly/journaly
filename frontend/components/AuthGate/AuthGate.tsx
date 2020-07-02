import React from 'react'
import { useRouter } from 'next/router'
import LoadingWrapper from '../LoadingWrapper'
import { useCurrentUserQuery, User } from '../../generated/graphql'

/**
 * Checks that the user is logged in.
 * If not, redirects them to the login page.
 */

type AuthGateProps = {
  user: User
}

type RenderCallback = (args: AuthGateProps) => React.ReactElement

type Props = {
  children: RenderCallback | React.ReactElement
}

const AuthGate: React.FC<Props> = ({ children }) => {
  const router = useRouter()
  const { data, loading, error } = useCurrentUserQuery()

  const user = data?.currentUser as User

  if (!(user || loading || error)) {
    router.push({
      pathname: '/dashboard/login',
    })
    return null
  }

  return (
    <LoadingWrapper loading={loading} error={error}>
      {typeof children === 'function' ? children({ user }) : children}
    </LoadingWrapper>
  )
}

export default AuthGate
