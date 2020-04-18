import React from 'react'
import { black } from '../../../utils'
import { navConstants } from '../Nav'

interface Props {
  onMenuClick: () => void
}

const Header: React.FC<Props> = ({ onMenuClick }) => {
  return (
    <div className="header">
      <div className="hamburger-icon" onClick={onMenuClick}>
        <div />
        <div />
        <div />
      </div>

      <span className="logo-text">Journaly</span>

      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 72px;
          padding: 20px 0;
          color: white;
          background-color: ${black};
        }
        /* Header should disappear when the mobile nav does */
        @media (${navConstants.aboveMobileNav}) {
          .header {
            display: none;
          }
        }

        .hamburger-icon {
          margin-left: 10px;
          padding: 10px;
          cursor: pointer;
          /* Allow hamburger icon to appear through open, overlaid mobile <Nav /> */
          z-index: ${navConstants.zIndex + 1};
        }

        .hamburger-icon div {
          height: 1px;
          width: 32px;
          background-color: white;
        }

        .hamburger-icon div:nth-child(2) {
          margin-top: 7px;
          width: 24px;
        }

        .hamburger-icon div:nth-child(3) {
          margin-top: 7px;
          width: 18px;
        }

        .logo-text {
          margin-right: 20px;
        }
      `}</style>
    </div>
  )
}

export default Header
