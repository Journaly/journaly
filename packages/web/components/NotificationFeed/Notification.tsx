import React from 'react'
import { InAppNotificationType } from '.prisma/client'
import {
  PostClapNotificationLevelOne,
  ThreadCommentNotificationLevelOne,
  ThreadCommentThanksNotificationLevelOne,
} from './Notifications'

type NotificationProps = {
  notification: any
  handleNotificationLevelChange: (arg: any) => void
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

const Notification: React.FC<NotificationProps> = ({
  notification,
  handleNotificationLevelChange,
}) => {
  if (notification.type === InAppNotificationType.THREAD_COMMENT) {
    return (
      <ThreadCommentNotificationLevelOne
        notification={notification}
        handleGoToLevelTwo={() => handleNotificationLevelChange(notification)}
      />
    )
  }
  if (notification.type === InAppNotificationType.POST_CLAP) {
    return (
      <PostClapNotificationLevelOne
        notification={notification}
        handleGoToLevelTwo={() => handleNotificationLevelChange(notification)}
      />
    )
  }
  if (notification.type === InAppNotificationType.THREAD_COMMENT_THANKS) {
    return (
      <ThreadCommentThanksNotificationLevelOne
        notification={notification}
        handleGoToLevelTwo={() => handleNotificationLevelChange(notification)}
      />
    )
  }
  return null
}

export default Notification
