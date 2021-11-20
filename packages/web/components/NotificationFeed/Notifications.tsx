import React from 'react'
import Markdown from 'react-markdown'
import {
  NotificationFragmentFragment as NotificationType,
  AuthorFragmentFragment as UserType,
} from '@/generated/graphql'
import theme from '@/theme'
import ClapIcon from '../Icons/ClapIcon'
import UserList from '../UserList'
import { useTranslation } from '@/config/i18n'
import LikeIcon from '../Icons/LikeIcon'
import UserAvatar from '../UserAvatar'

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

type ThreadCommentThanksNotificationThanks =
  NotificationType['threadCommentThanksNotifications'][number]['thanks']

type ThreadGroupedThanksType = Record<
  number,
  {
    thread: ThreadCommentThanksNotificationThanks['comment']['thread']
    thanks: ThreadCommentThanksNotificationThanks[]
  }
>

type BaseNotificationLayoutProps = {
  left?: JSX.Element
  middle?: JSX.Element
  right?: JSX.Element
}

export const getUserIdentifier = (user: UserType) => user?.name || user.handle

const BaseNotificationLayout: React.FC<BaseNotificationLayoutProps> = ({ left, middle, right }) => {
  return (
    <div className="container">
      <div className="left-section">{left}</div>
      <div className="middle-section">{middle}</div>
      <div className="right-section">{right}</div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding: 16px 0;
          border-bottom: 1px solid ${theme.colors.gray600};
          align-items: center;
        }

        .left-section {
          display: ${left ? '' : 'none'};
        }

        .middle-section {
          display: ${middle ? '' : 'none'};
          padding: 0 16px;
        }

        .right-section {
          display: ${right ? '' : 'none'};
        }

        .container :global(.right-section > img) {
          width: 80px;
          height: 50px;
          object-fit: cover;
        }
      `}</style>
    </div>
  )
}

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
  const count = notification.threadCommentNotifications.length
  // TODO: Get subscriber translation if needed

  return (
    <div className="container">
      <div className="middle-section" onClick={onNotificationClick}>
        <p>{t('levelOne.threadComments', { count })}</p>
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
          width: 100%;
          justify-content: space-between;
          padding: 16px;
          border-bottom: 1px solid ${theme.colors.gray600};
          min-height: 100px;
          align-items: center;
          cursor: pointer;
          user-select: none;
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
  const count = notification.postClapNotifications.length

  return (
    <div className="container">
      <div className="left-section">
        <ClapIcon colorScheme="dark-mode" width={24} />
      </div>
      <div className="middle-section" onClick={onNotificationClick}>
        <p>{t('levelOne.postClaps', { count })}</p>
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
          width: 100%;
          justify-content: space-between;
          padding: 16px;
          border-bottom: 1px solid ${theme.colors.gray600};
          min-height: 100px;
          align-items: center;
          cursor: pointer;
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
  const count = notification.threadCommentThanksNotifications.length

  return (
    <div className="container">
      <div className="left-section">
        <UserAvatar user={thanksAuthor} size={50} />
      </div>
      <div className="middle-section" onClick={onNotificationClick}>
        <p>
          {t('levelOne.threadCommentThanks', {
            userIdentifier: getUserIdentifier(thanksAuthor),
            count,
          })}
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
          width: 100%;
          padding: 16px;
          border-bottom: 1px solid ${theme.colors.gray600};
          min-height: 100px;
          align-items: center;
          cursor: pointer;
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
      `}</style>
    </div>
  )
}

export const PostCommentNotificationLevelOne: React.FC<LevelOneNotificationProps> = ({
  notification,
  onNotificationClick,
}) => {
  const { t } = useTranslation('notifications')
  const count = notification.postCommentNotifications.length
  // TODO: Get subscriber translation if needed

  return (
    <div className="container">
      <div className="middle-section" onClick={onNotificationClick}>
        <p>{t('levelOne.postComments', { count })}</p>
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
          width: 100%;
          justify-content: space-between;
          padding: 16px;
          border-bottom: 1px solid ${theme.colors.gray600};
          min-height: 100px;
          align-items: center;
          cursor: pointer;
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
      `}</style>
    </div>
  )
}

export const NewPostNotificationLevelOne: React.FC<LevelOneNotificationProps> = ({
  notification,
  onNotificationClick,
}) => {
  const { t } = useTranslation('notifications')
  const count = notification.newPostNotifications.length

  return (
    <div className="container">
      <div className="middle-section" onClick={onNotificationClick}>
        <p>{t('levelOne.newPosts', { count })}</p>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          width: 100%;
          justify-content: space-between;
          padding: 16px;
          border-bottom: 1px solid ${theme.colors.gray600};
          min-height: 100px;
          align-items: center;
          user-select: none;
          cursor: pointer;
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
  const count = notification.newFollowerNotifications.length

  return (
    <div className="container" onClick={onNotificationClick}>
      {count > 1 ? (
        <ul className="multiple-follower-container">
          <li>
            <UserAvatar user={notification.newFollowerNotifications[0]?.followingUser} size={50} />
          </li>
          <li>
            <UserAvatar user={notification.newFollowerNotifications[1]?.followingUser} size={50} />
          </li>
        </ul>
      ) : (
        <UserAvatar user={notification.newFollowerNotifications[0]?.followingUser} size={50} />
      )}
      <p>{t('levelOne.newFollowers', { count })}</p>
      <style jsx>{`
        .container {
          display: flex;
          width: 100%;
          gap: 16px;
          padding: 16px;
          border-bottom: 1px solid ${theme.colors.gray600};
          min-height: 100px;
          align-items: center;
          justify-content: center;
          user-select: none;
          flex: 1;
          cursor: pointer;
        }

        .multiple-follower-container {
          position: relative;
          // TODO: figure proper centering out here
          margin-top: 16px;
        }

        .multiple-follower-container > li:nth-child(2) {
          position: absolute;
          top: -16px;
          left: -16px;
          z-index: -1;
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
  const thanksAuthor = notification.threadCommentThanksNotifications[0].thanks.author
  const count = notification.threadCommentThanksNotifications.length
  // Separate the different threads
  const threadGroupedThanks: ThreadGroupedThanksType = {}

  for (const { thanks } of notification.threadCommentThanksNotifications) {
    if (threadGroupedThanks[thanks.comment.thread.id]) {
      threadGroupedThanks[thanks.comment.thread.id].thanks.push(thanks)
    } else {
      threadGroupedThanks[thanks.comment.thread.id] = {
        thread: thanks.comment.thread,
        thanks: [thanks],
      }
    }
  }

  return (
    <div className="container" onClick={onNotificationClick}>
      <div className="thanks-author">
        <UserAvatar user={thanksAuthor} size={50} />
      </div>
      <p className="title">
        {t('levelTwo.threadCommentThanks', {
          userIdentifier: getUserIdentifier(thanksAuthor),
          count,
        })}
      </p>
      {Object.values(threadGroupedThanks).map(
        ({ thread, thanks }: ThreadGroupedThanksType[number]) => {
          return (
            <div className="thread" key={thread.id}>
              <span className="highlighted-content">{thread.highlightedContent}</span>
              <ul>
                {thanks.map((thanks) => (
                  <li className="comment" key={thanks.id}>
                    <span>
                      <LikeIcon filled={true} />
                    </span>
                    <span className="comment-body-container">
                      <Markdown>{thanks.comment.body}</Markdown>
                    </span>
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
          cursor: pointer;
        }

        .title {
          text-align: center;
          margin-bottom: 16px;
        }

        .highlighted-content {
          text-align: center;
          background-color: ${theme.colors.highlightColor};
          margin-bottom: 12px;
          padding: 4px;
        }

        .thanks-author {
          margin: 0 auto;
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

        .comment-body-container {
        }

        .author-identifier {
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}

export const PostClapNotificationLevelTwo: React.FC<LevelTwoNotificationProps> = ({
  notification,
  onNotificationClick,
}) => {
  const { t } = useTranslation('notifications')

  const count = notification.postClapNotifications.length
  const clappingUsers = notification.postClapNotifications.map((clap) => clap.postClap.author)

  return (
    <div className="container" onClick={() => onNotificationClick()}>
      <p className="clap-count">{t('levelTwo.postClaps', { count })}</p>
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
                  <li className="comment" key={comment.id}>
                    <UserAvatar user={comment.author} size={50} />
                    <div className="comment-right-side">
                      <span className="author-identifier">
                        @{getUserIdentifier(comment.author)}
                      </span>
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
  const comments = notification.postCommentNotifications.map(
    (notification) => notification.postComment,
  )

  return (
    <div className="container" onClick={onNotificationClick}>
      <p className="post-title">{notification.post?.title}</p>
      <ul>
        {comments.map((comment) => (
          <li className="comment" key={comment.id}>
            <UserAvatar user={comment.author} size={50} />
            <div className="comment-right-side">
              <span className="author-identifier">@{getUserIdentifier(comment.author)}</span>
              <Markdown>{comment.body}</Markdown>
            </div>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          padding: 16px;
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

        ul {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .comment {
          display: flex;
          gap: 12px;
          align-items: center;
          border-bottom: 1px solid ${theme.colors.gray600};
          padding-bottom: 16px;
        }
        .author-identifier {
          font-weight: 600;
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
      <p className="title">{t('levelTwo.newPosts')}</p>
      {newPosts.map((post) => (
        <>
          <BaseNotificationLayout
            left={<UserAvatar user={post.author} size={50} />}
            middle={
              <div>
                <p className="post-title">{post.title}</p>
                <p className="post-author">by {getUserIdentifier(post.author)}</p>
              </div>
            }
            right={<img src={post.headlineImage.smallSize} />}
          />
        </>
      ))}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .title,
        .post-title {
          font-weight: 600;
        }

        .title {
          font-size: 20px;
          text-align: center;
          margin-bottom: 16px;
        }

        .post-author {
          font-size: 12px;
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

  const count = notification.newFollowerNotifications.length
  const newFollowers = notification.newFollowerNotifications.map(
    (notification) => notification.followingUser,
  )

  return (
    <div className="container" onClick={onNotificationClick}>
      <p className="title">{t('levelTwo.newFollowers', { count })}</p>
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
