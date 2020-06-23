import React from 'react'
import Link from 'next/link'
import { useTranslation } from '../../../config/i18n'
import { Post, processPost } from './postCardUtils'
import theme from '../../../theme'

type Props = {
  post: Post
}

const ProfilePostCard: React.FC<Props> = ({ post }) => {
  const { t } = useTranslation('posts')
  const { id, title, readTime, excerpt, displayImage, likes, numThreads } = processPost(post)

  return (
    <>
      <Link href={`/post/${id}`}>
        <a className="post-card-container">
          <img className="post-image" src={displayImage} alt="" />

          <div className="post-card-details">
            <h1 className="post-title">{title}</h1>
            <p className="preview-text">{excerpt}</p>
            <div className="post-stats">
              heart - {likes}, comment - {numThreads}
            </div>
            <div className="post-subtext">Aug 3 - {readTime} min. read</div>
            <p className="read-post">{t('readLink')}</p>
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
        @media (min-width: ${theme.breakpoints.MD}) {
          .post-card-container {
            padding: 15px;
          }
        }

        .post-card-container:hover {
          box-shadow: 0px 8px 12px #00000029;
          transform: translateY(-2px);
        }

        .post-image {
          width: 125px;
          height: 125px;
          margin-right: 30px;
          object-fit: cover;
        }

        .post-card-details {
          position: relative;
          flex-grow: 1;
          height: 100%;
        }

        .post-title {
          ${theme.typography.headingLG};
        }

        .post-stats {
          font-size: 14px;
          color: ${theme.colors.blueLight};
        }

        .post-subtext {
          ${theme.typography.paragraphSM};
          color: #95989a;
        }

        .read-post {
          position: absolute;
          bottom: 0;
          right: 0;
          ${theme.typography.paragraphSM};
          color: ${theme.colors.blue};
          text-transform: uppercase;
        }
      `}</style>
    </>
  )
}

export default ProfilePostCard
