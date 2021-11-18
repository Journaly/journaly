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
      <NotificationFeed onClose={onClose} />, notificationFeedRoot
    
  )
}

export default NotificationFeedMobile
