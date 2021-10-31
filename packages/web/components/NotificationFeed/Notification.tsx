import React from 'react'
import theme from '@/theme'
import { NotificationType } from '.prisma/client'
import BlankAvatarIcon from '../Icons/BlankAvatarIcon'

type NotificationProps = {
  postImage?: string
  userIdentifier?: string
  userImage?: string
  type: NotificationType
  thread?: any[]
  handleNotificationLevelChange: (arg: number) => void
  handleSetLevelTwoContent: (arg: string) => void
}

const getNotificationContent = (
  notificationType: NotificationType,
  userIdentifier?: string,
  threadCount?: number,
): string => {
  switch (notificationType) {
    case NotificationType.POST_CLAP:
      return `${userIdentifier} clapped on your post!`
    case NotificationType.THREAD_COMMENT_THANKS:
      return `${userIdentifier} said thanks for your feedback!`
    case NotificationType.THREAD_COMMENT:
      return `You got ${threadCount} new feedback comments in this thread`
  }
  return ''
}

const Notification: React.FC<NotificationProps> = ({
  postImage,
  type,
  userIdentifier,
  userImage,
  thread,
  handleNotificationLevelChange,
  handleSetLevelTwoContent,
}) => {
  return (
    <div className="container">
      {userIdentifier && (
        <div className="left-section">
          {userImage ? <img src={userImage} alt="" className="user-avatar" /> : <BlankAvatarIcon />}
        </div>
      )}
      <div
        className="middle-section"
        onClick={() => {
          if (!thread) return
          handleSetLevelTwoContent(`There were ${thread.length} comments on this post`)
          handleNotificationLevelChange(-50)
        }}
      >
        <p>{getNotificationContent(type, userIdentifier, thread?.length)}</p>
      </div>
      {postImage && (
        <div className="right-section">
          <img className="post-image" src={postImage} alt="" />
        </div>
      )}
      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
          padding: 16px;
          border-bottom: 1px solid ${theme.colors.gray600};
          min-height: 100px;
          align-items: center;
        }
        .left-section {
          display: ${userIdentifier ? '' : 'none'};
        }
        .middle-section {
          padding: 0 16px;
        }
        .right-section {
        }

        .post-image {
          width: 100%;
          object-fit: cover;
          height: 50px;
        }

        .user-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
        }
      `}</style>
    </div>
  )
}

export default Notification
