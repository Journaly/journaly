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
import Filters, { PostQueryVarsType } from '@/components/Dashboard/Filters'
import Pagination from '@/components/Pagination'

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
  const [postQueryVars, setPostQueryVars] = useState<PostQueryVarsType>({
    languages: [],
    topics: [],
    followedAuthors: false,
    needsFeedback: false,
    hasInteracted: false,
    search: '',
    savedPosts: false,
  })
  const { loading, data, error } = usePostsQuery({
    variables: {
      first: NUM_POSTS_PER_PAGE,
      skip: (currentPage - 1) * NUM_POSTS_PER_PAGE,
      status,
      authorId: currentUser.id,
      ...postQueryVars,
    },
  })

  const posts = (data?.posts?.posts as PostType[]) || []
  const count = data?.posts?.count || 0
  const showPosts = !loading && posts.length > 0
  const showPagination = count > NUM_POSTS_PER_PAGE
  const showEmptyState = !loading && posts.length === 0
  const pageTitle = t('pageTitle')

  const resetPagination = (): void => {
    // filter out page key to reset the url
    const newQuery = { ...router.query }
    delete newQuery.page
    router.push({ ...router, query: newQuery })
  }

  return (
    <div className="my-posts-container">
      <Filters
        currentUser={currentUser}
        resetPagination={resetPagination}
        postQueryVars={postQueryVars}
        setPostQueryVars={setPostQueryVars}
        topicAndLanguageOptions={{
          hasPosts: true,
          authoredOnly: true,
        }}
        showPostCount={false}
      />
      {error && (
        <div className="empty-state-container">
          <p>{t('errorLoadingPostsMessage')}</p>
        </div>
      )}

      {loading && <LoadingSpinner size={60} />}

      {showPosts && (
        <div className="my-posts">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          {showPagination && (
            <Pagination
              currentPage={currentPage}
              total={count}
              numPerPage={NUM_POSTS_PER_PAGE}
              title={pageTitle}
            />
          )}
        </div>
      )}

      {showEmptyState && (
        <div>
          {status === PostStatusType.Published ? (
            <Trans i18nKey="publishedEmptyState">
              <div className="empty-state-container">
                You have no published posts. You can either publish a draft or{' '}
                <TranslationLink href="/dashboard/new-post">create a new post</TranslationLink>.
              </div>
            </Trans>
          ) : (
            <div className="empty-state-container">
              {t(`${status === PostStatusType.Draft ? 'draft' : 'private'}EmptyState`)}
            </div>
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
          margin-top: 25px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 50px;
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

        :global(.pagination-wrapper) {
          margin: 40px 0;
        }

        .empty-state-container {
          max-width: 900px;
          margin: 20px auto;
          padding: 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: ${theme.colors.white};
          box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
        }

        h1 {
          text-align: center;
          font-weight: 700;
          font-size: 28px;
          margin-bottom: 20px;
        }

        p {
          margin-bottom: 35px;
        }
      `}</style>
    </div>
  )
}

export default MyPosts
