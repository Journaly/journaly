import React from 'react'
import {
  PostStatus as PostStatusType,
  Post as PostType,
  User as UserType,
  usePostsQuery,
} from '../../../generated/graphql'
import { useTranslation, Trans } from '../../../config/i18n'
import TranslationLink from '../../TranslationLink'
import LoadingSpinner from '../../Icons/LoadingSpinner'
import PostCard from '../PostCard'
import theme from '../../../theme'

type Props = {
  currentUser: UserType
  status: PostStatusType
}

const MyPosts: React.FC<Props> = ({ currentUser, status }) => {
  const { t } = useTranslation('my-posts')
  const { loading, data, error } = usePostsQuery({
    variables: {
      status,
      authorId: currentUser.id,
    },
  })

  let posts = (data?.posts as PostType[]) || []
  const showPosts = !loading && posts.length > 0
  const showEmptyState = !loading && posts.length === 0

  return (
    <div className="my-posts-container">
      {error && <p>There was an error retrieving your posts.</p>}

      {loading && <LoadingSpinner size={60} />}

      {showPosts && (
        <div className="my-posts">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} status={status} />
          ))}
        </div>
      )}

      {showEmptyState && (
        <div>
          {status === PostStatusType.Published ? (
            <Trans i18nKey="publishedEmptyState">
              You have no published posts. You can either publish a draft or{' '}
              <TranslationLink href="/dashboard/new-post">create a new post</TranslationLink>.
            </Trans>
          ) : (
            t('draftEmptyState')
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .my-posts {
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 50px;
          animation: 150ms fadeIn ease-in;
        }

        @media (min-width: ${theme.breakpoints.SM}) {
          .my-posts {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (min-width: ${theme.breakpoints.MD}) {
          .my-posts {
            grid-template-columns: 1fr;
          }

          .my-posts :global(.post-card-container) {
            max-width: 768px;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  )
}

export default MyPosts
