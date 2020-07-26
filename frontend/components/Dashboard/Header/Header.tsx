import React from 'react'
import theme from '../../../theme'
import { navConstants } from '../Nav'
import { headerHeight } from '../dashboardConstants'
import HamburgerIcon from './HamburgerIcon'

interface Props {
  onMenuClick: () => void
}

const Header: React.FC<Props> = ({ onMenuClick }) => {
  return (
    <div className="header">
      <HamburgerIcon onClick={onMenuClick} className="hamburger-icon" />

      <span className="logo-text">Journaly</span>

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
        }
        /* Header should disappear when the mobile nav does */
        @media (${navConstants.aboveMobileNav}) {
          .header {
            display: none;
          }
        }

        :global(.hamburger-icon) {
          margin-left: 10px;
        }

        .logo-text {
          ${theme.typography.fontFamilySerif};
          margin-right: 20px;
        }
      `}</style>
    </div>
  )
}

export default Header
