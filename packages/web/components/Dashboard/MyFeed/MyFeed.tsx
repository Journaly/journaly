import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import _ from 'lodash'

import { useTranslation } from '@/config/i18n'

import PostCard from '../PostCard'
import Pagination from '@/components/Pagination'
import { User as UserType, useFeedQuery } from '@/generated/graphql'
import LoadingWrapper from '@/components/LoadingWrapper'
import FeedHeader from './FeedHeader'
import Filters from '../Filters'
import { PostQueryVarsType } from '../Filters'

const NUM_POSTS_PER_PAGE = 9

export type InitialSearchFilters = {
  languages: number[]
  topics: number[]
  needsFeedback: boolean
  hasInteracted: boolean
}

type Props = {
  currentUser: UserType
  initialSearchFilters: InitialSearchFilters | null
}

const MyFeed: React.FC<Props> = ({ currentUser, initialSearchFilters }) => {
  const { t } = useTranslation('my-feed')

  /**
   * Pagination handling
   */
  // Pull query params off the router instance
  const router = useRouter()
  const currentPage = router.query.page ? Math.max(1, parseInt(router.query.page as string, 10)) : 1

  const [postQueryVars, setPostQueryVars] = useState<PostQueryVarsType>()

  // fetch posts for the feed!
  const { loading, error, data } = useFeedQuery({
    variables: {
      first: NUM_POSTS_PER_PAGE,
      skip: (currentPage - 1) * NUM_POSTS_PER_PAGE,
      ...postQueryVars,
    },
  })

  const posts = data?.feed?.posts
  const count = data?.feed?.count || 0
  const showPagination = count > NUM_POSTS_PER_PAGE
  const pageTitle = t('pageTitle')

  const resetPagination = (): void => {
    // filter out page key to reset the url
    const newQuery = { ...router.query }
    delete newQuery.page
    router.push({ ...router, query: newQuery })
  }

  return (
    <div className="my-feed-wrapper">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <FeedHeader currentUser={currentUser} />
      <Filters
        currentUser={currentUser}
        initialSearchFilters={initialSearchFilters}
        resetPagination={resetPagination}
        postQueryVars={postQueryVars}
        setPostQueryVars={setPostQueryVars}
      />
      <LoadingWrapper loading={loading} error={error}>
        <div className="my-feed-container" data-testid="my-feed-container">
          {posts && posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} post={post} stacked avatar />)
          ) : (
            <p>{t('noPostsMessage')}</p>
          )}
        </div>

        {showPagination && (
          <Pagination
            currentPage={currentPage}
            total={count}
            numPerPage={NUM_POSTS_PER_PAGE}
            title={pageTitle}
          />
        )}
      </LoadingWrapper>

      <style jsx>{`
        .my-feed-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .my-feed-search {
          width: 100%;
          max-width: 700px;
        }

        .my-feed-search input {
          border-radius: 5px;
          height: 50px;
          box-shadow: 0px 8px 10px #00000029;
          font-size: 16px;
          background: white;
          padding: 10px;
          width: 100%;
        }

        .my-feed-select {
          display: grid;
          grid-gap: 20px;
          grid-template-columns: repeat(auto-fit);
        }

        .my-feed-container {
          display: grid;
          grid-gap: 20px;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          justify-items: center;
          width: 100%;
          margin-top: 50px;
        }
        @media (min-width: 1600px) {
          .my-feed-container {
            grid-template-columns: repeat(3, 400px);
            grid-gap: 40px;
            justify-content: center;
          }
        }

        .my-feed-container :global(.post-card-container) {
          max-width: 400px;
        }

        :global(.pagination-wrapper) {
          margin: 40px 0;
        }

        .filter-actions {
          text-align: center;
        }
        .filter-actions > :global(button) {
          margin-right: 10px;
        }

        .filter-actions > :global(.filter-action-btn):hover {
          font-weight: 600;
        }
        .filter-actions > :global(.filter-action-btn.active) {
          font-weight: 600;
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}

export default MyFeed
