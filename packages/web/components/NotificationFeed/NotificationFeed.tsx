import React from 'react'
import ReactDOM from 'react-dom'
import { UserFragmentFragment as UserType } from '@/generated/graphql'
import Notification from './Notification'
import theme from '@/theme'
import { NotificationType } from '.prisma/client'

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
    type: NotificationType.POST_CLAP,
    postImage:
      'https://d2ieewwzq5w1x7.cloudfront.net/post-image/f24ad1f4-c934-4e5b-b183-19358856e2ce-small',
  },
  {
    id: 2,
    userIdentifier: 'Kevin',
    userImage:
      'https://res.cloudinary.com/journaly/image/upload/v1596759208/journaly/hxzlmnj56ow03sgojwsp.jpg',
    type: NotificationType.THREAD_COMMENT_THANKS,
    postImage:
      'https://d2ieewwzq5w1x7.cloudfront.net/post-image/a8949a84-43b3-4dc1-851c-6f089fab32b3-small',
  },
  {
    id: 3,
    type: NotificationType.THREAD_COMMENT,
    postImage:
      'https://d2ieewwzq5w1x7.cloudfront.net/post-image/77cc91d6-7b9c-4c02-9233-1bea2dc1f674-small',
    thread: ['hello!', 'woooooo', 'hoo!'],
  },
]

const NotificationFeed: React.FC<NotificationFeedProps> = ({ currentUser }) => {
  console.log('feed open!', currentUser)
  const notificationFeedRoot = document.getElementById('notification-feed-root')

  if (!notificationFeedRoot) {
    return null
  }

  return ReactDOM.createPortal(
    <div>
      <div className="container">
        {notifications.map(({ id, type, userIdentifier, userImage, postImage, thread }) => (
          <Notification
            key={id}
            type={type}
            userIdentifier={userIdentifier ? userIdentifier : undefined}
            userImage={userImage ? userImage : undefined}
            postImage={postImage ? postImage : undefined}
            thread={thread ? thread : undefined}
          />
        ))}
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

        .container {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          animation: 100ms fadeIn linear;
          z-index: 100;
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: ${theme.colors.charcoal};
        }
      `}</style>
    </div>,
    notificationFeedRoot,
  )
}

export default NotificationFeed
