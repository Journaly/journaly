import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Nav, { navConstants } from './Nav'
import Header from './Header'
import useWindowSize from '../../hooks/useWindowSize'

interface Props {
  children: React.ReactNode
}

const Dashboard: React.FC<Props> = ({ children }) => {
  const { width } = useWindowSize()
  const router = useRouter()
  const [navExpanded, setNavExpanded] = useState(false)

  const toggleNav = (): void => {
    setNavExpanded(!navExpanded)
  }

  useEffect((): void => {
    // Going from tablet to desktop expands the nav
    if (width >= navConstants.desktopBreakpoint) {
      if (router.pathname.endsWith('/settings')) {
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

      <Nav expanded={navExpanded} collapse={() => setNavExpanded(false)} />

      <div className="dashboard-container">{children}</div>

      <style jsx>{`
        .dashboard {
          position: relative;
          width: 100%;
        }

        .dashboard-container {
          padding: 2rem;
          background-color: white;
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
        }
      `}</style>
    </div>
  )
}

export default Dashboard
