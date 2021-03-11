import React, { useCallback, useState, useEffect } from 'react'
import Link from 'next/link'
import classNames from 'classnames'

import { Router, useTranslation } from '@/config/i18n'
import { navConstants } from './nav-constants'
import theme from '@/theme'
import {
  useLogoutMutation,
  useCurrentUserQuery,
  User as UserType,
  CurrentUserDocument,
} from '@/generated/graphql'

import HamburgerIcon from '../Header/HamburgerIcon'
import NavLink from '@/components/NavLink'
import FeedIcon from '@/components/Icons/FeedIcon'
import BlankAvatarIcon from '@/components/Icons/BlankAvatarIcon'
import HelpIcon from '@/components/Icons/HelpIcon'
import Modal from '@/components/Modal'

interface Props {
  expanded: boolean
  disableLargeNav: boolean
  collapse: () => void
}

const Nav: React.FC<Props> = ({ expanded, collapse, disableLargeNav }) => {
  const { t } = useTranslation()
  const { data, refetch, error } = useCurrentUserQuery()
  const [logout] = useLogoutMutation({
    refetchQueries: [
      { query: CurrentUserDocument }
    ]
  })
  const [shouldShowModal, setShouldShowModal] = useState(false)

  let currentUser: UserType | null = data?.currentUser as UserType
  if (error) currentUser = null

  const navStyles = classNames('nav-wrapper', {
    expanded,
    'disable-large-nav': disableLargeNav,
    'logged-in': Boolean(currentUser)
  })

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

  const handleLogOut = useCallback(async (): void => {
    await logout()

    // Redirect to home page
    Router.push('/')
  }, [logout])

  return (
    <div className={navStyles}>
      <div className="nav-background" onClick={handleCollapse} />

      <nav>
        <HamburgerIcon onClick={handleCollapse} className="mobile-hamburger-icon" />

        {currentUser && (
          <>
            <div className="nav-top">
              <Link href={`/dashboard/profile/[id]`} as={`/dashboard/profile/${currentUser.id}`}>
                <a onClick={handleCollapse} className="profile-image">
                  {currentUser.profileImage ? (
                    <img src={currentUser.profileImage} alt="" />
                  ) : (
                    <BlankAvatarIcon size={60} />
                  )}

                  <p className="current-user-name">{currentUser.handle}</p>
                </a>
              </Link>
            </div>
            <div className="nav-bottom">
              <NavLink href="/dashboard/my-feed">
                <a className="nav-link" onClick={handleCollapse}>
                  <FeedIcon aria-hidden="true" />
                  <span className="nav-link-text">{t('dashboardNav.myFeed')}</span>
                </a>
              </NavLink>
              <NavLink href="/dashboard/my-posts">
                <a className="nav-link" onClick={handleCollapse}>
                  <FeedIcon aria-hidden="true" />
                  <span className="nav-link-text">{t('dashboardNav.myPosts')}</span>
                </a>
              </NavLink>
              <NavLink href="/dashboard/new-post">
                <a className="nav-link" onClick={handleCollapse}>
                  <img src="/images/icons/new-post-icon.svg" alt="" />
                  <span className="nav-link-text">{t('dashboardNav.newPost')}</span>
                </a>
              </NavLink>

              <hr />

              <NavLink href="/dashboard/settings/profile">
                <a className="nav-link" onClick={handleCollapse}>
                  <img src="/images/icons/settings-icon.svg" alt="" />
                  <span className="nav-link-text">{t('dashboardNav.settings')}</span>
                </a>
              </NavLink>

              <a role="button" className="log-out nav-link" onClick={handleLogOut}>
                <img src="/images/icons/logout-icon.svg" alt="Log out" />
                <span className="nav-link-text">{t('dashboardNav.logOut')}</span>
              </a>
            </div>
          </>
        )}
        
        <div className="nav-support">
          <span className="help-btn" onClick={() => setShouldShowModal(true)}>
            <HelpIcon width={30} height={30} />
          </span>
          <h1 className="nav-logo">
            <Link href="/">
              <a onClick={handleCollapse}>
                J<span>ournaly</span>
              </a>
            </Link>
          </h1>
        </div>
        {shouldShowModal && (
          <Modal
            title={t('helpModal.header')}
            body={
              <>
                <p style={{
                  marginTop: '25px',
                }}>{t('helpModal.bodyOne')}</p>
                <p>{t('helpModal.bodyTwo')}<a href="mailto:hello@journaly.com" style={{
                  color: theme.colors.blueLight,
                }}>hello@journaly.com</a>{t('helpModal.bodyThree')}</p>
              </>
            }
            footer={
              <p style={{
                margin: '0 auto',
              }}>{t('helpModal.footer')}</p>
            }
            onClose={() => setShouldShowModal(false)}
          />
        )}
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

        :global(.mobile-hamburger-icon) {
          display: none;
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

        .expanded nav {
          /* Move the nav from off the screen to on the screen */
          transform: translateX(0%);
        }

        .nav-support {
          /* The auto top margin allows the logo to take up enough space, but push itself down */
          margin: auto 0 15px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .help-btn:hover {
          cursor: pointer;
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

        .nav-top {
          margin-top: 30px;
        }

        .nav-top a {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        .profile-image img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
        }

        .profile-image :global(svg) {
          border-radius: 50%;
          background-color: ${theme.colors.blueLight};
        }

        .current-user-name,
        .nav-link {
          /* Prevent words from wrapping during transition */
          white-space: nowrap;
        }

        .current-user-name {
          display: none;
        }

        .nav-bottom {
          display: flex;
          flex-direction: column;
          /* centers itself in the grid container */
          align-self: center;
        }

        .nav-bottom hr {
          width: 40px;
          margin-top: 10px;
          margin-bottom: 10px;
          border: 1px solid white;
          transition: width ${navConstants.transitionDuration}ms linear;
        }

        .nav-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 70px;
          font-size: 16px;
          color: ${theme.colors.white};
          transition: padding-left ${navConstants.transitionDuration}ms linear,
            padding-right ${navConstants.transitionDuration}ms linear;
        }

        .nav-link.active,
        .nav-link:hover {
          background-color: #5a5a5a;
        }

        .nav-link img {
          width: 25px;
        }

        .nav-link-text {
          margin-left: 0;
          font-size: 10px;
          transition: margin-left ${navConstants.transitionDuration}ms linear;
        }



        @media (${navConstants.mobileNavOnly}) {
          :global(.mobile-hamburger-icon) {
            position: absolute;
            top: 20px;
            left: 10px;
            display: block;
          }

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

          .current-user-name {
            display: block;
            width: 100%;
            margin-top: 15px;
            font-size: 16px;
            text-align: center;
            color: ${theme.colors.white};
          }

          .nav-bottom hr {
            width: 180px;
            margin: 20px auto;
          }

          .nav-link {
            flex-direction: row;
            justify-content: normal;
            height: auto;
            padding: 25px;
          }

          .nav-link-text {
            margin-left: 15px;
            font-size: 16px;
          }
        }


        @media (${navConstants.skinnyNavToDesktop}) {
          .nav-background {
            display: none;
          }

          nav {
            grid-gap: 30px;
            transform: translateX(0%);
            width: ${navConstants.skinnyNavWidth}px;
          }

          .nav-top {
            margin-top: 50px;
          }
        }

        @media (${navConstants.aboveDesktopNav}) {
          .disable-large-nav .nav-background {
            display: none;
          }
          .disable-large-nav nav {
            grid-gap: 30px;
            transform: translateX(0%);
            width: ${navConstants.skinnyNavWidth}px;
          }
          .disable-large-nave .nav-top {
            margin-top: 50px;
          }


          .nav-wrapper:not(.disable-large-nav) .nav-background {
            display: none;
          }
          .nav-wrapper:not(.disable-large-nav) nav {
            grid-gap: 30px;
            transform: translateX(0%);
          }
          .nav-wrapper:not(.disable-large-nav) .nav-logo span {
            display: inline;
          }
          .nav-wrapper:not(.disable-large-nav) .nav-logo a {
            font-size: 24px;
            animation: fadeIn ${navConstants.transitionDuration}ms linear;
          }
          .nav-wrapper:not(.disable-large-nav) .current-user-name {
            display: block;
            width: 100%;
            margin-top: 15px;
            font-size: 16px;
            text-align: center;
            color: ${theme.colors.white};
          }
          .nav-wrapper:not(.disable-large-nav) .nav-bottom hr {
            width: 180px;
            margin: 20px auto;
          }
          .nav-wrapper:not(.disable-large-nav) .nav-link {
            flex-direction: row;
            justify-content: normal;
            height: auto;
            padding: 25px;
          }
          .nav-wrapper:not(.disable-large-nav) .nav-link-text {
            margin-left: 15px;
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  )
}

export default Nav
