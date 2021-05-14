import React, { useState } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import Nav, { navConstants } from '@/components/Dashboard/Nav'
import { layoutPadding, headerHeight } from '@/components/Dashboard/dashboardConstants'
import Header from '@/components/Dashboard/Header'

interface Props {
  children: React.ReactNode
  pad?: 'always' | 'aboveMobile' | 'never'
}

const DashboardLayout: React.FC<Props> = ({ children, pad = 'always' }) => {
  const router = useRouter()
  const [navExpanded, setNavExpanded] = useState(false)

  const dashboardContainerStyles = classNames('dashboard-container', {
    'settings-page': router.pathname.includes('/settings/'),
  })

  const toggleNav = (): void => {
    setNavExpanded(navExpanded => !navExpanded)
  }

  return (
    <div className="dashboard">
      <Header onMenuClick={toggleNav} />

      <Nav
        expanded={navExpanded}
        collapse={() => setNavExpanded(false)}
        disableLargeNav={router.pathname.includes('/settings/')}
      />

      <div className={dashboardContainerStyles}>{children}</div>

      <style jsx>{`
        .dashboard {
          position: relative;
          height: 100%;
          width: 100%;
          overflow: hidden;
        }

        .dashboard-container {
          padding: ${(pad === 'always' || pad === 'aboveMobile') ? layoutPadding : '0' };
        }

        @media (${navConstants.mobileNavOnly}) {
          .dashboard-container {
            ${(pad === 'aboveMobile') ? 'padding: 0;' : ''}
          }
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
