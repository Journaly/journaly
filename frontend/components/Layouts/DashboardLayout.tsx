import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import Nav, { navConstants } from '../Dashboard/Nav'
import { layoutPadding, headerHeight } from '../Dashboard/dashboardConstants'
import Header from '../Dashboard/Header'
import useWindowSize from '../../hooks/useWindowSize'

interface Props {
  children: React.ReactNode
  withPadding?: boolean
}

const DashboardLayout: React.FC<Props> = ({ children, withPadding = true }) => {
  const { width } = useWindowSize()
  const router = useRouter()
  const shouldNavBeExpanded = () => {
    // Going from tablet to desktop expands the nav
    if (width >= navConstants.desktopBreakpoint) {
      if (router.pathname.includes('/settings/')) {
        return false
      }

      return true
    }

    // Going from mobile to tablet collapses the nav
    if (width >= navConstants.mobileBreakpoint) {
      return false
    }

    return false
  }
  const [navExpanded, setNavExpanded] = useState(false)

  const dashboardContainerStyles = classNames('dashboard-container', {
    'settings-page': router.pathname.includes('/settings/'),
    'with-padding': withPadding,
  })

  const toggleNav = (): void => {
    setNavExpanded(!navExpanded)
  }

  useEffect((): void => {
    setNavExpanded(shouldNavBeExpanded())
  }, [width, router.pathname])

  return (
    <div className="dashboard">
      <Header onMenuClick={toggleNav} />

      <Nav expanded={navExpanded} collapse={() => setNavExpanded(false)} />

      <div className={dashboardContainerStyles}>{children}</div>

      <style jsx>{`
        .dashboard {
          position: relative;
          height: 100%;
          width: 100%;
          overflow: hidden;
        }

        @media (${navConstants.mobileNavOnly}) {
          .dashboard {
            padding-top: ${headerHeight};
          }
        }

        .dashboard-container {
          height: 100%;
          overflow-y: auto;
          transition: margin-left ${navConstants.transitionDuration}ms ease-in-out;
        }

        .dashboard-container.with-padding {
          padding: ${layoutPadding};
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

export default DashboardLayout
