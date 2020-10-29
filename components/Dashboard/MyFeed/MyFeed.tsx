import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import _ from 'lodash'

import { useTranslation } from '../../../config/i18n'

import PostCard from '../PostCard'
import Pagination from '../../Pagination'
import theme from '../../../theme'
import { User as UserType, useFeedQuery, useLanguagesQuery } from '../../../generated/graphql'
// import Select from '../../../elements/Select'
import LoadingWrapper from '../../LoadingWrapper'
import MultiSelect from '../../../elements/MultiSelect'
import Button, { ButtonVariant } from '../../../elements/Button'
import { greetings } from './greetings'
import useToggle from '../../../hooks/useToggle'

const NUM_POSTS_PER_PAGE = 9

type Props = {
  currentUser: UserType
}

const MyFeed: React.FC<Props> = ({ currentUser }) => {
  const { t } = useTranslation('my-feed')

  /**
   * Topic filter selection state
   */
  // const [topic, setTopic] = useState('')

  /**
   * Language filter selection state
   */

  // Fetch languages that have at least 1 post
  const { data: languagesData } = useLanguagesQuery({
    variables: {
      hasPosts: true,
    },
  })
  const languageOptions = (languagesData?.languages || []).map(({ id, name, postCount }) => ({
    value: id,
    displayName: `${name} (${postCount} post${(postCount || 0) === 1 ? '' : 's'})`,
    selectedDisplayName: `${name}`,
  }))
  const languageOptionIds = new Set((languagesData?.languages || []).map(({ id }) => id))

  let userLanguages: Set<number> = new Set([])

  for (let languageRelation of currentUser.languages) {
    if (languageOptionIds.has(languageRelation.language.id))
      userLanguages.add(languageRelation.language.id)
  }

  const [selectedLanguageFilters, setSelectedLanguageFilters] = useState<number[]>([
    ...userLanguages.values(),
  ])

  const isUserLanguagesFilterActive = _.isEqual(
    Array.from(userLanguages.values()),
    selectedLanguageFilters,
  )

  const [followedAuthorsFilter, toggleFollowedAuthorsFilter] = useToggle()

  /**
   * Pagination handling
   */
  // Pull query params off the router instance
  const { query } = useRouter()
  const currentPage = query.page ? Math.max(1, parseInt(query.page as string, 10)) : 1

  // fetch posts for the feed!
  const { loading, error, data } = useFeedQuery({
    variables: {
      first: NUM_POSTS_PER_PAGE,
      skip: (currentPage - 1) * NUM_POSTS_PER_PAGE,
      languages: selectedLanguageFilters.length ? selectedLanguageFilters : null,
      followedAuthors: followedAuthorsFilter,
    },
  })

  const posts = data?.feed?.posts
  const count = data?.feed?.count || 0
  const showPagination = count > NUM_POSTS_PER_PAGE
  const pageTitle = t('pageTitle')

  let greetingLanguage = 'English'

  if (currentUser.languages.length === 1) {
    greetingLanguage = currentUser.languages[0].language.name
  }

  if (currentUser.languages.length > 1) {
    const index = Math.floor(Math.random() * currentUser.languages.length)
    const greetingLanguageKey = currentUser.languages[index].language.name
    greetingLanguage = greetings[greetingLanguageKey] ? greetingLanguageKey : 'English'
  }

  const rightToLeftLanguages = ['Arabic', 'Persian']

  /* TEMPORARY until topics built
    const topicOptions = [
      { value: 'rock_climbing', displayName: 'Rock climbing' },
      { value: 'cooking', displayName: 'Cooking' },
      { value: 'drawing', displayName: 'Drawing' },
      { value: 'history', displayName: 'History' },
    ]

    const handleTopicChange = (value: string): void => {
      setTopic(value)
    }
  */
  return (
    <div className="my-feed-wrapper">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {rightToLeftLanguages.includes(greetingLanguage) ? (
        <h1>
          !{currentUser.name || currentUser.handle} {greetings[greetingLanguage]}
        </h1>
      ) : (
        <h1>
          {greetings[greetingLanguage]} {currentUser.name || currentUser.handle}!
        </h1>
      )}
      <div className="my-feed-search">
        <input type="text" placeholder="Search..." className="search-box" />

        <div className="my-feed-select">
          {/* <Select
            options={topicOptions}
            value={topic}
            placeholder="Topic"
            name="topic"
            onChange={handleTopicChange}
          /> */}

          <MultiSelect
            options={languageOptions}
            selectedOptionValues={selectedLanguageFilters}
            placeholder="Languages"
            onAdd={(id) => setSelectedLanguageFilters([...selectedLanguageFilters, id])}
            onRemove={(id) =>
              setSelectedLanguageFilters(
                selectedLanguageFilters.filter((languageId) => languageId !== id),
              )
            }
          />
          <div className="filter-actions">
            <Button
              variant={ButtonVariant.Link}
              className="filter-action-btn"
              onClick={() => {
                setSelectedLanguageFilters([])
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

        h1 {
          margin: 0 auto 40px;
          text-align: center;
          ${theme.typography.headingXL};
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

        .search-box {
          margin-bottom: 20px;
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
