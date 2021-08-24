import React, { useState } from 'react'
import { useRouter } from 'next/router'
import {
  PostStatus as PostStatusType,
  Post as PostType,
  User as UserType,
  usePostsQuery,
} from '@/generated/graphql'
import { useTranslation, Trans } from '@/config/i18n'
import TranslationLink from '@/components/TranslationLink'
import LoadingSpinner from '@/components/Icons/LoadingSpinner'
import PostCard from '../PostCard'
import theme from '@/theme'
import Filters, { PostQueryVarsType } from '../Filters'

const NUM_POSTS_PER_PAGE = 10

type Props = {
  currentUser: UserType
  status: PostStatusType
}

const MyPosts: React.FC<Props> = ({ currentUser, status }) => {
  const { t } = useTranslation('my-posts')
  /**
   * Pagination handling
   */
  // Pull query params off the router instance
  const router = useRouter()
  const currentPage = router.query.page ? Math.max(1, parseInt(router.query.page as string, 10)) : 1
  const [postQueryVars, setPostQueryVars] = useState<PostQueryVarsType>()
  const { loading, data, error } = usePostsQuery({
    variables: {
      first: NUM_POSTS_PER_PAGE,
      skip: (currentPage - 1) * NUM_POSTS_PER_PAGE,
      status,
      authoredOnly: true,
      ...postQueryVars,
    },
  })

  const posts = (data?.posts?.posts as PostType[]) || []
  const showPosts = !loading && posts.length > 0
  const showEmptyState = !loading && posts.length === 0

  return (
    <div className="my-posts-container">
      <Filters
        currentUser={currentUser}
        initialSearchFilters={null}
        resetPagination={() => {}}
        setPostQueryVars={setPostQueryVars}
      />
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
            /* Ensure both columns have equal width */
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (min-width: ${theme.breakpoints.MD}) {
          .my-posts {
            grid-template-columns: 1fr;
          }

          .my-posts :global(.post-card-container) {
            width: 768px;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  )
}

export default MyPosts
