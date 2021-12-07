import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  NotificationFragmentFragment as NotificationType,
  NotificationReadStatus,
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
  // 2 minuites = 120 seconds = 120000 miliseconds
  // 5 minuites = 300 seconds = 300000 miliseconds
  const pollInterval = useVisibility() ? 300000 : 300000
  const { data } = useCurrentUserQuery({
    pollInterval,
  })
  const notifications = data?.currentUser?.notifications

  if (!notifications) return null

  const unreadNotifications = notifications.filter(
    (notification) => notification.readStatus === NotificationReadStatus.Unread,
  )
  const unreadCount = unreadNotifications.length

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
