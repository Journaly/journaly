import React from 'react'
import {
  NotificationFragmentFragment as NotificationType,
  InAppNotificationType,
} from '@/generated/graphql'
import {
  PostClapNotificationLevelTwo,
  ThreadCommentNotificationLevelTwo,
  ThreadCommentThanksNotificationLevelTwo,
} from './Notifications'

type NotificationProps = {
  notification: NotificationType
  handleNotificationLevelChange: (arg: NotificationType) => void
}

const NotificationLevelTwo: React.FC<NotificationProps> = ({
  notification,
  handleNotificationLevelChange,
}) => {
  if (notification.type === InAppNotificationType.ThreadComment) {
    return (
      <ThreadCommentNotificationLevelTwo
        notification={notification}
        onNotificationClick={() => handleNotificationLevelChange(notification)}
      />
    )
  }
  if (notification.type === InAppNotificationType.PostClap) {
    return (
      <PostClapNotificationLevelTwo
        notification={notification}
        onNotificationClick={() => handleNotificationLevelChange(notification)}
      />
    )
  }
  if (notification.type === InAppNotificationType.ThreadCommentThanks) {
    return (
      <ThreadCommentThanksNotificationLevelTwo
        notification={notification}
        onNotificationClick={() => handleNotificationLevelChange(notification)}
      />
    )
  }
  return null
}

export default NotificationLevelTwo
