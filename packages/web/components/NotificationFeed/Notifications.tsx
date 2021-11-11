import React from 'react'
import Markdown from 'react-markdown'
import { NotificationFragmentFragment as NotificationType } from '@/generated/graphql'
import theme from '@/theme'
import BlankAvatarIcon from '../Icons/BlankAvatarIcon'
import ClapIcon from '../Icons/ClapIcon'
import SwipeableElement from '../SwipeableElement'
import UserList from '../UserList'

type LevelOneNotificationProps = {
  notification: NotificationType
  onNotificationClick: () => void
  onMarkNotificationRead: (arg: number) => void
  onDeleteNotification: (arg: number) => void
}

type LevelTwoNotificationProps = {
  notification: NotificationType
  onNotificationClick: () => void
}

/**
 * Level One Notifications
 *
 * These are notifications that appear at the top level of the Notification Feed
 */

export const ThreadCommentNotificationLevelOne: React.FC<LevelOneNotificationProps> = ({
  notification,
  onNotificationClick,
  onMarkNotificationRead,
  onDeleteNotification,
}) => {
  return (
    <SwipeableElement
      destructiveAction={onDeleteNotification}
      nonDestructiveAction={onMarkNotificationRead}
      elementId={notification.id}
    >
      <div className="container">
        <div className="middle-section" onClick={onNotificationClick}>
          <p>
            You got {notification.threadCommentNotifications.length} new feedback comments in this
            thread
          </p>
        </div>
        <div className="right-section">
          <img
            className="post-image"
            src={notification.post?.headlineImage.smallSize}
            alt={`post "${notification.post?.title}"'s image`}
          />
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
          padding: 16px;
          border-bottom: 1px solid ${theme.colors.gray600};
          min-height: 100px;
          align-items: center;
          // TODO: decide what to do here
          cursor: grab;
          user-select: none;
        }

        .grabbing {
          cursor: grabbing;
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
    </SwipeableElement>
  )
}

export const PostClapNotificationLevelOne: React.FC<LevelOneNotificationProps> = ({
  notification,
  onNotificationClick,
}) => {
  return (
    <div className="container">
      <div className="left-section">
        <ClapIcon />
      </div>
      <div className="middle-section" onClick={onNotificationClick}>
        <p>
          {notification.postClapNotifications?.length} people clapped for your post:{' '}
          {notification.post?.title}
        </p>
      </div>
      <div className="right-section">
        <img
          className="post-image"
          src={notification.post?.headlineImage.smallSize}
          alt={`post "${notification.post?.title}"'s image`}
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

        .middle-section {
          padding: 0 16px;
        }

        .post-image {
          width: 100%;
          object-fit: cover;
          height: 50px;
        }
      `}</style>
    </div>
  )
}

export const ThreadCommentThanksNotificationLevelOne: React.FC<LevelOneNotificationProps> = ({
  notification,
  onNotificationClick,
}) => {
  return (
    <div className="container">
      <div className="left-section">
        {notification.triggeringUser?.profileImage ? (
          <img
            src={notification.triggeringUser.profileImage}
            alt={`${
              notification.triggeringUser?.name || notification.triggeringUser.handle
            }'s avatar'`}
            className="user-avatar"
          />
        ) : (
          <BlankAvatarIcon />
        )}
      </div>
      <div className="middle-section" onClick={onNotificationClick}>
        <p>
          {notification.triggeringUser?.handle} said thanks for{' '}
          {notification.threadCommentThanksNotifications?.length} feedback comments!
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
          display: ${notification.triggeringUser ? '' : 'none'};
        }
        .middle-section {
          padding: 0 16px;
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

export const ThreadCommentThanksNotificationLevelTwo: React.FC<LevelTwoNotificationProps> = ({
  notification,
  onNotificationClick,
}) => {
  const count = notification.threadCommentThanksNotifications.length

  return <p onClick={() => onNotificationClick()}>You received {count} claps!</p>
}

export const PostClapNotificationLevelTwo: React.FC<LevelTwoNotificationProps> = ({
  notification,
  onNotificationClick,
}) => {
  const count = notification.postClapNotifications.length
  const clappingUsers = notification.postClapNotifications.map((clap) => clap.postClap.author)
  // const users = notification.postClapNotifications.map((notification) => notification.)
  // return <UserList users={users} />
  return (
    <div className="container" onClick={() => onNotificationClick()}>
      <p className="clap-count">
        {count} {count > 1 ? 'people' : 'person'} clapped for your post!
      </p>
      <UserList users={clappingUsers} colorScheme="dark-mode" />
      <style jsx>{`
        .container {
          padding: 0 10px;
        }
        .clap-count {
          text-align: center;
          font-weight: 600;
          margin-bottom: 16px;
        }
      `}</style>
    </div>
  )
}

export const ThreadCommentNotificationLevelTwo: React.FC<LevelTwoNotificationProps> = ({
  notification,
  onNotificationClick,
}) => {
  console.log(notification)

  return (
    <div className="container" onClick={onNotificationClick}>
      <div className="middle-section">
        {notification.threadCommentNotifications.map((notification) => (
          // TODO: Understand the situation with thread being null
          // <div className="thread" key={notification.thread?.id}>
          //   {notification.thread?.highlightedContent}
          // </div>

          <div className="comment">
            {notification.comment.author.profileImage ? (
              <img
                src={notification.comment.author.profileImage}
                alt={`${
                  notification.comment.author?.name || notification.comment.author.handle
                }'s avatar'`}
                className="user-avatar"
              />
            ) : (
              <BlankAvatarIcon color={theme.colors.white} />
            )}
            <Markdown>{notification.comment.body}</Markdown>
          </div>
        ))}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
          padding: 16px;
          border-bottom: 1px solid ${theme.colors.gray600};
          min-height: 100px;
          align-items: center;
          color: ${theme.colors.white};
        }

        .middle-section {
          padding: 0 16px;
        }

        .user-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
        }

        .thread {
          display: flex;
          flex-direction: column;
        }
        .comment {
          display: flex;
        }
      `}</style>
    </div>
  )
}
