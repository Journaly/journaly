import React from 'react'

import { PostStatus, PostTopicFragmentFragment as PostTopicType, LanguageFragmentFragment as LanguageType } from '../../generated/graphql'
import { useTranslation } from '../../config/i18n'
import { formatLongDate } from '../../utils'

import theme from '../../theme'

type PostHeaderProps = {
  postTitle: string
  postStatus: PostStatus
  publishDate: string
  authorName: string
  postImage: string
  postTopics?: PostTopicType[]
  postLanguage?: LanguageType
  children?: React.ReactNode
}

const PostHeader: React.FC<PostHeaderProps> = ({
  children,
  postTitle,
  postStatus,
  authorName,
  publishDate,
  postImage,
  postTopics,
  postLanguage,
}) => {
  const { t } = useTranslation('post')
  return (
    <div className="post-header">
      <img src={postImage} alt={postTitle} />
      <div className="post-header-info" dir="auto">
        <h1>{postTitle}</h1>
        <p> &mdash; </p>
        <p>
          {t('postBy')} <em>{authorName}</em>
        </p>
        <p>{formatLongDate(publishDate)}</p>
      </div>
      <div className="language badge">{postLanguage?.name}</div>
      {postStatus === 'DRAFT' && <div className="draft badge">{t('draft')}</div>}
      <div className="topics-container">
        {postTopics?.map(({ topic }) => (
          <div className="topic-badge" key={topic.id}>{topic.name}</div>
        ))}
      </div>
      {children}
      <style jsx>{`
        .post-header {
          position: relative;
          grid-column: 1 / -1;
          text-align: center;
          color: white;
          margin-bottom: 40px;
        }

        .badge {
          position: absolute;

          line-height: 1;
          padding: 2px 5px;
          color: white;

          text-transform: uppercase;
          border: 2px solid white;
          border-radius: 4px;
          font-weight: bold;
          font-size: 12px;
        }

        .draft {
          top: 10px;
          right: 10px;
        }

        .language {
          top: 10px;
          left: 10px;
        }

        .topics-container {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translate(-50%);
          display: flex;
          flex: 1;
          width: 100%;
          justify-content: center;
          flex-wrap: wrap;
        }

        .topic-badge {
          line-height: 1;
          padding: 2px 5px;
          margin-right: 5px;
          color: white;

          text-transform: uppercase;
          border: 2px solid white;
          border-radius: 4px;
          font-weight: bold;
          font-size: 12px;
          margin-bottom: 5px;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: brightness(0.3);
        }

        .post-header-info {
          position: absolute;
          width: 90%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        h1 {
          font-size: 40px;
          line-height: 1.2;
          text-align: center;
          color: white;
          margin: 0;
        }

        p {
          font-size: 14px;
        }

        @media (min-width: ${theme.breakpoints.MD}) {
          h1 {
            font-size: 50px;
          }
          p {
            font-size: 16px;
          }
        }

        @media (min-width: ${theme.breakpoints.LG}) {
          h1 {
            font-size: 64px;
          }
        }
      `}</style>
    </div>
  )
}

export default PostHeader
