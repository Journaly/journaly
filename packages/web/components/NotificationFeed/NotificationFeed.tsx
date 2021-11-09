import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { NotificationFragmentFragment as NotificationType } from '@/generated/graphql'
import NotificationLevelOne from './NotificationLevelOne'
import theme from '@/theme'
import BackArrowIcon from '../Icons/BackArrowIcon'
import Button, { ButtonVariant } from '../Button'
import XIcon from '../Icons/XIcon'
import { useNotificationContext } from './NotificationContext'
import NotificationLevelTwo from './NotificationLevelTwo'

type NotificationFeedProps = {
  onClose: () => void
  dataTestId?: string
}

const NotificationFeed: React.FC<NotificationFeedProps> = ({ onClose }) => {
  const notificationFeedRoot = document.getElementById('notification-feed-root')
  const [notificationLevelTranslation, setNotificationLevelTranslation] = useState(0)
  const [activeNotification, setActiveNotification] = useState<NotificationType | null>(null)

  const { notifications } = useNotificationContext() || {}

  if (!notifications) return null
  if (!notificationFeedRoot) return null

  const handleGoToLevelTwo = (notification: NotificationType) => {
    setActiveNotification(notification)
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
            <NotificationLevelOne
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
            {activeNotification && (
              <NotificationLevelTwo
                notification={activeNotification}
                handleNotificationLevelChange={handleGoToLevelTwo}
              />
            )}
          </div>
          <div className="content">{{}}</div>
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
