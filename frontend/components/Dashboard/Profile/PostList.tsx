import React from 'react'
import { useTranslation } from '../../../config/i18n'
import { layoutLeftRightPadding } from '../../Dashboard/dashboardConstants'
import { Post as PostType } from '../../../generated/graphql'
import PostCard from '../PostCard/PostCard'
import theme from '../../../theme'

type Props = {
  posts: PostType[]
}

const PostList: React.FC<Props> = ({ posts }) => {
  const { t } = useTranslation(['profile'])

  return (
    <div className="post-list">
      <h1 className="posts-title">{t('postsTitle')}</h1>

      {posts && posts.map((post) => <PostCard key={post.id} post={post} />)}

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

        .post-list :global(.post-card-container) {
          margin-bottom: 50px;
        }
        .post-list :global(.post-card-container:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  )
}

export default PostList
