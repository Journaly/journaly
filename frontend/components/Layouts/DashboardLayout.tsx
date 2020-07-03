import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import Nav, { navConstants } from '../Dashboard/Nav'
import { layoutPadding } from '../Dashboard/dashboardConstants'
import Header from '../Dashboard/Header'
import useWindowSize from '../../hooks/useWindowSize'
import { User as UserType } from '../../generated/graphql'

interface Props {
  currentUser?: UserType
  children: React.ReactNode
  withPadding?: boolean
}

const DashboardLayout: React.FC<Props> = ({ currentUser, children, withPadding = true }) => {
  const { width } = useWindowSize()
  const router = useRouter()
  const [navExpanded, setNavExpanded] = useState(false)

  const dashboardContainerStyles = classNames('dashboard-container', {
    'settings-page': router.pathname.includes('/settings/'),
    'with-padding': withPadding,
  })

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

      <Nav
        currentUser={currentUser}
        expanded={navExpanded}
        collapse={() => setNavExpanded(false)}
      />

      <div className={dashboardContainerStyles}>{children}</div>

      <style jsx>{`
        .dashboard {
          position: relative;
          height: 100vh;
          width: 100%;
        }

        .dashboard-container {
          height: 100%;
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
