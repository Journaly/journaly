import React, { useState, useCallback, useEffect } from 'react'
import _ from 'lodash'
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
      languages: [] | null
      followedAuthors: boolean
      search: string
      topics: []
      needsFeedback: boolean
      hasInteracted: boolean
    }
  | undefined
  // TODO URGENT: remove this 'undefined'

type Props = {
  currentUser: UserType
  initialSearchFilters: InitialSearchFilters | null
  resetPagination: () => void
  postQueryVars: PostQueryVarsType
  setPostQueryVars: React.Dispatch<React.SetStateAction<PostQueryVarsType>>
}

const Filters: React.FC<Props> = ({ currentUser, initialSearchFilters, resetPagination }) => {
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

  const [selectedLanguageFilters, setSelectedLanguageFilters] = useState<number[]>(
    initialSearchFilters?.languages || [],
  )

  const isUserLanguagesFilterActive = _.isEqual(
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
    variables: { uiLanguage, hasPosts: true, languages: selectedLanguageFilters },
  })

  useEffect(() => {
    const searchFilters = {
      languages: selectedLanguageFilters,
      topics: selectedTopicsFilters,
      needsFeedback: needsFeedbackFilter,
      hasInteracted: hasInteractedFilter,
    }
    document.cookie = `default_search_filters=${JSON.stringify(searchFilters)};`
  }, [selectedLanguageFilters, selectedTopicsFilters, needsFeedbackFilter, hasInteractedFilter])

  return (
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
        <Button onClick={setShowAdvancedFilters}>Advanced Filters</Button>
        {showAdvancedFilters && (
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
        )}
      </div>
    </div>
  )
}

export default Filters
