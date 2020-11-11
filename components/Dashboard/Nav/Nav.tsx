import React, { useEffect } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { navConstants } from './nav-constants'
import HamburgerIcon from '../Header/HamburgerIcon'
import NavLinks from './NavLinks'
import { useCurrentUserQuery, User as UserType } from '../../../generated/graphql'
import theme from '../../../theme'

interface Props {
  expanded: boolean
  collapse: () => void
}

const Nav: React.FC<Props> = ({ expanded, collapse }) => {
  const { data, error } = useCurrentUserQuery()
  let currentUser: UserType | null = data?.currentUser as UserType
  if (error) currentUser = null

  const navStyles = classNames('nav-wrapper', { expanded, 'logged-in': Boolean(currentUser) })

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
    <div className={navStyles}>
      <div className="nav-background" onClick={handleCollapse} />

      <nav>
        <HamburgerIcon onClick={handleCollapse} className="mobile-hamburger-icon" />

        {currentUser && <NavLinks onClick={handleCollapse} currentUser={currentUser} />}

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
          transition: opacity ${navConstants.transitionDuration}ms linear;
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

        :global(.mobile-hamburger-icon) {
          display: none;
        }

        @media (${navConstants.mobileNavOnly}) {
          :global(.mobile-hamburger-icon) {
            position: absolute;
            top: 20px;
            left: 10px;
            display: block;
          }
        }

        nav {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          display: grid;
          grid-template-rows: 1fr 2fr 1fr;
          grid-gap: 10px;
          width: ${navConstants.navWidth}px;
          background-color: ${theme.colors.charcoal};
          z-index: ${navConstants.zIndex};
          transform: translateX(-100%);
          transition: transform ${navConstants.transitionDuration}ms linear,
            width ${navConstants.transitionDuration}ms linear;
        }

        @media (min-width: ${theme.breakpoints.XS}) {
          nav {
            grid-gap: 30px;
          }
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

        .nav-logo {
          /* The auto top margin allows the logo to take up enough space, but push itself down */
          margin: auto 0 15px;
          text-align: center;
        }

        .nav-wrapper:not(.logged-in) .nav-logo {
          margin: 6px 0 15px;
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }


        @media (${navConstants.aboveDesktopNav}) {
          .nav-logo span {
            display: inline;
          }

          .nav-logo a {
            font-size: 24px;
            animation: fadeIn ${navConstants.transitionDuration}ms linear;
          }
        }

        @media (${navConstants.mobileNavOnly}) {
          .nav-logo a {
            font-size: 24px;
            animation: fadeIn ${navConstants.transitionDuration}ms linear;
          }

          .nav-logo span {
            display: inline;
          }

          .nav-logo a {
            font-size: 24px;
            animation: fadeIn ${navConstants.transitionDuration}ms linear;
          }
        }
      `}</style>
    </div>
  )
}

export default Nav
