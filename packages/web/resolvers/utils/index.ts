import { User } from '@journaly/j-db-client'

export const assertUnreachable = (x: never): never => {
  throw new Error(`Didn't expect to get here ${x}`)
}

type AuthoredObject = { authorId: number }

// Takes in an original Post or Comment and a currently logged in User and checks that
// the currentUser has permission to update or delete that Post/Comment
export const hasAuthorPermissions = (original: AuthoredObject, currentUser: User): boolean => {
  const hasPermission =
    original.authorId == currentUser.id ||
    currentUser.userRole === 'MODERATOR' ||
    currentUser.userRole === 'ADMIN'

  if (!hasPermission) throw new Error('You do not have permission to do that')
  return true
}

export * from './email'
export * from './aws'
export * from './resolverUtils'
export * from './db'
export * from './notifications'
export * from './types'
export * from './badges'
export * from './slate'
