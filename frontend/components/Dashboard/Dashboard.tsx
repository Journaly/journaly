import React from 'react'
import Nav, { navConstants } from './Nav'
import Header from './Header'
import { lightGrey } from '../../utils'

const Dashboard = ({ children }) => {
  const handleMenuClick = () => {
  }

  return (
    <div className="dashboard">
      <Header onMenuClick={handleMenuClick} />
      <Nav />
      <div className="dashboard-container">{children}</div>
      <style jsx>{`
        .dashboard {
          width: 100%;
          background-color: ${lightGrey};
        }

        .dashboard-container {
          margin: 0 auto;
          padding: 2rem;
          background-color: white;
        }

        @media (min-width: ${navConstants.mobileBreakpoint}px) and (max-width: ${navConstants.desktopBreakpoint -
          1}px) {
          .dashboard-container {
            margin-left: ${navConstants.skinnyNavWidth}px;
          }
        }
        @media (min-width: ${navConstants.desktopBreakpoint}px) {
          .dashboard-container {
            margin-left: ${navConstants.navWidth}px;
          }
        }
      `}</style>
    </div>
  )
}

export default Dashboard
