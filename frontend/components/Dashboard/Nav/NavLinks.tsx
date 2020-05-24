import React from 'react'
import Link from 'next/link'
import NavLink from '../../NavLink'
import FeedIcon from '../../Icons/FeedIcon'
import { navConstants } from './nav-constants'
import { darkBlue, darkGrey } from '../../../utils'
import { useTranslation } from '../../../config/i18n'

interface Props {
  onClick: () => void
}

const NavLinks: React.FC<Props> = ({ onClick }) => {
  const { t } = useTranslation()
  // TODO: implement fetching user information (requires PR #17)
  const user = {}
  if (!user) return null
  const logout = (): void => {
    // TODO: implement logout functionality (requires PR #17)
  }
  const handleLogOut = (): void => {
    onClick()
    logout()
  }

  return (
    <>
      <div className="nav-top">
        <Link href="/dashboard/profile">
          <a onClick={onClick}>
            <img className="profile-img" src="/images/robin-small.png" />
            <p className="current-user-name">Robin MacPherson</p>
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
        <NavLink href="/dashboard/drafts">
          <a className="nav-link" onClick={onClick}>
            <img src="/images/icons/drafts-icon.svg" alt="" />
            <span className="nav-link-text">{t('nav.drafts')}</span>
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
          margin-top: 50px;
          margin-bottom: 50px;
        }

        :global(.expanded) .nav-top {
          margin-bottom: 25px;
        }
        @media (${navConstants.mobileNavOnly}) {
          .nav-top {
            margin-bottom: 25px;
          }
        }

        .nav-top a {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        .profile-img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: ${darkBlue};
          object-fit: cover;
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
          color: white;
          animation: fadeIn ${navConstants.transitionDuration}ms linear;
        }

        @media (${navConstants.mobileNavOnly}) {
          .current-user-name {
            display: block;
            width: 100%;
            margin-top: 15px;
            font-size: 16px;
            text-align: center;
            color: white;
            animation: fadeIn ${navConstants.transitionDuration}ms linear;
          }
        }

        .nav-bottom {
          display: flex;
          flex-direction: column;
          /* Expands the links to push the Journaly "J" logo down to the bottom */
          flex-grow: 2;
        }

        .nav-bottom hr {
          width: 40px;
          margin-top: 10px;
          margin-bottom: 10px;
          border: 1px solid white;
        }

        :global(.expanded) .nav-bottom hr {
          width: 180px;
          margin: 0 auto;
        }

        @media (${navConstants.mobileNavOnly}) {
          .nav-bottom hr {
            width: 180px;
            margin: 0 auto;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .nav-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 70px;
          font-size: 16px;
          color: white;
        }

        :global(.expanded) .nav-link {
          flex-direction: row;
          justify-content: normal;
          height: auto;
          padding: 25px;
          animation: fadeIn ${navConstants.transitionDuration}ms linear;
        }

        @media (${navConstants.mobileNavOnly}) {
          .nav-link {
            flex-direction: row;
            justify-content: normal;
            height: auto;
            padding: 25px;
            animation: fadeIn ${navConstants.transitionDuration}ms linear;
          }
        }

        .nav-link.active,
        .nav-link:hover {
          background-color: ${darkGrey};
        }

        .nav-link img {
          width: 25px;
        }

        .nav-link-text {
          margin-left: 0;
          font-size: 10px;
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
