import React, { useState } from 'react'
import theme from '@/theme'
import { navConstants } from '../Nav'
import { headerHeight } from '../dashboardConstants'
import HamburgerIcon from './HamburgerIcon'
import NotificationsIcon from '@/components/Icons/NotificationsIcon'
import { useNotificationContext } from '@/components/NotificationFeed/NotificationContext'
import NotificationFeed from '@/components/NotificationFeed'
import Button, { ButtonVariant } from '@/components/Button'

interface Props {
  onMenuClick: () => void
}

const Header: React.FC<Props> = ({ onMenuClick }) => {
  const [showNotificationFeed, setShowNotificationFeed] = useState(false)

  const notificationContext = useNotificationContext()

  return (
    <div className="header">
      <HamburgerIcon onClick={onMenuClick} className="hamburger-icon" />
      {notificationContext && (
        <Button variant={ButtonVariant.Icon} onClick={() => setShowNotificationFeed(true)}>
          <NotificationsIcon count={notificationContext.unreadCount} />
        </Button>
      )}
      {showNotificationFeed && <NotificationFeed onClose={() => setShowNotificationFeed(false)} />}
      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: ${headerHeight};
          padding: 20px 0;
          color: white;
          background-color: ${theme.colors.charcoal};
          /* Show header above scrolled dashboard content */
          z-index: ${navConstants.zIndex - 1};
          padding: 0 10px;
        }
        /* Header should disappear when the mobile nav does */
        @media (${navConstants.aboveMobileNav}) {
          .header {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default Header
