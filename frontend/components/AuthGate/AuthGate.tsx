import React from 'react'
import { useRouter } from 'next/router'
import LoadingWrapper from '../LoadingWrapper'
import { useCurrentUserQuery, User as UserType } from '../../generated/graphql'

/**
 * Checks that the user is logged in.
 * If not, redirects them to the login page.
 *
 * Example usages:
 *
 * If you need to gate a page, but you don't need any user properties, simply add a child like normal:
 *
 * <AuthGate>
 *   <Child />
 * </AuthGate>
 *
 * Otherwise, wrap the <Child /> component in a function, which accepts currentUser as a parameter
 *
 * <AuthGate>
 *   {(currentUser) => (
 *     <Child currentUser={currentUser} />
 *   )}
 * </AuthGate>
 */

type RenderCallback = (currentUser: UserType) => React.ReactElement

type Props = {
  children: RenderCallback | React.ReactElement
}

const AuthGate: React.FC<Props> = ({ children }) => {
  const router = useRouter()
  const { data, loading, error } = useCurrentUserQuery()

  const currentUser = data?.currentUser as UserType

  if (!(currentUser || loading || error)) {
    router.push({
      pathname: '/dashboard/login',
    })
    return null
  }

  return (
    <LoadingWrapper loading={loading} error={error}>
      {typeof children === 'function' ? children(currentUser) : children}
    </LoadingWrapper>
  )
}

export default AuthGate
