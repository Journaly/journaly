import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { InAppNotification, useCurrentUserQuery } from '@/generated/graphql'
import Notification from './Notification'
import theme from '@/theme'
import { InAppNotificationType } from '.prisma/client'
import BackArrowIcon from '../Icons/BackArrowIcon'
import Button, { ButtonVariant } from '../Button'
import XIcon from '../Icons/XIcon'
import { useInterval } from '@/hooks/useInterval'
import {
  NOTIFICATION_FEED_POLLING_INTERVAL_TAB_ACTIVE,
  NOTIFICATION_FEED_POLLING_INTERVAL_TAB_INACTIVE,
} from '@/constants'
import {
  PostClapNotificationLevelTwo,
  ThreadCommentNotificationLevelTwo,
  ThreadCommentThanksNotificationLevelTwo,
} from './Notifications'

type NotificationFeedProps = {
  onClose: () => void
  dataTestId?: string
  onUpdateFeedCount: React.Dispatch<React.SetStateAction<number>>
}

enum NotificationFeedPollingInterval {
  NOTIFICATION_FEED_POLLING_INTERVAL_TAB_ACTIVE,
  NOTIFICATION_FEED_POLLING_INTERVAL_TAB_INACTIVE,
}

const NotificationFeed: React.FC<NotificationFeedProps> = ({ onClose, onUpdateFeedCount }) => {
  const notificationFeedRoot = document.getElementById('notification-feed-root')
  const [notificationLevelTranslation, setNotificationLevelTranslation] = useState(0)
  const [activeNotification, setActiveNotification] = useState<JSX.Element | null>(null)
  const [notificationFeedPollingDelay, setNotificationFeedPollingDelay] =
    useState<NotificationFeedPollingInterval>(NOTIFICATION_FEED_POLLING_INTERVAL_TAB_ACTIVE)

  const { data } = useCurrentUserQuery()
  const notifications = data?.currentUser?.notifications

  const handleUpdatePollingDelay = () => {
    if (document.visibilityState === 'visible') {
      console.log(
        `Tab is active, setting polling interval to ${
          NOTIFICATION_FEED_POLLING_INTERVAL_TAB_ACTIVE / 1000
        } seconds`,
      )
      setNotificationFeedPollingDelay(NOTIFICATION_FEED_POLLING_INTERVAL_TAB_ACTIVE)
    } else if (document.visibilityState === 'hidden') {
      console.log(
        `Tab is inactive, setting polling interval to ${
          NOTIFICATION_FEED_POLLING_INTERVAL_TAB_INACTIVE / 1000
        } seconds`,
      )
      setNotificationFeedPollingDelay(NOTIFICATION_FEED_POLLING_INTERVAL_TAB_INACTIVE)
    }
  }

  useEffect(() => {
    // Track browser tab status
    if (document !== undefined) {
      document.addEventListener('visibilitychange', handleUpdatePollingDelay)
    }
  }, [])

  // Short Polling For New Notifications
  useInterval(async () => {
    console.log('Polling for new notifications...')
    // const { data } = useCurrentUserQuery()
  }, notificationFeedPollingDelay)

  if (!notificationFeedRoot) {
    return null
  }

  const handleGoToLevelTwo = (notification: InAppNotification) => {
    if (notification.type === InAppNotificationType.THREAD_COMMENT_THANKS) {
      setActiveNotification(<ThreadCommentThanksNotificationLevelTwo notification={notification} />)
    }
    if (notification.type === InAppNotificationType.POST_CLAP) {
      setActiveNotification(<PostClapNotificationLevelTwo notification={notification} />)
    }
    if (notification.type === InAppNotificationType.THREAD_COMMENT) {
      setActiveNotification(<ThreadCommentNotificationLevelTwo notification={notification} />)
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
          {notifications?.map((notification) => (
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
