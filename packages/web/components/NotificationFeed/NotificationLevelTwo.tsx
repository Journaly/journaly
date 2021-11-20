import React from 'react'
import {
  NotificationFragmentFragment as NotificationType,
  InAppNotificationType,
} from '@/generated/graphql'
import {
  LevelTwoNotificationProps,
  NewPostNotificationLevelTwo,
  PostClapNotificationLevelTwo,
  PostCommentNotificationLevelTwo,
  ThreadCommentNotificationLevelTwo,
  ThreadCommentThanksNotificationLevelTwo,
  NewFollowerNotificationLevelTwo,
} from './Notifications'

type NotificationProps = {
  notification: NotificationType
  handleNotificationLevelChange: (arg: NotificationType) => void
}

const getNotificationComponent = (
  notificationType: InAppNotificationType,
): React.FC<LevelTwoNotificationProps> => {
  switch (notificationType) {
    case InAppNotificationType.PostClap:
      return PostClapNotificationLevelTwo
    case InAppNotificationType.ThreadCommentThanks:
      return ThreadCommentThanksNotificationLevelTwo
    case InAppNotificationType.ThreadComment:
      return ThreadCommentNotificationLevelTwo
    case InAppNotificationType.PostComment:
      return PostCommentNotificationLevelTwo
    case InAppNotificationType.NewPost:
      return NewPostNotificationLevelTwo
    case InAppNotificationType.NewFollower:
      return NewFollowerNotificationLevelTwo
  }
}


const NotificationLevelTwo: React.FC<NotificationProps> = ({
  notification,
  handleNotificationLevelChange,
}) => {
  const Component = getNotificationComponent(notification.type)
  if (!Component) return null

  return (
    <Component
      notification={notification}
      onNotificationClick={() => handleNotificationLevelChange(notification)}
    />
  )
}

export default NotificationLevelTwo
