import React, { useCallback, useState, useEffect, useRef } from 'react'
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
import HelpIcon from '@/components/Icons/HelpIcon'
import Modal from '@/components/Modal'
import NotificationsIcon from '@/components/Icons/NotificationsIcon'
import NotificationFeed from '@/components/NotificationFeed'
import NotificationFeedMobile from '@/components/NotificationFeed/NotificationFeedMobile'
import { useNotificationContext } from '@/components/NotificationFeed/NotificationContext'
import UserAvatar from '@/components/UserAvatar'

interface Props {
  expanded: boolean
  disableLargeNav: boolean
  collapse: () => void
}

const NOTIFICATION_FEED_SLIDE_TIME = 0.5

const Nav: React.FC<Props> = ({ expanded, collapse, disableLargeNav }) => {
  const { t } = useTranslation()

  // TODO: Refactor these into a hook
  const [renderNotificationFeedDesktop, setRenderNotificationFeedDesktop] = useState(false)
  const [showNotificationFeedDesktop, setShowNotificationFeedDesktop] = useState(false)
  const unrenderNotificationFeedDesktopTimeout = useRef<ReturnType<typeof setTimeout>>()

  const [showNotificationFeedMobile, setShowNotificationFeedMobile] = useState(false)
  const { data, error } = useCurrentUserQuery()
  const [logout] = useLogoutMutation({
    refetchQueries: [{ query: CurrentUserDocument }],
  })
  const [shouldShowModal, setShouldShowModal] = useState(false)

  const notificationContext = useNotificationContext()

  let currentUser: UserType | null = data?.currentUser as UserType
  if (error) currentUser = null

  const navStyles = classNames('nav-wrapper', {
    expanded,
    'disable-large-nav': disableLargeNav,
    'logged-in': Boolean(currentUser),
  })

  useEffect(() => {
    setTimeout(() => {
      document.body.classList.remove('block-transitions-on-page-load')
    }, 0)
  }, [])

  const handleToggleNotificationFeedDesktop = () => {
    // If accessing from the mobile hamburger menu, show mobile notification feed
    if (window.innerWidth < navConstants.mobileBreakpoint) {
      setShowNotificationFeedMobile(true)
      return
    }
    // When collapsing, allow animation to play before unmounting elements
    if (!showNotificationFeedDesktop) {
      if (unrenderNotificationFeedDesktopTimeout.current) {
        clearTimeout(unrenderNotificationFeedDesktopTimeout.current)
      }
      setRenderNotificationFeedDesktop(true)
      setShowNotificationFeedDesktop(true)
    } else {
      setShowNotificationFeedDesktop(false)
      unrenderNotificationFeedDesktopTimeout.current = setTimeout(() => {
        setRenderNotificationFeedDesktop(false)
      }, NOTIFICATION_FEED_SLIDE_TIME * 1000)
    }
  }

  const handleCollapse = (): void => {
    // Collapse the nav after clicking a link for mobile only
    if (window.innerWidth < navConstants.mobileBreakpoint) {
      collapse()
    }
  }

  const handleLogOut = useCallback(async () => {
    await logout()

    // Redirect to home page
    Router.push('/')
  }, [logout])

  return (
    <div className={navStyles}>
      <div className="nav-background" onClick={handleCollapse} />
      {currentUser && (
        <div className="notification-feed-desktop-container">
          {renderNotificationFeedDesktop && (
            <NotificationFeed onClose={handleToggleNotificationFeedDesktop} />
          )}
        </div>
      )}
      <nav>
        <HamburgerIcon onClick={handleCollapse} className="mobile-hamburger-icon" />

        {currentUser && (
          <>
            <div className="nav-top">
              <Link href={`/dashboard/profile/[id]`} as={`/dashboard/profile/${currentUser.id}`}>
                <a onClick={handleCollapse}>
                  <UserAvatar size={60} user={currentUser} />
                  <p className="current-user-name">{currentUser.handle}</p>
                </a>
              </Link>
            </div>
            <div className="nav-bottom">
              <NavLink href="/dashboard/my-feed">
                <a className="nav-link" onClick={handleCollapse} data-testid="my-feed-nav-link">
                  <FeedIcon aria-hidden="true" />
                  <span className="nav-link-text">{t('dashboardNav.myFeed')}</span>
                </a>
              </NavLink>
              <NavLink href="/dashboard/my-posts">
                <a className="nav-link" onClick={handleCollapse} data-testid="my-posts-nav-link">
                  <FeedIcon aria-hidden="true" />
                  <span className="nav-link-text">{t('dashboardNav.myPosts')}</span>
                </a>
              </NavLink>
              <NavLink href="/dashboard/new-post">
                <a className="nav-link" onClick={handleCollapse} data-testid="new-post-nav-link">
                  <img src="/images/icons/new-post-icon.svg" alt="" />
                  <span className="nav-link-text">{t('dashboardNav.newPost')}</span>
                </a>
              </NavLink>

              <hr />

                <div
                  className="nav-link notifications"
                  onClick={handleToggleNotificationFeedDesktop}
                  data-testid="notifications-nav-link"
                >
                  <NotificationsIcon
                    count={notificationContext?.unreadCount || 0}
                    aria-hidden="true"
                  />
                  <span className="nav-link-text">{t('dashboardNav.notifications')}</span>
                </div>
              <NavLink href="/dashboard/settings/profile">
                <a className="nav-link" onClick={handleCollapse} data-testid="settings-nav-link">
                  <img src="/images/icons/settings-icon.svg" alt="" />
                  <span className="nav-link-text">{t('dashboardNav.settings')}</span>
                </a>
              </NavLink>

              <a
                role="button"
                className="log-out nav-link"
                onClick={handleLogOut}
                data-testid="log-out-nav-link"
              >
                <img src="/images/icons/logout-icon.svg" alt="Log out" />
                <span className="nav-link-text">{t('dashboardNav.logOut')}</span>
              </a>
            </div>
          </>
        )}

        <div className="nav-support">
          {currentUser && (
            <span
              role="button"
              className="help-btn"
              onClick={() => setShouldShowModal(true)}
              data-testid="help-nav-link"
            >
              <HelpIcon width={30} height={30} />
            </span>
          )}
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
                <p
                  style={{
                    marginTop: '25px',
                  }}
                >
                  {t('helpModal.bodyOne')}
                </p>
                <p>
                  {t('helpModal.bodyTwo')}
                  <a
                    href="mailto:hello@journaly.com"
                    style={{
                      color: theme.colors.blueLight,
                    }}
                  >
                    hello@journaly.com
                  </a>
                  {t('helpModal.bodyThree')}
                </p>
              </>
            }
            footer={
              <p
                style={{
                  margin: '0 auto',
                }}
              >
                {t('helpModal.footer')}
              </p>
            }
            onClose={() => setShouldShowModal(false)}
          />
        )}
      </nav>
      {showNotificationFeedMobile && <NotificationFeedMobile onClose={() => setShowNotificationFeedMobile(false)} />}
      <style jsx>{`
        .nav-wrapper {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 2;
          width: ${navConstants.navWidth}px;
        }

        .nav-wrapper.expanded {
          z-index: ${navConstants.zIndex};
        }

        nav > :global(*) {
          max-width: ${navConstants.navWidth}px;
        }

        .nav-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.4);
          opacity: 0;
          transition: opacity ${navConstants.transitionDuration}ms linear;
        }

        .notification-feed-desktop-container {
          position: absolute;
          top: 0;
          height: 100vh;
          left: ${showNotificationFeedDesktop ? '100%' : 'max(-50vw, -400px)'};
          transition: left ${NOTIFICATION_FEED_SLIDE_TIME}s ease;
          width: min(50vw, 400px);
          overflow-x: hidden;
          z-index: -1;
          border-left: 1px solid ${theme.colors.gray600};
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
          display: grid;
          grid-template-rows: 1fr 2fr 1fr;
          grid-gap: 10px;
          background-color: ${theme.colors.charcoal};
          z-index: ${navConstants.zIndex};
          transform: translateX(-100%);
          transition: transform ${navConstants.transitionDuration}ms linear,
            width ${navConstants.transitionDuration}ms linear;
          width: 100%;
          height: 100%;
          // TODO: Figure this out
          /* overflow-y: auto;
          overflow-x: visible; */
          overflow: visible;
        }

        .expanded nav {
          /* Move the nav from off the screen to on the screen */
          transform: translateX(0%);
        }

        .nav-support {
          /* The auto top margin allows the logo to take up enough space, but push itself down */
          margin: ${currentUser ? 'auto 0 15px' : 'auto 0'};
          grid-row-start: ${currentUser ? 3 : 2};
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

        .nav-link.notifications {
          padding: 21px;
        }

        .nav-link.active,
        .nav-link:hover {
          background-color: #5a5a5a;
          cursor: pointer;
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

          // TODO: Fix animation issue
          .nav-wrapper:not(.expanded) {
            display: none;
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

          .nav-link.notifications {
            padding: 22px 25px;
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
          .nav-wrapper {
            width: ${navConstants.skinnyNavWidth}px;
          }

          nav > :global(*) {
            max-width: ${navConstants.skinnyNavWidth}px;
          }

          nav {
            grid-gap: 30px;
            transform: translateX(0%);
          }

          .nav-top {
            margin-top: 50px;
          }
        }

        @media (${navConstants.aboveDesktopNav}) {
          .disable-large-nav .nav-background {
            display: none;
          }
          .disable-large-nav .nav-wrapper {
            width: ${navConstants.skinnyNavWidth}px;
          }
          .disable-large-nav nav > :global(*) {
            max-width: ${navConstants.skinnyNavWidth}px;
          }
          .disable-large-nav nav {
            grid-gap: 30px;
            transform: translateX(0%);
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
          .nav-wrapper:not(.disable-large-nav) .nav-link.notifications {
            padding: 22px 25px;
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
