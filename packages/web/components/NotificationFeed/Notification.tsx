import React from 'react'
import theme from '@/theme'
import { InAppNotificationType } from '.prisma/client'
import BlankAvatarIcon from '../Icons/BlankAvatarIcon'
import ClapIcon from '../Icons/ClapIcon'

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

type IndividualNotificationProps = {
  notification: any
  handleGoToLevelTwo: () => void
}

const ThreadCommentNotification: React.FC<IndividualNotificationProps> = ({
  notification,
  handleGoToLevelTwo,
}) => {
  return (
    <div className="container">
      <div className="middle-section" onClick={handleGoToLevelTwo}>
        <p>
          You got {notification.threadNotifications.length} new feedback comments in this thread
        </p>
      </div>
      <div className="right-section">
        <img
          className="post-image"
          src={notification.post.image}
          alt={`post "${notification.post.title}"'s image`}
        />
      </div>
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
          display: ${notification.userIdentifier ? '' : 'none'};
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

const PostClapNotification: React.FC<IndividualNotificationProps> = ({
  notification,
  handleGoToLevelTwo,
}) => {
  return (
    <div className="container">
      <div className="left-section">
        <ClapIcon />
      </div>
      <div className="middle-section" onClick={handleGoToLevelTwo}>
        <p>
          {notification.postClapNotifications.length} people clapped for your post:{' '}
          {notification.post.title}
        </p>
      </div>
      <div className="right-section">
        <img
          className="post-image"
          src={notification.post.image}
          alt={`post "${notification.post.title}"'s image`}
        />
      </div>
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
          display: ${notification.userIdentifier ? '' : 'none'};
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

const ThreadCommentThanksNotification: React.FC<IndividualNotificationProps> = ({
  notification,
  handleGoToLevelTwo,
}) => {
  return (
    <div className="container">
      <div className="left-section">
        {notification.userImage ? (
          <img
            src={notification.userImage}
            alt={`${notification.userIdentifier}'s avatar'`}
            className="user-avatar"
          />
        ) : (
          <BlankAvatarIcon />
        )}
      </div>
      <div className="middle-section" onClick={handleGoToLevelTwo}>
        <p>
          {notification.triggeringUser.handle} said thanks for{' '}
          {notification.threadThanksNotifications.length} feedback comments!
        </p>
      </div>
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
          display: ${notification.userIdentifier ? '' : 'none'};
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

const Notification: React.FC<NotificationProps> = ({
  notification,
  handleNotificationLevelChange,
}) => {
  if (notification.type === InAppNotificationType.THREAD_COMMENT) {
    return (
      <ThreadCommentNotification
        notification={notification}
        handleGoToLevelTwo={() => handleNotificationLevelChange(notification)}
      />
    )
  }
  if (notification.type === InAppNotificationType.POST_CLAP) {
    return (
      <PostClapNotification
        notification={notification}
        handleGoToLevelTwo={() => handleNotificationLevelChange(notification)}
      />
    )
  }
  if (notification.type === InAppNotificationType.THREAD_COMMENT_THANKS) {
    return (
      <ThreadCommentThanksNotification
        notification={notification}
        handleGoToLevelTwo={() => handleNotificationLevelChange(notification)}
      />
    )
  }
  return null
}

export default Notification
