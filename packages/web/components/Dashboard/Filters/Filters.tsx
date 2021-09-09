import React, { useState, useCallback, useEffect } from 'react'
import isEqual from 'lodash/isEqual'
import Button, { ButtonVariant } from '@/components/Button'
import { User as UserType, useTopicsQuery, useLanguagesQuery } from '@/generated/graphql'
import SearchInput from './SearchInput'
import LanguageSelect from './LanguageSelect'
import TopicSelect from './TopicSelect'
import useToggle from '@/hooks/useToggle'
import useUILanguage from '@/hooks/useUILanguage'
import { useTranslation } from '@/config/i18n'

export type InitialSearchFilters = {
  languages: number[]
  topics: number[]
  needsFeedback: boolean
  hasInteracted: boolean
}

export type PostQueryVarsType =
  | {
      languages: number[] | null
      topics: number[]
      followedAuthors: boolean
      search: string
      needsFeedback: boolean
      hasInteracted: boolean
    }
  | undefined
// TODO URGENT: remove this 'undefined'

type Props = {
  currentUser: UserType
  initialSearchFilters: InitialSearchFilters | null
  resetPagination: () => void
  setPostQueryVars: React.Dispatch<React.SetStateAction<PostQueryVarsType>>
  topicAndLanguageOptions: {
    hasPosts: boolean
    authoredOnly: boolean
  }
  showPostCount?: boolean
}

const Filters: React.FC<Props> = ({
  currentUser,
  initialSearchFilters,
  resetPagination,
  setPostQueryVars,
  topicAndLanguageOptions,
  showPostCount = true,
}) => {
  const { t } = useTranslation('my-feed')
  const [showAdvancedFilters, setShowAdvancedFilters] = useToggle(false)
  const [search, setSearchState] = useState('')
  const onSearchChange = useCallback((val): void => setSearchState(val), [])

  const [selectedTopicsFilters, setSelectedTopicsFilters] = useState<number[]>(
    initialSearchFilters?.topics || [],
  )
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

  // Fetch languages that have at least 1 post
  const { data: languagesData } = useLanguagesQuery({
    variables: {
      topics: selectedTopicsFilters,
      ...topicAndLanguageOptions,
    },
  })

  const languageOptionIds = new Set((languagesData?.languages || []).map(({ id }) => id))
  const userLanguages: Set<number> = new Set(
    currentUser.languages
      ?.filter((lr) => languageOptionIds.has(lr.language.id))
      .map((lr) => lr.language.id) || [],
  )

  const [selectedLanguageFilters, setSelectedLanguageFilters] = useState<number[]>(
    initialSearchFilters?.languages || [],
  )

  const isUserLanguagesFilterActive = isEqual(
    Array.from(userLanguages.values()),
    selectedLanguageFilters,
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

  const [followedAuthorsFilter, toggleFollowedAuthorsFilter] = useToggle()
  const [needsFeedbackFilter, toggleNeedsFeedbackFilter] = useToggle(
    initialSearchFilters?.needsFeedback || false,
  )
  const [hasInteractedFilter, toggleHasInteractedFilter] = useToggle(
    initialSearchFilters?.hasInteracted || false,
  )

  const uiLanguage = useUILanguage()
  const { data: { topics } = {} } = useTopicsQuery({
    variables: { uiLanguage, languages: selectedLanguageFilters, ...topicAndLanguageOptions },
  })

  useEffect(() => {
    setPostQueryVars({
      languages: selectedLanguageFilters.length ? selectedLanguageFilters : null,
      topics: selectedTopicsFilters,
      followedAuthors: followedAuthorsFilter,
      search,
      needsFeedback: needsFeedbackFilter,
      hasInteracted: hasInteractedFilter,
    })
  }, [
    selectedLanguageFilters,
    selectedTopicsFilters,
    followedAuthorsFilter,
    needsFeedbackFilter,
    hasInteractedFilter,
    search,
  ])

  const filterCount =
    selectedTopicsFilters.length +
    ~~followedAuthorsFilter +
    ~~needsFeedbackFilter +
    ~~hasInteractedFilter

  return (
    <div className="my-feed-search">
      <div className="my-feed-select">
        <LanguageSelect
          languagesData={languagesData}
          selectedLanguagesIds={selectedLanguageFilters}
          onAdd={onLanguageAdd}
          onRemove={onLanguageRemove}
          showPostCount={showPostCount}
        />
        <Button variant={ButtonVariant.Link} onClick={setShowAdvancedFilters}>
          {t(`${showAdvancedFilters ? 'hideAdvancedFilters' : 'showAdvancedFilters'}`)}{' '}
          {filterCount > 0 && `(${filterCount})`}
        </Button>
        {showAdvancedFilters && (
          <>
            <TopicSelect
              topics={topics}
              selectedTopicsIds={selectedTopicsFilters}
              onAdd={onTopicAdd}
              onRemove={onTopicRemove}
              showPostCount={showPostCount}
            />
            <SearchInput debounceTime={500} defaultValue={search} onChange={onSearchChange} />
            <div className="filter-action-container">
              <div className="filter-actions">
                <Button
                  variant={ButtonVariant.Link}
                  className="filter-action-btn"
                  onClick={() => {
                    setSelectedLanguageFilters([])
                    setSelectedTopicsFilters([])
                    setSearchState('')
                    followedAuthorsFilter && toggleFollowedAuthorsFilter()
                    needsFeedbackFilter && toggleNeedsFeedbackFilter()
                    hasInteractedFilter && toggleHasInteractedFilter()
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
              <div className="filter-actions">
                <Button
                  variant={ButtonVariant.Link}
                  className={`filter-action-btn ${needsFeedbackFilter ? 'active' : ''}`}
                  onClick={toggleNeedsFeedbackFilter}
                >
                  {t('needsFeedback')}
                </Button>
                <Button
                  variant={ButtonVariant.Link}
                  className={`filter-action-btn ${hasInteractedFilter ? 'active' : ''}`}
                  onClick={toggleHasInteractedFilter}
                >
                  {t('hasInteracted')}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <style jsx>{`
        .my-feed-search {
          width: 100%;
          max-width: 700px;
          margin: 0 auto;
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

export default Filters
