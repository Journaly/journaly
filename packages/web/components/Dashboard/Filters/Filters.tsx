import React, { useState, useCallback } from 'react'
import isEqual from 'lodash/isEqual'
import Button, { ButtonVariant } from '@/components/Button'
import { User as UserType, useTopicsQuery, useLanguagesQuery } from '@/generated/graphql'
import SearchInput from './SearchInput'
import LanguageSelect from './LanguageSelect'
import TopicSelect from './TopicSelect'
import useToggle from '@/hooks/useToggle'
import useUILanguage from '@/hooks/useUILanguage'
import { Router, useTranslation } from '@/config/i18n'
import PremiumFeatureModal from '@/components/Modals/PremiumFeatureModal'

export type PostQueryVarsType = {
  languages: number[]
  topics: number[]
  followedAuthors: boolean
  search: string
  needsFeedback: boolean
  hasInteracted: boolean
  savedPosts?: boolean
}

type Props = {
  currentUser: UserType
  resetPagination: () => void
  postQueryVars: PostQueryVarsType
  setPostQueryVars: React.Dispatch<React.SetStateAction<PostQueryVarsType>>
  topicAndLanguageOptions: {
    hasPosts: boolean
    authoredOnly: boolean
  }
  showPostCount?: boolean
}

const Filters: React.FC<Props> = ({
  currentUser,
  resetPagination,
  postQueryVars,
  setPostQueryVars,
  topicAndLanguageOptions,
  showPostCount = true,
}) => {
  const { t } = useTranslation('my-feed')
  const [showAdvancedFilters, setShowAdvancedFilters] = useToggle(false)
  const [displayPremiumFeatureModal, setDisplayPremiumFeatureModal] = useState(false)
  const onSearchChange = useCallback(
    (val): void =>
      setPostQueryVars((prevState) => ({
        ...prevState,
        search: val,
      })),
    [],
  )

  const onTopicAdd = useCallback(
    (id: number): void => {
      setPostQueryVars((prevState) => ({
        ...prevState,
        topics: [...prevState.topics, id],
      }))
      resetPagination()
    },
    [resetPagination],
  )

  const onTopicRemove = useCallback(
    (id: number): void => {
      setPostQueryVars((prevState) => ({
        ...prevState,
        topics: prevState.topics.filter((topicId) => topicId !== id),
      }))
      resetPagination()
    },
    [resetPagination],
  )

  const onLanguageAdd = useCallback(
    (id: number): void => {
      setPostQueryVars((prevState) => ({
        ...prevState,
        languages: [...prevState.languages, id],
      }))
      resetPagination()
    },
    [resetPagination],
  )

  const onLanguageRemove = useCallback(
    (id: number): void => {
      setPostQueryVars((prevState) => ({
        ...prevState,
        languages: prevState.languages.filter((languageId) => languageId !== id),
      }))
      resetPagination()
    },
    [resetPagination],
  )

  const { data: languagesData } = useLanguagesQuery({
    variables: topicAndLanguageOptions,
  })

  const languageOptionIds = new Set((languagesData?.languages || []).map(({ id }) => id))
  const userLanguages: Set<number> = new Set(
    currentUser.languages
      ?.filter((lr) => languageOptionIds.has(lr.language.id))
      .map((lr) => lr.language.id) || [],
  )

  const isUserLanguagesFilterActive = isEqual(
    Array.from(userLanguages.values()),
    postQueryVars.languages,
  )

  const toggleFollowedAuthorsFilter = useCallback(() => {
    setPostQueryVars((prevState) => ({
      ...prevState,
      followedAuthors: !prevState.followedAuthors,
    }))
  }, [])
  const toggleNeedsFeedbackFilter = useCallback(() => {
    setPostQueryVars((prevState) => ({
      ...prevState,
      needsFeedback: !prevState.needsFeedback,
    }))
  }, [])
  const toggleHasInteractedFilter = useCallback(() => {
    setPostQueryVars((prevState) => ({
      ...prevState,
      hasInteracted: !prevState.hasInteracted,
    }))
  }, [])

  const handleToggleSavedPosts = useCallback(() => {
    if (!currentUser.membershipSubscription?.isActive) {
      setDisplayPremiumFeatureModal(true)
    } else {
      setPostQueryVars((prevState) => ({
        ...prevState,
        savedPosts: !prevState.savedPosts,
      }))
    }
  }, [])

  const uiLanguage = useUILanguage()
  const { data: { topics } = {} } = useTopicsQuery({
    variables: { uiLanguage, languages: postQueryVars.languages, ...topicAndLanguageOptions },
  })

  let filterCount =
    postQueryVars.topics.length +
    ~~postQueryVars.followedAuthors +
    ~~postQueryVars.needsFeedback +
    ~~postQueryVars.hasInteracted

  if (postQueryVars.savedPosts) filterCount += ~~postQueryVars.savedPosts

  return (
    <div className="my-feed-search">
      <div className="my-feed-select">
        <LanguageSelect
          languagesData={languagesData}
          selectedLanguagesIds={postQueryVars.languages}
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
              selectedTopicsIds={postQueryVars.topics}
              onAdd={onTopicAdd}
              onRemove={onTopicRemove}
              showPostCount={showPostCount}
            />
            <SearchInput
              debounceTime={500}
              defaultValue={postQueryVars.search}
              onChange={onSearchChange}
            />
            <div className="filter-action-container">
              <div className="filter-actions">
                <Button
                  variant={ButtonVariant.Link}
                  className="filter-action-btn"
                  onClick={() => {
                    setPostQueryVars({
                      languages: [],
                      topics: [],
                      search: '',
                      followedAuthors: false,
                      needsFeedback: false,
                      hasInteracted: false,
                      savedPosts: false,
                    })
                  }}
                >
                  {t('clearFilters')}
                </Button>
                <Button
                  variant={ButtonVariant.Link}
                  className={`filter-action-btn ${isUserLanguagesFilterActive ? 'active' : ''}`}
                  onClick={() => {
                    setPostQueryVars((prevState) => ({
                      ...prevState,
                      languages: [...userLanguages.values()],
                    }))
                  }}
                >
                  {t('myLanguages')}
                </Button>
                <Button
                  variant={ButtonVariant.Link}
                  className={`filter-action-btn ${postQueryVars.followedAuthors ? 'active' : ''}`}
                  onClick={toggleFollowedAuthorsFilter}
                >
                  {t('followedUsers')}
                </Button>
              </div>
              <div className="filter-actions">
                <Button
                  variant={ButtonVariant.Link}
                  className={`filter-action-btn ${postQueryVars.needsFeedback ? 'active' : ''}`}
                  onClick={toggleNeedsFeedbackFilter}
                >
                  {t('needsFeedback')}
                </Button>
                <Button
                  variant={ButtonVariant.Link}
                  className={`filter-action-btn ${postQueryVars.hasInteracted ? 'active' : ''}`}
                  onClick={toggleHasInteractedFilter}
                >
                  {t('hasInteracted')}
                </Button>
                {postQueryVars.savedPosts && (
                  <Button
                    variant={ButtonVariant.Link}
                    className={`filter-action-btn ${postQueryVars.hasInteracted ? 'active' : ''}`}
                    onClick={handleToggleSavedPosts}
                  >
                    {t('savedPosts')}
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {displayPremiumFeatureModal && (
        <PremiumFeatureModal
          featureName={t('savePostPremiumFeatureName')}
          featureExplanation={t('savePostPremiumFeatureExplanation')}
          onAcknowledge={() => {
            setDisplayPremiumFeatureModal(false)
          }}
          onGoToPremium={() => {
            Router.push('/dashboard/settings/subscription')
            setDisplayPremiumFeatureModal(false)
          }}
        />
      )}
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
