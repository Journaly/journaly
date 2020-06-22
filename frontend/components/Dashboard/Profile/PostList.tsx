import React from 'react'
import { useTranslation } from '../../../config/i18n'
import { layoutLeftRightPadding } from '../../Dashboard/dashboardConstants'
import theme from '../../../theme'

const PostList: React.FC = () => {
  const { t } = useTranslation(['profile', 'posts'])
  const posts = ['post1', 'post2', 'post3']

  return (
    <div className="post-list">
      <h1 className="posts-title">{t('postsTitle')}</h1>

      {posts.map((post, i) => {
        return (
          <div key={i} className="post">
            {post}
          </div>
        )
      })}

      <style jsx>{`
        .post-list {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 ${layoutLeftRightPadding};
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .post-list {
            padding: 25px;
            border-top: 0;
          }
        }

        .posts-title {
          margin: 40px 0;
          ${theme.typography.headingLG};
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .posts-title {
            display: none;
          }
        }

        .post {
          width: 100%;
          margin-bottom: 50px;
          padding: 40px;
          box-shadow: 0px 8px 10px #00000029;
          transition: all 150ms ease-in;
        }

        .post:hover {
          box-shadow: 0px 8px 12px #00000029;
          transform: translateY(-2px);
        }
        .post:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  )
}

export default PostList
