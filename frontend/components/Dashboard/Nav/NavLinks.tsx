import React from 'react'
import Link from 'next/link'
import NavLink from '../../NavLink'
import FeedIcon from '../../Icons/FeedIcon'
import BlankAvatarIcon from '../../Icons/BlankAvatarIcon'
import { navConstants } from './nav-constants'
import { Router, useTranslation } from '../../../config/i18n'
import { useLogoutMutation, User as UserType } from '../../../generated/graphql'
import theme from '../../../theme'

interface Props {
  onClick: () => void
  currentUser: UserType
}

const NavLinks: React.FC<Props> = ({ onClick, currentUser }) => {
  const { t } = useTranslation()
  const [logout] = useLogoutMutation()
  const handleLogOut = (): void => {
    onClick()
    logout()
    Router.push('/')
  }

  return (
    <>
      <div className="nav-top">
        <Link href="/dashboard/profile">
          <a onClick={onClick} className="profile-image">
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
          <a className="nav-link" onClick={onClick}>
            <FeedIcon aria-hidden="true" />
            <span className="nav-link-text">{t('nav.myFeed')}</span>
          </a>
        </NavLink>
        <NavLink href="/dashboard/my-posts">
          <a className="nav-link" onClick={onClick}>
            <FeedIcon aria-hidden="true" />
            <span className="nav-link-text">{t('nav.myPosts')}</span>
          </a>
        </NavLink>
        <NavLink href="/dashboard/new-post">
          <a className="nav-link" onClick={onClick}>
            <img src="/images/icons/new-post-icon.svg" alt="" />
            <span className="nav-link-text">{t('nav.newPost')}</span>
          </a>
        </NavLink>

        <hr />

        <NavLink href="/dashboard/settings/profile">
          <a className="nav-link" onClick={onClick}>
            <img src="/images/icons/settings-icon.svg" alt="" />
            <span className="nav-link-text">{t('nav.settings')}</span>
          </a>
        </NavLink>

        <Link href="/">
          <a className="log-out nav-link" onClick={handleLogOut}>
            <img src="/images/icons/logout-icon.svg" alt="Log out" />
            <span className="nav-link-text">{t('nav.logOut')}</span>
          </a>
        </Link>
      </div>
      <style jsx>{`
        /*
          Note:

          Default styles are for the skinny nav, which appears between mobile and desktop.

          For mobile and desktop, duplicated styles are required
          in both :global(.expanded) *  { ... } and the mobile nav media query.

          This is because certain pages, like settings, default to the skinny
          nav, even on desktop.

          The reverse (default styles for the expanded nav, and overrides with the
          skinny nav media query) results in the same situation, since we'd need to
          duplicate styles in the desktop media query to keep the skinny nav on the
          settings page.
        */

        .nav-top {
          margin-top: 30px;
        }
        @media (min-width: ${theme.breakpoints.XS}) {
          .nav-top {
            margin-top: 50px;
          }
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

        :global(.expanded) .current-user-name {
          display: block;
          width: 100%;
          margin-top: 15px;
          font-size: 16px;
          text-align: center;
          color: ${theme.colors.white};
        }

        @media (${navConstants.mobileNavOnly}) {
          .current-user-name {
            display: block;
            width: 100%;
            margin-top: 15px;
            font-size: 16px;
            text-align: center;
            color: ${theme.colors.white};
          }
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

        :global(.expanded) .nav-bottom hr {
          width: 180px;
          margin: 20px auto;
        }

        @media (${navConstants.mobileNavOnly}) {
          .nav-bottom hr {
            width: 180px;
            margin: 20px auto;
          }
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

        :global(.expanded) .nav-link {
          flex-direction: row;
          justify-content: normal;
          height: auto;
          padding: 25px;
        }

        @media (${navConstants.mobileNavOnly}) {
          .nav-link {
            flex-direction: row;
            justify-content: normal;
            height: auto;
            padding: 25px;
          }
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

        :global(.expanded) .nav-link-text {
          margin-left: 15px;
          font-size: 16px;
        }
        @media (${navConstants.mobileNavOnly}) {
          .nav-link-text {
            margin-left: 15px;
            font-size: 16px;
          }
        }
      `}</style>
    </>
  )
}

export default NavLinks
