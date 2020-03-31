import React from 'react'
import Link from 'next/link'
import { brandBlack, darkBlue, darkGrey } from '../../../utils'

const Nav = () => {
  return (
    <nav>
      <div className="nav-top">
        <Link href="/profile">
          <a>
            <img className="profile-img" src="/images/robin-small.png" />
            <p className="current-user-name">Robin MacPherson</p>
          </a>
        </Link>
      </div>

      <div className="nav-bottom">
        <Link href="/">
          <a className="nav-link">
            <img src="../images/icons/your-feed-icon.svg" alt="" />
            <span className="nav-link-text">My Feed</span>
          </a>
        </Link>
        <Link href="/your-posts">
          <a className="nav-link">
            <img src="../images/icons/your-feed-icon.svg" alt="" />
            <span className="nav-link-text">My Posts</span>
          </a>
        </Link>
        <Link href="/new-post">
          <a className="nav-link">
            <img src="../images/icons/new-post-icon.svg" alt="" />
            <span className="nav-link-text">New Post</span>
          </a>
        </Link>
        <Link href="/drafts">
          <a className="nav-link">
            <img src="../images/icons/drafts-icon.svg" alt="" />
            <span className="nav-link-text">Drafts</span>
          </a>
        </Link>

        <hr />

        <Link href="/settings">
          <a className="nav-link">
            <img src="../images/icons/settings-icon.svg" alt="" />
            <span className="nav-link-text">Settings</span>
          </a>
        </Link>
        <Link href="/">
          <a className="log-out nav-link">
            <img src="../images/icons/logout-icon.svg" alt="Log out" />
            <span className="nav-link-text">Log Out</span>
          </a>
        </Link>
      </div>
      <h1>
        <Link href="/">
          <a className="nav-logo">
            J<span>ournaly</span>
          </a>
        </Link>
      </h1>
      <style jsx>{`
        nav {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-color: black;
          background-size: contain;
          width: 230px;
          height: 100vh;
          padding-bottom: 20px;
        }

        .nav-top a {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        .nav-top .profile-img {
          margin-top: 50px;
          margin-bottom: 10px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: ${darkBlue};
          object-fit: cover;
        }

        .nav-top p {
          margin: 5px 0 25px;
          width: 100%;
          text-align: center;
          color: white;
          font-size: 16px;
        }

        .nav-bottom {
          display: flex;
          flex-direction: column;
          padding-left: 25px;
        }

        .nav-bottom hr {
          width: 140px;
          border: 1px solid white;
          margin: 0;
        }

        .nav-link {
          display: flex;
          align-items: center;
          color: white;
          font-size: 16px;
          padding: 25px 0;
        }

        .nav-link:hover {
          background-color: ${darkGrey};
        }

        .nav-link img {
          width: 25px;
          margin-right: 15px;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin-right: 15px;
          font-size: 24px;
          color: white;
        }

        .logo a {
          color: ${brandBlack};
        }
      `}</style>
    </nav>
  )
}

export default Nav
