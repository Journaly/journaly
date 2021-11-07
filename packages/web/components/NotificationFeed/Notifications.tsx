import React from 'react'
import { InAppNotification } from '@/generated/graphql'
import theme from '@/theme'
import BlankAvatarIcon from '../Icons/BlankAvatarIcon'
import ClapIcon from '../Icons/ClapIcon'

type IndividualNotificationProps = {
  notification: any
  handleGoToLevelTwo: () => void
}

/**
 * Level One Notifications
 *
 * These are notifications that appear at the top level of the Notification Feed
 */

export const ThreadCommentNotificationLevelOne: React.FC<IndividualNotificationProps> = ({
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

export const PostClapNotificationLevelOne: React.FC<IndividualNotificationProps> = ({
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
          {notification.postClapNotifications?.length} people clapped for your post:{' '}
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

export const ThreadCommentThanksNotificationLevelOne: React.FC<IndividualNotificationProps> = ({
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
          {notification.triggeringUser?.handle} said thanks for{' '}
          {notification.threadThanksNotifications?.length} feedback comments!
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

/**
 * Level Two Notifications
 *
 * These are notifications that appear once a user clicks on a Level One notification
 * and we transition to Level Two which renders a component specifically designs to show
 * more details
 */

export const ThreadCommentThanksNotificationLevelTwo = (notification: InAppNotification) => {
  const count = notification.threadCommentThanksNotifications.length

  return <p>You received {count} claps!</p>
}

export const PostClapNotificationLevelTwo = (notification: InAppNotification) => {
  const count = notification.postClapNotifications.length
  // const users = notification.postClapNotifications.map((notification) => notification.)
  // return <UserList users={users} />
  return <p>You have {count} claps!</p>
}

export const ThreadCommentNotificationLevelTwo = (notification: InAppNotification) => {
  const count = notification.threadCommentNotifications.length

  return <p>{count} New Comments In X Threads</p>
}
