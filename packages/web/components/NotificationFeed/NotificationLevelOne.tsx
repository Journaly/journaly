import React from 'react'
import {
  NotificationFragmentFragment as NotificationType,
  InAppNotificationType,
} from '@/generated/graphql'
import {
  PostClapNotificationLevelOne,
  ThreadCommentNotificationLevelOne,
  ThreadCommentThanksNotificationLevelOne,
} from './Notifications'

type NotificationProps = {
  notification: NotificationType
  handleNotificationLevelChange: (arg: NotificationType) => void
  handleMarkNotificationRead: (arg: number) => void
  handleDeleteNotification: (arg: number) => void
}

// const getNotificationContent = (
//   notificationType: InAppNotificationType,
//   userIdentifier?: string,
//   threadCount?: number,
// ): string => {
//   switch (notificationType) {
//     case InAppNotificationType.POST_CLAP:
//       return `${userIdentifier} clapped on your post!`
//     case InAppNotificationType.THREAD_COMMENT_THANKS:
//       return `${userIdentifier} said thanks for your feedback!`
//     case InAppNotificationType.THREAD_COMMENT:
//       return `You got ${threadCount} new feedback comments in this thread`
//   }
//   return ''
// }

const NotificationLevelOne: React.FC<NotificationProps> = ({
  notification,
  handleNotificationLevelChange,
  handleMarkNotificationRead,
  handleDeleteNotification,
}) => {
  if (notification.type === InAppNotificationType.ThreadComment) {
    return (
      <ThreadCommentNotificationLevelOne
        notification={notification}
        onNotificationClick={() => handleNotificationLevelChange(notification)}
        onDeleteNotification={handleDeleteNotification}
        onMarkNotificationRead={handleMarkNotificationRead}
      />
    )
  }
  if (notification.type === InAppNotificationType.PostClap) {
    return (
      <PostClapNotificationLevelOne
        notification={notification}
        onNotificationClick={() => handleNotificationLevelChange(notification)}
        onDeleteNotification={handleDeleteNotification}
        onMarkNotificationRead={handleMarkNotificationRead}
      />
    )
  }
  if (notification.type === InAppNotificationType.ThreadCommentThanks) {
    return (
      <ThreadCommentThanksNotificationLevelOne
        notification={notification}
        onNotificationClick={() => handleNotificationLevelChange(notification)}
        onDeleteNotification={handleDeleteNotification}
        onMarkNotificationRead={handleMarkNotificationRead}
      />
    )
  }
  return null
}

export default NotificationLevelOne
