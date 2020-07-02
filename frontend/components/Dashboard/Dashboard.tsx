import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Nav, { navConstants } from './Nav'
import Header from './Header'
import useWindowSize from '../../hooks/useWindowSize'
import { User as UserType } from '../../generated/graphql'

interface Props {
  user?: UserType
  children: React.ReactNode
}

const Dashboard: React.FC<Props> = ({ user, children }) => {
  const { width } = useWindowSize()
  const router = useRouter()
  const [navExpanded, setNavExpanded] = useState(false)

  const toggleNav = (): void => {
    setNavExpanded(!navExpanded)
  }

  useEffect((): void => {
    // Going from tablet to desktop expands the nav
    if (width >= navConstants.desktopBreakpoint) {
      if (router.pathname.includes('/settings/')) {
        setNavExpanded(false)
        return
      }

      setNavExpanded(true)
      return
    }

    // Going from mobile to tablet collapses the nav
    if (width >= navConstants.mobileBreakpoint) {
      setNavExpanded(false)
    }
  }, [width, router.pathname])

  return (
    <div className="dashboard">
      <Header onMenuClick={toggleNav} />

      <Nav user={user} expanded={navExpanded} collapse={() => setNavExpanded(false)} />

      <div
        className={`dashboard-container ${
          router.pathname.includes('/settings/') ? 'settings-page' : ''
        }`}
      >
        {children}
      </div>

      <style jsx>{`
        .dashboard {
          position: relative;
          height: 100vh;
          width: 100%;
        }

        .dashboard-container {
          height: 100%;
          padding: 50px 25px;
          transition: margin-left ${navConstants.transitionDuration}ms ease-in-out;
        }

        @media (${navConstants.skinnyNavToDesktop}) {
          .dashboard-container {
            margin-left: ${navConstants.skinnyNavWidth}px;
          }
        }
        @media (${navConstants.aboveDesktopNav}) {
          .dashboard-container {
            margin-left: ${navConstants.navWidth}px;
          }
          /* The settings page has a collapsed nav bar, so we use the smaller left margin */
          .dashboard-container.settings-page {
            margin-left: ${navConstants.skinnyNavWidth}px;
          }
        }
      `}</style>
    </div>
  )
}

export default Dashboard
