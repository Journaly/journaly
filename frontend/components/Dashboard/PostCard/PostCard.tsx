import React from 'react'
import Link from 'next/link'
import { useTranslation } from '../../../config/i18n'
import { formatShortDate } from '../../../utils/date'
import { Post as PostType } from '../../../generated/graphql'
import LikeIcon from '../../Icons/LikeIcon'
import CommentIcon from '../../Icons/CommentIcon'
import theme from '../../../theme'

type Props = {
  post: PostType
  avatar?: boolean
}

const postBorderRadius = '5px'

const PostCard: React.FC<Props> = ({ post, avatar = false }) => {
  const { t } = useTranslation('posts')
  const {
    id,
    title,
    excerpt,
    readTime,
    images,
    likes,
    threads,
    author: { handle, name, profileImage },
    createdAt,
  } = post

  const displayImage = images.length ? images[0].smallSize : '/images/samples/sample-post-img.jpg'
  console.log(handle, name, profileImage, avatar)
  // const authorDisplayName = author.handle || author.name
  // const profileImage = author.profileImage

  return (
    <>
      <Link href={`/post/${id}`}>
        <a className="post-card-container">
          <img className="post-image" src={displayImage} alt="" />

          <div className="post-card-details">
            <div className="post-text">
              <h1 className="post-title">{title}</h1>
              <p className="post-excerpt">{excerpt}</p>
            </div>

            <div className="post-data">
              <div className="post-stats">
                <div className="post-stat">
                  <LikeIcon />
                  <span>{likes.length}</span>
                </div>
                <div className="post-stat">
                  <CommentIcon />
                  <span>{threads.length}</span>
                </div>
              </div>
              <div className="post-subtext">
                {formatShortDate(createdAt)} - {t('readTime', { minutes: readTime })}
              </div>
            </div>
            <p className="read-post">{t('readLink')}</p>
          </div>
        </a>
      </Link>

      <style jsx>{`
        .post-card-container {
          display: flex;
          flex-direction: column;
          background-color: ${theme.colors.white};
          width: 100%;
          border-radius: ${postBorderRadius};
          box-shadow: 0px 8px 10px #00000029;
          transition: all 150ms ease-in;
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .post-card-container {
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 15px;
          }
        }

        .post-card-container:hover {
          box-shadow: 0px 8px 12px #00000029;
          transform: translateY(-2px);
        }

        .post-image {
          width: 100%;
          height: 125px;
          object-fit: cover;
          border-top-right-radius: ${postBorderRadius};
          border-top-left-radius: ${postBorderRadius};
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .post-image {
            width: 125px;
            margin-right: 30px;
            border-radius: 0;
          }
        }

        .post-card-details {
          position: relative;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          padding: 12px;
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .post-card-details {
            padding: 0;
          }
        }

        .post-title {
          margin: 5px 0;
          ${theme.typography.headingLG};
        }

        .post-stats {
          display: flex;
          align-items: center;
          margin-top: 14px;
          font-size: 14px;
          line-height: 1;
          color: ${theme.colors.blueLight};
        }

        .post-stat {
          display: flex;
          align-items: center;
        }

        .post-stat span {
          margin-left: 10px;
        }

        .post-stat:first-child {
          margin-right: 20px;
        }

        .post-subtext {
          ${theme.typography.paragraphSM};
          color: #95989a;
        }

        .read-post {
          display: none;
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .read-post {
            position: absolute;
            bottom: 0;
            right: 0;
            display: block;
            ${theme.typography.paragraphSM};
            color: ${theme.colors.blue};
            text-transform: uppercase;
          }
        }
      `}</style>
    </>
  )
}

export default PostCard
