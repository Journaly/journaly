import React, { useState, useRef, useMemo } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import classNames from 'classnames'
import Markdown from 'react-markdown'

import {
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  CommentFragmentFragment as CommentType,
  useCreateCommentThanksMutation,
  useDeleteCommentThanksMutation,
  CommentThanks,
  UserFragmentFragment,
} from '@/generated/graphql'
import theme from '@/theme'
import { useTranslation } from '@/config/i18n'
import Button, { ButtonSize, ButtonVariant } from '@/components/Button'
import BlankAvatarIcon from '@/components/Icons/BlankAvatarIcon'
import { useConfirmationModal } from '@/components/Modals/ConfirmationModal'
import EditIcon from '@/components/Icons/EditIcon'
import DeleteIcon from '@/components/Icons/DeleteIcon'
import { formatDateRelativeToNow } from '@/utils'
import LikeIcon from '@/components/Icons/LikeIcon'
import { generateNegativeRandomNumber } from '@/utils/number'

type CommentProps = {
  comment: CommentType
  canEdit: boolean
  onUpdateComment(): void
  currentUser?: UserFragmentFragment | null
}

const Comment = ({ comment, canEdit, onUpdateComment, currentUser }: CommentProps) => {
  const { t } = useTranslation('comment')
  const editTextarea = useRef<HTMLTextAreaElement>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [updatingCommentBody, setUpdatingCommentBody] = useState(comment.body)
  const [updateComment, { loading }] = useUpdateCommentMutation({
    onCompleted: () => {
      onUpdateComment()
    },
  })

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
    onError: (error) => toast.error(error),
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
    onError: (error) => toast.error(error),
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

  return (
    <div className="comment">
      <div className="author-body-container">
        <div className="author-block">
          <Link href={`/dashboard/profile/${comment.author.id}`}>
            <a className="author-info">
              {comment.author.profileImage ? (
                <img className="profile-image" src={comment.author.profileImage} alt="" />
              ) : (
                <BlankAvatarIcon size={20} />
              )}
            </a>
          </Link>
          <div className="identifier-date-block">
            <span className="author-identifier">
              {comment.author.name
                ? `${comment.author.name} (@${comment.author.handle})`
                : `@${comment.author.handle}`}
            </span>
            <span className="comment-date">
              {formatDateRelativeToNow(comment.createdAt)} {t('relativeTimeWord')}
            </span>
          </div>
        </div>
        <div className="body-block">
          {isEditMode ? (
            <textarea
              ref={editTextarea}
              value={updatingCommentBody}
              onChange={(e) => setUpdatingCommentBody(e.target.value)}
            />
          ) : (
            <Markdown className="comment-body" disallowedElements={['img']}>
              {comment.body}
            </Markdown>
          )}
        </div>
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
                setTimeout(() => {
                  const el = editTextarea.current
                  if (el) {
                    el.focus()
                    el.setSelectionRange(el.value.length, el.value.length)
                  }
                }, 0)
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
        }

        .profile-image {
          border-radius: 50%;
          width: 30px;
          height: 30px;
          object-fit: cover;
        }

        .author-block :global(svg) {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: ${theme.colors.blueLight};
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

        .comment-body {
          white-space: pre-line;
          word-wrap: break-word;
        }

        :global(.comment-body h1),
        :global(.comment-body h2),
        :global(.comment-body h3),
        :global(.comment-body h4) {
          font-family: inherit;
          font-size: 1.2em;
          font-weight: 600;
          margin: 0.5em 0 0.5em 0;
        }
        :global(.comment-body li) {
          list-style: inside;
          list-style-type: disc;
          margin-left: 20px;
        }
        :global(.comment-body code) {
          background-color: #eee;
          font-family: monospace;
          padding: 2px;
        }
        :global(.comment-body blockquote) {
          border-left: 4px solid ${theme.colors.blueLight};
          padding-left: 5px;
          background-color: ${theme.colors.gray100};
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
        .delete-btn :global(svg:hover) {
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

        textarea {
          flex: 1;
          width: 100%;
          outline: none;
          padding: 5px;
          margin-right: 10px;
          background-color: transparent;
          resize: vertical;
          border: 1px solid ${theme.colors.gray400};
          border-radius: 5px;
        }
      `}</style>
    </div>
  )
}

export default Comment
