import React, { useEffect } from 'react'
import Link from 'next/link'
import { navConstants } from './nav-constants'
import NavLinks from './NavLinks'
import { black } from '../../../utils'
import { useCurrentUserQuery } from '../../../generated/graphql'

interface Props {
  expanded: boolean
  collapse: () => void
}

const Nav: React.FC<Props> = ({ expanded, collapse }) => {
  const { data, refetch } = useCurrentUserQuery()

  useEffect(() => {
    setTimeout(() => {
      document.body.classList.remove('block-transitions-on-page-load')
    }, 0)
  }, [])

  const handleCollapse = (): void => {
    // Collapse the nav after clicking a link for mobile only
    if (window.innerWidth < navConstants.mobileBreakpoint) {
      collapse()
    }
  }

  return (
    <div className={expanded ? 'expanded' : ''}>
      <div className="nav-background" onClick={handleCollapse} />

      <nav>
        {data && data.currentUser && (
          <NavLinks onClick={handleCollapse} currentUser={data.currentUser} />
        )}

        <h1 className="nav-logo">
          <Link href="/">
            <a onClick={handleCollapse}>
              J<span>ournaly</span>
            </a>
          </Link>
        </h1>
      </nav>
      <style jsx>{`
        .nav-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.4);
          opacity: 0;
          transition: opacity ${navConstants.transitionDuration}ms ease-in-out;
          z-index: ${navConstants.zIndex};
        }

        .expanded .nav-background {
          opacity: 1;
          /* Make background take up full screen */
          bottom: 0;
          right: 0;
        }

        @media (${navConstants.aboveMobileNav}) {
          .nav-background {
            display: none;
          }
        }

        nav {
          position: fixed;
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: ${navConstants.navWidth}px;
          background-color: ${black};
          z-index: ${navConstants.zIndex};
          transform: translateX(-100%);
          transition: transform ${navConstants.transitionDuration}ms ease-in-out,
            width ${navConstants.transitionDuration}ms ease-in-out;
        }

        .expanded nav {
          /* Move the nav from off the screen to on the screen */
          transform: translateX(0%);
        }

        @media (${navConstants.aboveMobileNav}) {
          nav {
            transform: translateX(0%);
          }
        }
        @media (${navConstants.skinnyNavToDesktop}) {
          nav {
            width: ${navConstants.skinnyNavWidth}px;
          }
        }
        @media (${navConstants.aboveDesktopNav}) {
          /* Allow certain pages, like settings, to have the skinny nav for the desktop breakpoint */
          :not(.expanded) nav {
            width: ${navConstants.skinnyNavWidth}px;
          }
        }

        .nav-logo {
          margin-bottom: 15px;
          text-align: center;
        }

        .nav-logo a {
          font-size: 40px;
          /* Match the line-height of the parent h1 */
          line-height: 56px;
          color: white;
        }

        .nav-logo span {
          display: none;
        }

        .expanded .nav-logo a {
          font-size: 24px;
          animation: fadeIn ${navConstants.transitionDuration}ms linear;
        }

        .expanded .nav-logo span {
          display: inline;
        }
        /*
          See comment in NavLinks for why these styles must be duplicated
          for both .expanded and the mobile nav media query
        */
        @media (${navConstants.mobileNavOnly}) {
          .nav-logo a {
            font-size: 24px;
            animation: fadeIn ${navConstants.transitionDuration}ms linear;
          }

          .nav-logo span {
            display: inline;
          }
        }
      `}</style>
    </div>
  )
}

export default Nav
