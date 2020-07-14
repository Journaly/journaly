import React from 'react'
import { useTranslation } from '../../../config/i18n'
import { layoutTopBottomPadding, layoutLeftRightPadding } from '../../Dashboard/dashboardConstants'
import {
  usePostsQuery,
  Post as PostType,
  PostStatus as PostStatusType,
} from '../../../generated/graphql'
import PostCard from '../PostCard'
import theme from '../../../theme'
import LoadingSpinner from '../../Icons/LoadingSpinner'

type Props = {
  currentUserId: number
}

const PostList: React.FC<Props> = ({ currentUserId }) => {
  const { t } = useTranslation(['profile'])
  const { loading, data, error } = usePostsQuery({
    variables: {
      status: PostStatusType.Published,
      authorId: currentUserId,
    },
  })

  const posts = (data?.posts as PostType[]) || []

  return (
    <div className="post-list">
      <h1 className="posts-title">{t('postsTitle')}</h1>

      {error && <p>There was an error retrieving your posts.</p>}

      {loading ? (
        <LoadingSpinner size={60} />
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}

      <style jsx>{`
        .post-list {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 ${layoutLeftRightPadding} ${layoutTopBottomPadding};
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
