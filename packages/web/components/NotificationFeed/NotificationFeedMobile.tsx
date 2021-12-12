import React from 'react'
import ReactDOM from 'react-dom'
import NotificationFeed from '.'

type NotificationFeedMobileProps = {
  onClose: () => void
  dataTestId?: string
}

const NotificationFeedMobile: React.FC<NotificationFeedMobileProps> = ({ onClose }) => {
  const notificationFeedRoot = document.getElementById('notification-feed-root')
  if (!notificationFeedRoot) return null

  return ReactDOM.createPortal(
    (
      <div className="mobile-notification-feed-container">
        <NotificationFeed onClose={onClose} />
        <style jsx>{`
          .mobile-notification-feed-container {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 9999;
          }
        `}
        </style>
      </div>
    ),
    notificationFeedRoot
  )
}

export default NotificationFeedMobile
