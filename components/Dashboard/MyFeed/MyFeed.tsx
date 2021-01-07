import React, { useCallback, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import _ from 'lodash'

import { useTranslation } from '@/config/i18n'

import PostCard from '../PostCard'
import Pagination from '@/components/Pagination'
import {
  User as UserType,
  useFeedQuery,
  useLanguagesQuery,
  useTopicsQuery,
} from '@/generated/graphql'
import LoadingWrapper from '@/components/LoadingWrapper'
import Button, { ButtonVariant } from '@/elements/Button'
import useToggle from '@/hooks/useToggle'
import SearchInput from './SearchInput'
import LanguageSelect from './LanguageSelect'
import useUILanguage from '@/hooks/useUILanguage'
import TopicSelect from './TopicSelect'
import FeedHeader from './FeedHeader'

const NUM_POSTS_PER_PAGE = 9

type Props = {
  currentUser: UserType
}

const MyFeed: React.FC<Props> = ({ currentUser }) => {
  const { t } = useTranslation('my-feed')

  const [search, setSearchState] = useState('')
  const [selectedTopicsFilters, setSelectedTopicsFilters] = useState<number[]>([])

  // Fetch languages that have at least 1 post
  const { data: languagesData } = useLanguagesQuery({
    variables: {
      hasPosts: true,
      topics: selectedTopicsFilters,
    },
  })

  const languageOptionIds = new Set((languagesData?.languages || []).map(({ id }) => id))
  const userLanguages: Set<number> = new Set(
    currentUser.languages
      ?.filter((lr) => languageOptionIds.has(lr.language.id))
      .map((lr) => lr.language.id) || [],
  )

  const [selectedLanguageFilters, setSelectedLanguageFilters] = useState<number[]>([
    ...userLanguages.values(),
  ])

  const isUserLanguagesFilterActive = _.isEqual(
    Array.from(userLanguages.values()),
    selectedLanguageFilters,
  )

  const [followedAuthorsFilter, toggleFollowedAuthorsFilter] = useToggle()

  const uiLanguage = useUILanguage()
  const { data: { topics } = {} } = useTopicsQuery({
    variables: { uiLanguage, hasPosts: true, languages: selectedLanguageFilters },
  })

  /**
   * Pagination handling
   */
  // Pull query params off the router instance
  const router = useRouter()
  const currentPage = router.query.page ? Math.max(1, parseInt(router.query.page as string, 10)) : 1

  // fetch posts for the feed!
  const { loading, error, data } = useFeedQuery({
    variables: {
      first: NUM_POSTS_PER_PAGE,
      skip: (currentPage - 1) * NUM_POSTS_PER_PAGE,
      languages: selectedLanguageFilters.length ? selectedLanguageFilters : null,
      followedAuthors: followedAuthorsFilter,
      search: search,
      topics: selectedTopicsFilters,
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

  const onSearchChange = useCallback((val): void => setSearchState(val), [])

  const onTopicAdd = useCallback(
    (id: number): void => {
      setSelectedTopicsFilters([...selectedTopicsFilters, id])
      resetPagination()
    },
    [selectedTopicsFilters],
  )

  const onTopicRemove = useCallback(
    (id: number): void => {
      setSelectedTopicsFilters(selectedTopicsFilters.filter((topicId) => topicId !== id))
      resetPagination()
    },
    [selectedTopicsFilters],
  )

  const onLanguageAdd = useCallback(
    (id: number): void => {
      setSelectedLanguageFilters([...selectedLanguageFilters, id])
      resetPagination()
    },
    [selectedLanguageFilters],
  )

  const onLanguageRemove = useCallback(
    (id: number): void => {
      setSelectedLanguageFilters(selectedLanguageFilters.filter((languageId) => languageId !== id))
      resetPagination()
    },
    [selectedLanguageFilters],
  )

  return (
    <div className="my-feed-wrapper">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <FeedHeader currentUser={currentUser} />
      <div className="my-feed-search">
        <SearchInput debounceTime={500} defaultValue={search} onChange={onSearchChange} />

        <div className="my-feed-select">
          <TopicSelect
            topics={topics}
            selectedTopicsIds={selectedTopicsFilters}
            onAdd={onTopicAdd}
            onRemove={onTopicRemove}
          />

          <LanguageSelect
            languagesData={languagesData}
            selectedLanguagesIds={selectedLanguageFilters}
            onAdd={onLanguageAdd}
            onRemove={onLanguageRemove}
          />

          <div className="filter-actions">
            <Button
              variant={ButtonVariant.Link}
              className="filter-action-btn"
              onClick={() => {
                setSelectedLanguageFilters([])
                setSelectedTopicsFilters([])
                setSearchState('')
              }}
            >
              {t('clearFilters')}
            </Button>
            <Button
              variant={ButtonVariant.Link}
              className={`filter-action-btn ${isUserLanguagesFilterActive ? 'active' : ''}`}
              onClick={() => {
                setSelectedLanguageFilters([...userLanguages.values()])
              }}
            >
              {t('myLanguages')}
            </Button>
            <Button
              variant={ButtonVariant.Link}
              className={`filter-action-btn ${followedAuthorsFilter ? 'active' : ''}`}
              onClick={toggleFollowedAuthorsFilter}
            >
              {t('followedUsers')}
            </Button>
          </div>
        </div>
      </div>
      <LoadingWrapper loading={loading} error={error}>
        <div className="my-feed-container">
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
