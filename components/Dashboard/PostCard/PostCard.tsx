import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { useTranslation } from '../../../config/i18n'
import { formatShortDate } from '../../../utils/date'
import {
  PostStatus as PostStatusType,
  PostCardFragmentFragment as PostCardType,
} from '../../../generated/graphql'
import LineClamp from '../../../elements/LineClamp'
import LikeIcon from '../../Icons/LikeIcon'
import CommentIcon from '../../Icons/CommentIcon'
import theme from '../../../theme'
import BlankAvatarIcon from '../../Icons/BlankAvatarIcon'

type Props = {
  post: PostCardType
  status?: PostStatusType
  avatar?: boolean
  stacked?: boolean
}

const postBorderRadius = '5px'

const PostCard: React.FC<Props> = ({
  post,
  status = PostStatusType.Published,
  avatar = false,
  stacked = false,
}) => {
  const { t } = useTranslation('post')
  const {
    id,
    title,
    excerpt,
    readTime,
    images,
    likes,
    commentCount,
    author: { handle, name, profileImage },
    createdAt,
    publishedAt,
    language: { name: languageName },
  } = post
  const isDraft = status === PostStatusType.Draft
  const isPublished = status === PostStatusType.Published
  const displayImage = images.length ? images[0].smallSize : '/images/samples/sample-post-img.jpg'
  const imageAlt = images.length === 0 ? 'Typewriter on an old wooden desk' : ''
  const postCardStyles = classNames('post-card-container', { stacked })

  return (
    <>
      <Link href={'/post/[id]'} as={`/post/${id}`}>
        <a className={postCardStyles}>
          <img className="post-image" src={displayImage} alt={imageAlt} />

          <div className="post-card-details">
            <div className="post-text" dir="auto">
              <h1 className="post-title">
                <LineClamp lines={1} text={title} />
              </h1>
              <p className="post-excerpt">
                <LineClamp lines={2} text={excerpt} />
              </p>
            </div>

            <div className="post-avatar-and-data">
              {avatar && (
                <div>
                  <div className="post-avatar">
                    {profileImage ? (
                      <img className="profile-image" src={profileImage} alt="" />
                    ) : (
                      <BlankAvatarIcon size={27} />
                    )}

                    <p className="author">{handle || name}</p>
                  </div>
                  <p className="post-language">{languageName}</p>
                </div>
              )}

              <div className="post-data">
                {isPublished && (
                  <div className="post-stats">
                    <div className="post-stat">
                      <LikeIcon />
                      <span>{likes.length}</span>
                    </div>
                    <div className="post-stat">
                      <CommentIcon />
                      <span>{commentCount}</span>
                    </div>
                  </div>
                )}

                <div className="post-subtext">
                  {formatShortDate(publishedAt || createdAt)} -{' '}
                  {t('readTime', { minutes: readTime || 1 })}
                </div>
              </div>
            </div>

            {!avatar && (
              <p className="post-action">{isDraft ? t('finishAction') : t('readAction')}</p>
            )}
          </div>
        </a>
      </Link>

      <style jsx>{`
        .post-card-container {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          background-color: ${theme.colors.white};
          width: 100%;
          border-radius: ${postBorderRadius};
          box-shadow: 0px 8px 10px #00000029;
          transition: all 150ms ease-in;
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .post-card-container:not(.stacked) {
            flex-direction: row;
            justify-content: center;
            align-items: stretch;
            padding: 15px;
          }
        }

        .post-card-container:hover {
          box-shadow: 0px 8px 12px #00000029;
          transform: translateY(-2px);
        }

        .post-image {
          width: 100%;
          height: 225px;
          object-fit: cover;
          border-top-right-radius: ${postBorderRadius};
          border-top-left-radius: ${postBorderRadius};
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          :not(.stacked) .post-image {
            width: 125px;
            height: 125px;
            align-self: center;
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
          min-width: 190px;
          padding: 12px;
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          :not(.stacked) .post-card-details {
            padding: 0;
            height: auto;
          }
        }

        .post-title {
          margin: 5px 0;
          ${theme.typography.headingLG};
        }

        .post-avatar-and-data {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 24px;
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .post-avatar-and-data:not(.stacked) {
            margin-top: 14px;
          }
        }

        .stacked .post-avatar-and-data {
          margin-top: 24px;
        }

        .post-avatar {
          display: flex;
          align-items: center;
          margin-bottom: 4px;
        }

        .post-avatar > :global(*) {
          border-radius: 50%;
          margin-right: 12px;
        }

        .post-avatar :global(svg) {
          background-color: ${theme.colors.blueLight};
        }

        .profile-image {
          width: 27px;
          height: 27px;
          object-fit: cover;
        }

        .author {
          font-size: 14px;
        }

        .post-language {
          line-height: 1;
          padding: 2px 5px;
          color: ${theme.colors.charcoal};

          text-transform: uppercase;
          border: 2px solid ${theme.colors.charcoal};
          border-radius: 4px;
          font-weight: 600;
          font-size: 12px;
          display: inline-block;
        }

        .post-stats {
          display: flex;
          align-items: center;
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
          white-space: nowrap;
        }

        .post-action {
          display: none;
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          :not(.stacked) .post-action {
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
