import React from 'react'
import Markdown from 'react-markdown'
import { NotificationFragmentFragment as NotificationType } from '@/generated/graphql'
import theme from '@/theme'
import BlankAvatarIcon from '../Icons/BlankAvatarIcon'
import ClapIcon from '../Icons/ClapIcon'
import UserList from '../UserList'
import { useTranslation } from '@/config/i18n'

export type LevelOneNotificationProps = {
  notification: NotificationType
  onNotificationClick: () => void
}

export type LevelTwoNotificationProps = {
  notification: NotificationType
  onNotificationClick: () => void
}

type ThreadCommentNotificationComment =
  NotificationType['threadCommentNotifications'][number]['comment']

type ThreadGroupedCommentsType = Record<
  number,
  {
    thread: ThreadCommentNotificationComment['thread']
    comments: ThreadCommentNotificationComment[]
  }
>

/**
 * Level One Notifications
 *
 * These are notifications that appear at the top level of the Notification Feed
 */

export const ThreadCommentNotificationLevelOne: React.FC<LevelOneNotificationProps> = ({
  notification,
  onNotificationClick,
}) => {
  const { t } = useTranslation('notifications')
  const commentCount = notification.threadCommentNotifications.length

  return (
    <div className="container">
      <div className="middle-section" onClick={onNotificationClick}>
        <p>
          {t('levelOne.threadComments', { commentCount, })}
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
    </div>
  )
}

export const PostClapNotificationLevelOne: React.FC<LevelOneNotificationProps> = ({
  notification,
  onNotificationClick,
}) => {
  const { t } = useTranslation('notifications')
  const clapCount = notification.postClapNotifications.length

  return (
    <div className="container">
      <div className="left-section">
        <ClapIcon colorScheme="dark-mode" width={24} />
      </div>
      <div className="middle-section" onClick={onNotificationClick}>
        <p>
          {t('levelOne.postClaps', { clapCount, })}
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
  const { t } = useTranslation('notifications')
  const thanksAuthor = notification.threadCommentThanksNotifications[0].thanks.author
  const userIdentifier = thanksAuthor?.name || thanksAuthor.handle
  const thanksCount = notification.threadCommentThanksNotifications.length

  return (
    <div className="container">
      <div className="left-section">
        {thanksAuthor.profileImage ? (
          <img
            src={thanksAuthor.profileImage}
            alt={`${thanksAuthor?.name || thanksAuthor.handle}'s avatar'`}
            className="user-avatar"
          />
        ) : (
          <BlankAvatarIcon />
        )}
      </div>
      <div className="middle-section" onClick={onNotificationClick}>
        <p>{
          t('levelOne.threadCommentThanks', {
            userIdentifier,
            thanksCount,
          })
        }</p>
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

export const PostCommentNotificationLevelOne: React.FC<LevelOneNotificationProps> = ({
  notification,
  onNotificationClick,
}) => {
  const { t } = useTranslation('notifications')
  const commentCount = notification.postCommentNotifications.length


  return (
    <div className="container">
      <div className="middle-section" onClick={onNotificationClick}>
        <p>
          {/* TODO: figure out plurals programmatically */}
          {t('levelOne.postComments', { commentCount })}
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
    </div>
  )
}

export const NewPostNotificationLevelOne: React.FC<LevelOneNotificationProps> = ({
  notification,
  onNotificationClick,
}) => {
  const { t } = useTranslation('notifications')
  const postCount = notification.newPostNotifications.length

  return (
    <div className="container">
      <div className="middle-section" onClick={onNotificationClick}>
        <p>
          {t('levelOne.newPosts', { postCount })}
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
    </div>
  )
}

export const NewFollowerNotificationLevelOne: React.FC<LevelOneNotificationProps> = ({
  notification,
  onNotificationClick,
}) => {
  const { t } = useTranslation('notifications')
  const followerCount = notification.newFollowerNotifications.length

  return (
    <div className="container" onClick={onNotificationClick}>
      <p>{t('levelOne.newFollowers', { followerCount })}</p>
      <style jsx>{`
        .container {
          display: flex;
          padding: 16px;
          border-bottom: 1px solid ${theme.colors.gray600};
          min-height: 100px;
          align-items: center;
          justify-content: center;
          user-select: none;
          flex: 1;
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
  const { t } = useTranslation('notifications')

  const thanksCount = notification.threadCommentThanksNotifications.length

  return <p onClick={() => onNotificationClick()}>{t('levelTwo.threadCommentThanks', { thanksCount, })}</p>
}

export const PostClapNotificationLevelTwo: React.FC<LevelTwoNotificationProps> = ({
  notification,
  onNotificationClick,
}) => {
  const { t } = useTranslation('notifications')

  const userCount = notification.postClapNotifications.length
  const clappingUsers = notification.postClapNotifications.map((clap) => clap.postClap.author)

  return (
    <div className="container" onClick={() => onNotificationClick()}>
      <p className="clap-count">
        {t('levelTwo.postClaps', { userCount, })}
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
  // Separate the different threads
  const threadGroupedComments: ThreadGroupedCommentsType = {}

  for (const { comment } of notification.threadCommentNotifications) {
    if (threadGroupedComments[comment.thread.id]) {
      threadGroupedComments[comment.thread.id].comments.push(comment)
    } else {
      threadGroupedComments[comment.thread.id] = {
        thread: comment.thread,
        comments: [comment],
      }
    }
  }

  return (
    <div className="container" onClick={onNotificationClick}>
      <p className="post-title">{notification.post?.title}</p>
      {Object.values(threadGroupedComments).map(
        ({ thread, comments }: ThreadGroupedCommentsType[number]) => {
          return (
            <div className="thread" key={thread.id}>
              <span className="highlighted-content">{thread.highlightedContent}</span>
              <ul>
                {comments.map((comment) => (
                  <li className="comment">
                    {comment.author.profileImage ? (
                      <img
                        src={comment.author.profileImage}
                        alt={`${comment.author?.name || comment.author.handle}'s avatar'`}
                        className="user-avatar"
                      />
                    ) : (
                      <BlankAvatarIcon color={theme.colors.white} />
                    )}
                    <div className="comment-right-side">
                      <span className="author-identifier">@{comment.author.handle}</span>
                    <Markdown>{comment.body}</Markdown>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )
        },
      )}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          padding: 16px;
          border-bottom: 1px solid ${theme.colors.gray600};
          min-height: 100px;
          gap: 16px;
          color: ${theme.colors.white};
        }

        .post-title {
          font-weight: 600;
          font-size: 20px;
          text-align: center;
          margin-bottom: 16px;
        }

        .highlighted-content {
          text-align: center;
          background-color: ${theme.colors.highlightColor};
          margin-bottom: 12px;
          padding: 4px;
        }

        .user-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }

        .thread {
          display: flex;
          flex-direction: column;
          margin-bottom: 10px;
        }

        ul {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .comment {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .author-identifier {
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}

export const PostCommentNotificationLevelTwo: React.FC<LevelTwoNotificationProps> = ({
  notification,
  onNotificationClick,
}) => {
  return (
    <div className="container" onClick={onNotificationClick}>
      <h3 className="post-title">{notification.post?.title}</h3>
      
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          padding: 16px;
          border-bottom: 1px solid ${theme.colors.gray600};
          min-height: 100px;
          gap: 16px;
          color: ${theme.colors.white};
        }

        .post-title {
          text-align: center;
          margin-bottom: 16px;
        }

        .highlighted-content {
          text-align: center;
          background-color: ${theme.colors.highlightColor};
          margin-bottom: 8px;
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

export const NewPostNotificationLevelTwo: React.FC<LevelTwoNotificationProps> = ({
  notification,
  onNotificationClick,
}) => {
  const { t } = useTranslation('notifications')

  const newPosts = notification.newPostNotifications.map((notification) => notification.post)

  return (
    <div className="container" onClick={onNotificationClick}>
      <h3 className="post-title">{notification.post?.title}</h3>
      {newPosts.map((post) => (
        <div>
          <p>{post.title}</p>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          padding: 16px;
          border-bottom: 1px solid ${theme.colors.gray600};
          min-height: 100px;
          gap: 16px;
          color: ${theme.colors.white};
        }

        .post-title {
          text-align: center;
          margin-bottom: 16px;
        }

        .highlighted-content {
          text-align: center;
          background-color: ${theme.colors.highlightColor};
          margin-bottom: 8px;
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

export const NewFollowerNotificationLevelTwo: React.FC<LevelTwoNotificationProps> = ({
  notification,
  onNotificationClick,
}) => {
  const { t } = useTranslation('notifications')

  const newFollowerCount = notification.newFollowerNotifications.length
  const newFollowers = notification.newFollowerNotifications.map((notification) => notification.followingUser)


  return (
    <div className="container" onClick={onNotificationClick}>
      <p className="title">{t('levelTwo.newFollowers', { newFollowerCount })}</p>
      <UserList users={newFollowers} colorScheme="dark-mode" />
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          padding: 16px;
          border-bottom: 1px solid ${theme.colors.gray600};
          min-height: 100px;
          gap: 16px;
          color: ${theme.colors.white};
        }

        .title {
          text-align: center;
          margin-bottom: 16px;
        }

        .highlighted-content {
          text-align: center;
          background-color: ${theme.colors.highlightColor};
          margin-bottom: 8px;
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
