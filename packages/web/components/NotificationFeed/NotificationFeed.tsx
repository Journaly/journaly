import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { InAppNotification, UserFragmentFragment as UserType } from '@/generated/graphql'
import Notification from './Notification'
import theme from '@/theme'
import { InAppNotificationType } from '.prisma/client'
import BackArrowIcon from '../Icons/BackArrowIcon'
import Button, { ButtonVariant } from '../Button'
import XIcon from '../Icons/XIcon'

type NotificationFeedProps = {
  currentUser: UserType | null | undefined
  onClose: () => void
  dataTestId?: string
}

const notifications = [
  {
    id: 1,
    userIdentifier: 'Lanny',
    userImage:
      'https://d2ieewwzq5w1x7.cloudfront.net/avatar-image/a682efc7-8efa-48f8-82c1-6f9a5e01a567-large',
    type: InAppNotificationType.POST_CLAP,
    post: {
      title: 'Amazing',
      image:
        'https://d2ieewwzq5w1x7.cloudfront.net/post-image/f24ad1f4-c934-4e5b-b183-19358856e2ce-small',
    },
    postClapNotifications: [
      {
        author: {
          id: 1,
          profileImage:
            'https://d2ieewwzq5w1x7.cloudfront.net/avatar-image/a682efc7-8efa-48f8-82c1-6f9a5e01a567-large',
          handle: 'Lanny',
        },
      },
      {
        author: {
          id: 2,
          profileImage:
            'https://res.cloudinary.com/journaly/image/upload/v1596759208/journaly/hxzlmnj56ow03sgojwsp.jpg',
          handle: 'Kevin',
        },
      },
    ],
  },
  {
    id: 2,
    userIdentifier: 'Kevin',
    userImage:
      'https://res.cloudinary.com/journaly/image/upload/v1596759208/journaly/hxzlmnj56ow03sgojwsp.jpg',
    type: InAppNotificationType.THREAD_COMMENT_THANKS,
    post: {
      title: 'EPIC',
      image:
        'https://d2ieewwzq5w1x7.cloudfront.net/post-image/a8949a84-43b3-4dc1-851c-6f089fab32b3-small',
    },
  },
  {
    id: 3,
    type: InAppNotificationType.THREAD_COMMENT,
    post: {
      title: 'Absolutely Smashing',
      image:
        'https://d2ieewwzq5w1x7.cloudfront.net/post-image/77cc91d6-7b9c-4c02-9233-1bea2dc1f674-small',
    },
    threadNotifications: ['hello!', 'woooooo', 'hoo!'],
  },
]

const ThreadCommentThanksNotificationLevelTwo = () => <p>8 New Comments In 5 Threads</p>

const PostClapNotificationLevelTwo = (notification: InAppNotification) => {
  // const users = notification.postClapNotifications.map((notification: any) => notification.author)
  // return <UserList users={users} />
  return <p>I will be the user list!</p>
}

const ThreadCommentNotificationLevelTwo = () => <p>Here are the threads</p>

const NotificationFeed: React.FC<NotificationFeedProps> = ({ onClose }) => {
  const notificationFeedRoot = document.getElementById('notification-feed-root')
  const [notificationLevelTranslation, setNotificationLevelTranslation] = useState(0)
  const [activeNotification, setActiveNotification] = useState<JSX.Element | null>(null)

  if (!notificationFeedRoot) {
    return null
  }

  const handleGoToLevelTwo = (notification: any) => {
    if (notification.type === InAppNotificationType.THREAD_COMMENT_THANKS) {
      setActiveNotification(<ThreadCommentThanksNotificationLevelTwo />)
    }
    if (notification.type === InAppNotificationType.POST_CLAP) {
      setActiveNotification(<PostClapNotificationLevelTwo notification={notification} />)
    }
    if (notification.type === InAppNotificationType.THREAD_COMMENT) {
      setActiveNotification(<ThreadCommentNotificationLevelTwo />)
    }
    setNotificationLevelTranslation(-50)
  }

  const handleGoToLevelOne = () => {
    setActiveNotification(null)
    setNotificationLevelTranslation(0)
  }

  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="container">
        <div className="level-one">
          <div className="top">
            <p>Notifications</p>
            <Button variant={ButtonVariant.Icon} onClick={onClose}>
              <XIcon color={theme.colors.white} />
            </Button>
          </div>
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              notification={notification}
              handleNotificationLevelChange={handleGoToLevelTwo}
            />
          ))}
        </div>
        <div className="level-two">
          <div className="top">
            <Button variant={ButtonVariant.Icon} onClick={handleGoToLevelOne}>
              <BackArrowIcon />
            </Button>
            <span>Notifications</span>
          </div>
          <div className="content">{activeNotification}</div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .wrapper {
        }

        .container {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 100;
          width: 200%;
          overflow-x: hidden;
          height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          transform: translateX(${notificationLevelTranslation}%);
          transition: transform 0.2s ease;
          background: ${theme.colors.charcoal};
          color: ${theme.colors.white};
        }

        .level-one,
        .level-two {
          display: flex;
          flex-direction: column;
        }

        .top {
          display: flex;
          gap: 16px;
          padding: 16px;
          border-bottom: 1px solid ${theme.colors.gray600};
        }

        .level-one > .top {
          font-weight: 600;
          font-size: 20px;
          justify-content: space-between;
        }

        .level-two > .content {
          padding: 16px;
        }
      `}</style>
    </div>,
    notificationFeedRoot,
  )
}

export default NotificationFeed
