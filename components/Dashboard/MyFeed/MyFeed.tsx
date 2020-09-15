import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useTranslation } from '../../../config/i18n'

import PostCard from '../PostCard'
import Pagination from '../../Pagination'
import theme from '../../../theme'
import { User as UserType, useFeedQuery, useLanguagesQuery } from '../../../generated/graphql'
// import Select from '../../../elements/Select'
import LoadingWrapper from '../../LoadingWrapper'
import MultiSelect from '../../../elements/MultiSelect'

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

  for (let languageLearning of currentUser.languagesLearning) {
    if (languageOptionIds.has(languageLearning.language.id))
      userLanguages.add(languageLearning.language.id)
  }
  for (let languageNative of currentUser.languagesNative) {
    if (languageOptionIds.has(languageNative.language.id))
      userLanguages.add(languageNative.language.id)
  }

  const [selectedLanguageFilters, setSelectedLanguageFilters] = useState<number[]>([
    ...userLanguages.values(),
  ])

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
    },
  })

  const posts = data?.feed?.posts
  const count = data?.feed?.count || 0
  const showPagination = count > NUM_POSTS_PER_PAGE
  const pageTitle = t('pageTitle')

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
      <h1>
        {t('generalGreeting')} {currentUser.name || currentUser.handle}!
      </h1>
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
          <a
            className="j-link"
            onClick={() => {
              setSelectedLanguageFilters([])
            }}
          >
            {t('clearFilters')}
          </a>
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
      `}</style>
    </div>
  )
}

export default MyFeed
