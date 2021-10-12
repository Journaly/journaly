import theme from '@/theme'
import React from 'react'

type NotificationCountProps = {
  count: number
}

const NotificationCount: React.FC<NotificationCountProps> = ({ count }) => {
  return (
    <>
      {count > 0 && <div className="notification-counter">{count}</div>}
      <style jsx>{`
        .notification-counter {
          position: absolute;
          background: ${theme.colors.blueLight};
          color: ${theme.colors.white};
          border-radius: 50%;
          padding: 0 8px;
          font-size: 12px;
          top: -7px;
          left: 12px;
          font-weight: 700;
          /* Makes all numbers exact same width */
          font-feature-settings: 'tnum';
          font-variant-numeric: tabular-nums;
        }
      `}</style>
    </>
  )
}

export default NotificationCount
