import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import _ from 'lodash'

import { useTranslation } from '@/config/i18n'

import PostCard from '../PostCard'
import Pagination from '@/components/Pagination'
import {
  User as UserType,
  usePostsQuery,
  PostCardFragmentFragment,
  PostStatus,
} from '@/generated/graphql'
import LoadingWrapper from '@/components/LoadingWrapper'
import FeedHeader from './FeedHeader'
import Filters from '../Filters'
import { PostQueryVarsType } from '../Filters'

const NUM_POSTS_PER_PAGE = 9

type Props = {
  currentUser: UserType
  initialSearchFilters: InitialSearchFilters | null
}

export type InitialSearchFilters = {
  languages: number[]
  topics: number[]
  needsFeedback: boolean
  hasInteracted: boolean
}

const MyFeed: React.FC<Props> = ({ currentUser, initialSearchFilters }) => {
  const { t } = useTranslation('my-feed')

  /**
   * Pagination handling
   */
  // Pull query params off the router instance
  const router = useRouter()

  useEffect(() => {
    if (router.query['email-verification'] === 'success') {
      toast.success("You're email address has been verified!")
    }
  }, [])

  const currentPage = router.query.page ? Math.max(1, parseInt(router.query.page as string, 10)) : 1

  const [postQueryVars, setPostQueryVars] = useState<PostQueryVarsType>({
    languages: initialSearchFilters?.languages || [],
    topics: initialSearchFilters?.topics || [],
    followedAuthors: false,
    needsFeedback: initialSearchFilters?.needsFeedback || false,
    hasInteracted: initialSearchFilters?.hasInteracted || false,
    search: '',
    savedPosts: false,
  })

  // fetch posts for the feed!
  const { loading, error, data } = usePostsQuery({
    variables: {
      first: NUM_POSTS_PER_PAGE,
      skip: (currentPage - 1) * NUM_POSTS_PER_PAGE,
      status: PostStatus.Published,
      ...postQueryVars,
    },
  })

  const posts = data?.posts?.posts
  const count = data?.posts?.count || 0
  const showPagination = count > NUM_POSTS_PER_PAGE
  const pageTitle = t('pageTitle')

  const resetPagination = (): void => {
    // filter out page key to reset the url
    const newQuery = { ...router.query }
    delete newQuery.page
    router.push({ ...router, query: newQuery })
  }

  useEffect(() => {
    const searchFilters = {
      languages: postQueryVars.languages,
      topics: postQueryVars.topics,
      needsFeedback: postQueryVars.needsFeedback,
      hasInteracted: postQueryVars.hasInteracted,
    }
    document.cookie = `default_search_filters=${JSON.stringify(searchFilters)};`
  }, [postQueryVars])

  return (
    <div className="my-feed-wrapper">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <FeedHeader currentUser={currentUser} />
      <Filters
        currentUser={currentUser}
        resetPagination={resetPagination}
        postQueryVars={postQueryVars}
        setPostQueryVars={setPostQueryVars}
        topicAndLanguageOptions={{
          hasPosts: true,
          authoredOnly: false,
        }}
        showSavedPosts={true}
      />
      <LoadingWrapper loading={loading} error={error}>
        <div className="my-feed-container" data-testid="my-feed-container">
          {posts && posts.length > 0 ? (
            posts.map((post: PostCardFragmentFragment) => (
              <PostCard key={post.id} post={post} stacked avatar />
            ))
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
      `}</style>
    </div>
  )
}

export default MyFeed
