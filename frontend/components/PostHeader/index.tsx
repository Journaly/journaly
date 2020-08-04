import React from 'react'
import { PostStatus } from '../../generated/graphql'
import { useTranslation } from '../../config/i18n'

type PostHeaderProps = {
  postTitle: string
  postStatus: PostStatus
}

const PostHeader: React.FC<PostHeaderProps> = ({ postTitle, postStatus }) => {
  const { t } = useTranslation('post')
  return (
    <div className="post-header">
      <img src="/images/samples/sample-post-img.jpg" alt={postTitle} />
      <h1>{postTitle}</h1>
      {postStatus === 'DRAFT' && <div className="draft-badge">{t('draft')}</div>}
      <style jsx>{`
        .post-header {
          position: relative;
          grid-column: 1 / -1;
          text-align: center;
          color: white;
          margin-bottom: 40px;
        }

        .draft-badge {
          position: absolute;
          top: 10px;
          right: 10px;

          line-height: 1;
          padding: 2px 5px;
          color: white;

          text-transform: uppercase;
          border: 2px solid white;
          border-radius: 4px;
          font-weight: bold;
          font-size: 12px;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: brightness(0.3);
        }

        h1 {
          position: absolute;
          font-size: 64px;
          line-height: 1.2;
          text-align: center;
          color: white;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          margin: 0;
        }
      `}</style>
    </div>
  )
}

export default PostHeader
