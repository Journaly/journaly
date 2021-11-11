import React from 'react'
import {
  NotificationFragmentFragment as NotificationType,
  InAppNotificationType,
} from '@/generated/graphql'
import {
  PostClapNotificationLevelOne,
  PostCommentNotificationLevelOne,
  ThreadCommentNotificationLevelOne,
  ThreadCommentThanksNotificationLevelOne,
  LevelOneNotificationProps,
} from './Notifications'
import SwipeableElement from '../SwipeableElement'

type NotificationProps = {
  notification: NotificationType
  handleNotificationLevelChange: (arg: NotificationType) => void
  handleMarkNotificationRead: (arg: number) => void
  handleDeleteNotification: (arg: number) => void
}

const getNotificationComponent = (
  notificationType: InAppNotificationType,
): React.FC<LevelOneNotificationProps> | null => {
  switch (notificationType) {
    case InAppNotificationType.PostClap:
      return PostClapNotificationLevelOne
    case InAppNotificationType.ThreadCommentThanks:
      return ThreadCommentThanksNotificationLevelOne
    case InAppNotificationType.ThreadComment:
      return ThreadCommentNotificationLevelOne
    case InAppNotificationType.PostComment:
      return PostCommentNotificationLevelOne
    case InAppNotificationType.NewPost:
      return null
  }
}

const NotificationLevelOne: React.FC<NotificationProps> = ({
  notification,
  handleNotificationLevelChange,
  handleMarkNotificationRead,
  handleDeleteNotification,
}) => {
  const Component = getNotificationComponent(notification.type)
  if (!Component) return null

  return (
    <SwipeableElement
      destructiveAction={() => handleMarkNotificationRead(notification.id)}
      nonDestructiveAction={() => handleDeleteNotification(notification.id)}
    >
      <Component
        notification={notification}
        onNotificationClick={() => handleNotificationLevelChange(notification)}
      />
    </SwipeableElement>
  )
}

export default NotificationLevelOne
