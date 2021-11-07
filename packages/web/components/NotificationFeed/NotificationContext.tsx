import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  NotificationFragmentFragment as NotificationType,
  useCurrentUserQuery,
} from '@/generated/graphql'

type NotificationContextValue = {
  notifications: NotificationType[]
  unreadCount: number
}

const useVisibility = () => {
  const initialValue =
    typeof document !== 'undefined' ? document.visibilityState === 'visible' : true
  const [isVisible, setIsVisible] = useState<boolean>(initialValue)

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === 'visible')
    }
    // Track browser tab status
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  return isVisible
}

const useNotificationContextValue = (): NotificationContextValue | null => {
  const pollInterval = useVisibility() ? 5000 : 15000
  const { data } = useCurrentUserQuery({
    pollInterval,
  })
  const notifications = data?.currentUser?.notifications

  if (!notifications) return null

  const unreadCount = notifications.length

  return {
    notifications,
    unreadCount,
  }
}

const NotificationContext = createContext<NotificationContextValue | null>(null)

const NotificationContextProvider: React.FC<{}> = ({ children }) => {
  const value = useNotificationContextValue()
  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export const useNotificationContext = () => useContext(NotificationContext)
export default NotificationContextProvider
