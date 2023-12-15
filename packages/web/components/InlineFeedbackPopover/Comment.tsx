import React, { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import classNames from 'classnames'

import {
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  CommentFragmentFragment as CommentType,
  useCreateCommentThanksMutation,
  useDeleteCommentThanksMutation,
  CommentThanks,
  CurrentUserFragmentFragment as UserType,
  UserRole,
  useApplySuggestionMutation,
} from '@/generated/graphql'
import theme from '@/theme'
import { Router, useTranslation } from '@/config/i18n'
import EditableMarkdown from '@/components/EditableMarkdown'
import Button, { ButtonSize, ButtonVariant } from '@/components/Button'
import { useConfirmationModal } from '@/components/Modals/ConfirmationModal'
import EditIcon from '@/components/Icons/EditIcon'
import DeleteIcon from '@/components/Icons/DeleteIcon'
import { formatDateRelativeToNow } from '@/utils'
import LikeIcon from '@/components/Icons/LikeIcon'
import { generateNegativeRandomNumber } from '@/utils/number'
import LevelGauge from '../LevelGauge'
import UserAvatar from '../UserAvatar'
import PremiumFeatureModal from '../Modals/PremiumFeatureModal'
import { JOURNALY_PREMIUM_URL } from '@/constants'

type CommentProps = {
  comment: CommentType
  canEdit: boolean
  onUpdateComment(): void
  currentUser?: UserType | null
  highlightedContent: string
  currentContentInPost: string
}

// The character that triggers a "mention" search
// TODO move this somewhere else as it will be shared with PostComment
// const MENTION_KEYWORD_CHAR = '@'

const Comment = ({
  comment,
  canEdit,
  onUpdateComment,
  currentUser,
  highlightedContent,
  currentContentInPost,
}: CommentProps) => {
  const { t } = useTranslation('comment')
  const [isEditMode, setIsEditMode] = useState(false)
  const [updatingCommentBody, setUpdatingCommentBody] = useState(comment.body)
  const [updateComment, { loading }] = useUpdateCommentMutation({
    onCompleted: () => {
      onUpdateComment()
    },
  })

  // Refactor this to compare post.author.id === currentUser?.id
  // This requires getting the post data.
  const isPostAuthor = comment.author.id === currentUser?.id
  console.log(isPostAuthor)

  const [displayPremiumFeatureModal, setDisplayPremiumFeatureModal] = useState(false)

  const [DeleteConfirmationModal, confirmDeletion] = useConfirmationModal({
    title: t('deleteCommentConfirmModalTitle'),
    body: t('deleteCommentConfirmModalBody'),
  })

  // Check to see if the currentUser has already liked this comment
  const hasThankedComment = useMemo(() => {
    return comment.thanks.find((thanks) => thanks.author.id === currentUser?.id) !== undefined
  }, [comment.thanks, currentUser?.id])

  const numThanks = comment.thanks.length

  const updateExistingComment = () => {
    updateComment({
      variables: {
        commentId: comment.id,
        body: updatingCommentBody,
      },
    })
    setIsEditMode(false)
  }

  const [deleteComment] = useDeleteCommentMutation({
    onCompleted: () => {
      // just refetches the post as in updateComment
      onUpdateComment()
    },
  })

  const deleteExistingComment = async () => {
    if (!(await confirmDeletion())) return

    deleteComment({
      variables: {
        commentId: comment.id,
      },
    })
  }

  const [createCommentThanks, createCommentThanksResult] = useCreateCommentThanksMutation({
    update(cache, { data }) {
      if (data?.createCommentThanks) {
        cache.modify({
          id: `${comment.__typename}:${comment.id}`,
          fields: {
            thanks: (existingComments: CommentThanks[] = []) => {
              return [...existingComments, data.createCommentThanks]
            },
          },
        })
      }
    },
    onError: (error) => toast.error(error.message),
  })
  const createNewCommentThanks = () => {
    createCommentThanks({
      variables: { commentId: comment.id },
      optimisticResponse: {
        __typename: 'Mutation',
        createCommentThanks: {
          __typename: 'CommentThanks',
          id: generateNegativeRandomNumber(),
          author: {
            __typename: 'User',
            handle: currentUser!.handle,
            name: currentUser?.name,
            profileImage: currentUser?.profileImage,
            id: currentUser!.id,
          },
        },
      },
    })
  }
  const [deleteCommentThanks, deleteCommentThanksResult] = useDeleteCommentThanksMutation({
    update(cache, { data }) {
      if (data?.deleteCommentThanks) {
        cache.modify({
          id: `${comment.__typename}:${comment.id}`,
          fields: {
            thanks: (existingComments: CommentThanks[] = []) => {
              return existingComments.filter(
                (existingComment) => data.deleteCommentThanks.id !== existingComment.id,
              )
            },
          },
        })

        cache.evict({ id: `${data.deleteCommentThanks.__typename}:${data.deleteCommentThanks.id}` })
      }
    },
    onError: (error) => toast.error(error.message),
  })

  const deleteExistingCommentThanks = () => {
    const currentCommentThanks = comment.thanks.find(
      (thanks) => thanks.author.id === currentUser?.id,
    )

    if (currentCommentThanks) {
      deleteCommentThanks({ variables: { commentThanksId: currentCommentThanks.id } })
    }
  }

  const isLoadingCommentThanks =
    createCommentThanksResult.loading || deleteCommentThanksResult.loading

  const isPremiumFeatureEligible =
    currentUser?.membershipSubscription?.isActive ||
    currentUser?.userRole === UserRole.Admin ||
    currentUser?.userRole === UserRole.Moderator

  const [applySuggestion] = useApplySuggestionMutation()

  const handleAcceptSuggestionClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const target = e.target as HTMLElement
      if (!target?.classList?.contains('apply-suggestion-btn')) {
        return
      }

      if (!isPremiumFeatureEligible) {
        setDisplayPremiumFeatureModal(true)
        return
      }

      const suggestedContent = target.dataset.suggestedContent
      if (!suggestedContent) {
        throw new Error('Suggested content missing from Apply Suggestion Button')
      }

      // Do lots of things to apply the suggestion
      console.log(currentUser)
      const updatedPost = applySuggestion({
        variables: {
          commentId: comment.id,
          suggestedContent,
        },
      })
    },
    [currentUser],
  )

  return (
    <div className="comment" onClick={handleAcceptSuggestionClick}>
      <div className="author-body-container">
        <div className="author-block">
          <Link href={`/user/${comment.author.handle}`} legacyBehavior>
            <a className="author-info">
              <UserAvatar user={comment.author} size={30} />
            </a>
          </Link>
          <div className="identifier-date-block">
            <span className="author-identifier">
              {comment.author.name
                ? `${comment.author.name} (@${comment.author.handle})`
                : `@${comment.author.handle}`}
              <LevelGauge level={comment.authorLanguageLevel} />
            </span>
            <span className="comment-date">
              {formatDateRelativeToNow(comment.createdAt)} {t('relativeTimeWord')}
            </span>
          </div>
        </div>
        <EditableMarkdown
          body={comment.body}
          updatingCommentBody={updatingCommentBody}
          setUpdatingCommentBody={setUpdatingCommentBody}
          editing={isEditMode}
          baseContent={highlightedContent}
          isPostAuthor={isPostAuthor}
          currentContentInPost={currentContentInPost}
        />
      </div>
      {canEdit && !isEditMode && (
        <div className="edit-thanks-block">
          <div className="thanks-block">
            <span>
              <LikeIcon filled={numThanks > 0} title={t('numUsersGaveThanks', { numThanks })} />
            </span>
            <span className="thanks-count">{numThanks}</span>
          </div>
          <div className="edit-block">
            <span
              role="button"
              className="edit-btn"
              onClick={() => {
                setIsEditMode(true)
                setUpdatingCommentBody(comment.body)
              }}
            >
              <EditIcon size={24} />
            </span>
            <span role="button" className="delete-btn" onClick={deleteExistingComment}>
              <DeleteIcon size={24} />
            </span>
          </div>
        </div>
      )}
      {canEdit && isEditMode && (
        <>
          <Button
            size={ButtonSize.Small}
            onClick={updateExistingComment}
            loading={loading}
            variant={ButtonVariant.PrimaryDark}
            style={{
              marginRight: '5px',
            }}
          >
            {t('save')}
          </Button>
          <Button
            size={ButtonSize.Small}
            onClick={() => {
              setUpdatingCommentBody(comment.body)
              setIsEditMode(false)
            }}
            disabled={loading}
            variant={ButtonVariant.Secondary}
          >
            {t('cancel')}
          </Button>
        </>
      )}
      {!canEdit && currentUser?.id && (
        <div className={classNames('edit-block', { progress: isLoadingCommentThanks })}>
          <span
            className="like-btn-clickable"
            onClick={hasThankedComment ? deleteExistingCommentThanks : createNewCommentThanks}
            role="button"
          >
            <LikeIcon filled={hasThankedComment} />
          </span>
          <span className="thanks-count">{numThanks}</span>
        </div>
      )}
      {displayPremiumFeatureModal && (
        <PremiumFeatureModal
          featureExplanation={t('acceptSuggestionPremiumFeatureExplanation')}
          onAcknowledge={() => setDisplayPremiumFeatureModal(false)}
          onGoToPremium={() => {
            Router.push(JOURNALY_PREMIUM_URL)
            setDisplayPremiumFeatureModal(false)
          }}
        />
      )}
      <DeleteConfirmationModal />
      <style jsx>{`
        .comment {
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
        }

        .author-body-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          min-width: 0;
        }
        .author-block {
          display: flex;
          align-items: center;
          font-weight: bold;
          font-size: 0.75em;
        }

        .author-block span {
          margin-left: 5px;
        }

        .author-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
        }

        .author-identifier {
          display: flex;
          gap: 5px;
          align-items: center;
        }

        .identifier-date-block {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .comment-date {
          font-weight: 400;
          color: ${theme.colors.gray600};
          text-align: left;
        }

        .body-block {
          margin: 5px 10px 10px 0;
          text-align: left;
        }

        .edit-thanks-block {
          display: flex;
          flex-direction: column;
          margin-left: 10px;
        }

        .edit-block {
          display: flex;
          margin: auto 0 auto 10px;
        }

        .edit-block span,
        .thanks-block span {
          margin-right: 5px;
          display: flex;
          align-items: center;
        }

        .thanks-block {
          display: flex;
          margin: 0 0 10px auto;
        }

        .edit-btn :global(svg:hover) {
          cursor: pointer;
          fill: ${theme.colors.blueLight};
        }

        .delete-btn :global(svg:hover path) {
          cursor: pointer;
          fill: ${theme.colors.red};
        }
        .like-btn-clickable :global(svg:hover) {
          cursor: pointer;
        }
        .progress {
          cursor: progress;
        }
        .progress > .like-btn-clickable {
          pointer-events: none;
        }

        .thanks-count {
          color: ${theme.colors.gray600};
        }
      `}</style>
    </div>
  )
}

export default Comment
