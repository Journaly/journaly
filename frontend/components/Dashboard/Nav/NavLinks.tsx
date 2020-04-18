import React from 'react'
import Link from 'next/link'
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
        <Link href="/dashboard/my-feed">
          <a className="nav-link" onClick={onClick}>
            <img src="../images/icons/your-feed-icon.svg" alt="" />
            <span className="nav-link-text">{t('nav.myFeed')}</span>
          </a>
        </Link>
        <Link href="/dashboard/my-posts">
          <a className="nav-link" onClick={onClick}>
            <img src="../images/icons/your-feed-icon.svg" alt="" />
            <span className="nav-link-text">{t('nav.myPosts')}</span>
          </a>
        </Link>
        <Link href="/dashboard/new-post">
          <a className="nav-link" onClick={onClick}>
            <img src="../images/icons/new-post-icon.svg" alt="" />
            <span className="nav-link-text">{t('nav.newPost')}</span>
          </a>
        </Link>
        <Link href="/dashboard/drafts">
          <a className="nav-link" onClick={onClick}>
            <img src="../images/icons/drafts-icon.svg" alt="" />
            <span className="nav-link-text">{t('nav.drafts')}</span>
          </a>
        </Link>

        <hr />

        <Link href="/dashboard/settings">
          <a className="nav-link" onClick={onClick}>
            <img src="../images/icons/settings-icon.svg" alt="" />
            <span className="nav-link-text">{t('nav.settings')}</span>
          </a>
        </Link>

        <Link href="/">
          <a className="log-out nav-link" onClick={handleLogOut}>
            <img src="../images/icons/logout-icon.svg" alt="Log out" />
            <span className="nav-link-text">{t('nav.logOut')}</span>
          </a>
        </Link>
      </div>
      <style jsx>{`
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
          animation: fadeIn 300ms linear;
        }

        @media (${navConstants.mobileNavOnly}) {
          .current-user-name {
            display: block;
            width: 100%;
            margin-top: 15px;
            font-size: 16px;
            text-align: center;
            color: white;
            animation: fadeIn 300ms linear;
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
          justify-content: center;
          align-items: center;
          height: 70px;
          font-size: 16px;
          color: white;
        }

        :global(.expanded) .nav-link {
          flex-direction: row;
          height: auto;
          padding: 25px;
          animation: fadeIn 300ms linear;
        }

        @media (${navConstants.mobileNavOnly}) {
          .nav-link {
            flex-direction: row;
            height: auto;
            padding: 25px;
            animation: fadeIn 300ms linear;
          }
        }

        .nav-link:hover {
          background-color: ${darkGrey};
        }

        .nav-link img {
          width: 25px;
          margin-right: 0;
        }

        :global(.expanded) .nav-link img {
          margin-right: 15px;
        }
        @media (${navConstants.mobileNavOnly}) {
          .nav-link img {
            margin-right: 15px;
          }
        }

        .nav-link-text {
          font-size: 10px;
        }

        :global(.expanded) .nav-link-text {
          font-size: 16px;
        }
        @media (${navConstants.mobileNavOnly}) {
          .nav-link-text {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  )
}

export default NavLinks
