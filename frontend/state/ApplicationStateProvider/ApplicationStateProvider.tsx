import { createContext } from 'react'
import { useCurrentUserQuery, User as UserType } from '../../generated/graphql'

type Props = {
  children: React.ReactNode
}

export const ApplicationContext = createContext({
  currentUser: null as UserType | null,
})

export const ApplicationStateProvider: React.FC<Props> = ({ children }) => {
  const { data } = useCurrentUserQuery()

  const currentUser = data?.currentUser as UserType

  return (
    <ApplicationContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  )
}
