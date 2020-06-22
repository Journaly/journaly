import React from 'react'
import Link from 'next/link'
import { Post, processPost } from './postCardUtils'
import theme from '../../../theme'

type Props = {
  post: Post
}

const ProfilePostCard: React.FC<Props> = ({ post }) => {
  const { id, title, readTime, excerpt, displayImage, profileImage, authorName } = processPost(post)

  return (
    <>
      <Link href={`/post/${id}`}>
        <a className="post-card-container">
          <img className="post-image" src={displayImage} alt="" />

          <div className="post-card-details">
            <div className="preview">
              <h4>{title}</h4>
              <p className="preview-text">{excerpt}</p>
            </div>
            <div className="info">
              <img className="avatar" src={profileImage} alt="Author" />
              <p className="author">{authorName}</p>
            </div>
            likes, comments Aug 3 - {readTime} min. read Read post
          </div>
        </a>
      </Link>

      <style jsx>{`
        .post-card-container {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: ${theme.colors.white};
          width: 100%;
          border-radius: 5px;
          box-shadow: 0px 8px 10px #00000029;
          transition: all 150ms ease-in;
        }

        .post-card-container:hover {
          box-shadow: 0px 8px 12px #00000029;
          transform: translateY(-2px);
        }

        .post-image {
          border-radius: 5px 5px 0 0;
          width: 100px;
          height: 175px;
          object-fit: cover;
        }

        .post-card-details {
          padding: 30px;
        }
        h4.post-card-details {
          font-weight: 700;
        }
        .info {
          display: flex;
          align-items: center;
        }
        .author {
          font-size: 14px;
          line-height: 1;
        }

        .avatar {
          width: 27px;
          height: 27px;
          margin-right: 10px;
          border-radius: 50%;
          object-fit: cover;
        }
      `}</style>
    </>
  )
}

export default ProfilePostCard
