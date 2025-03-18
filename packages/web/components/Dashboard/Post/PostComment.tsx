import React, { useState } from 'react'
import Link from 'next/link'

import {
  useUpdatePostCommentMutation,
  useDeletePostCommentMutation,
  PostCommentFragmentFragment as PostCommentType,
} from '@/generated/graphql'
import { useTranslation } from 'next-i18next'

import EditableMarkdown from '@/components/EditableMarkdown'
import Button, { ButtonSize, ButtonVariant } from '@/components/Button'
import { useConfirmationModal } from '@/components/Modals/ConfirmationModal'
import theme from '@/theme'
import EditIcon from '@/components/Icons/EditIcon'
import DeleteIcon from '@/components/Icons/DeleteIcon'
import { formatDateRelativeToNow } from '@/utils'
import LevelGauge from '@/components/LevelGauge'
import UserAvatar from '@/components/UserAvatar'

type PostCommentProps = {
  comment: PostCommentType
  canEdit: boolean
  onUpdateComment: () => void
  onDeleteComment: () => void
}

const PostComment: React.FC<PostCommentProps> = ({
  comment,
  canEdit,
  onUpdateComment,
  onDeleteComment,
}) => {
  const { t } = useTranslation('comment')

  const [isEditMode, setIsEditMode] = React.useState<boolean>(false)
  const [updatingCommentBody, setUpdatingCommentBody] = useState<string>(comment.body)
  const [DeleteConfirmationModal, confirmDeletion] = useConfirmationModal({
    title: t('deleteCommentConfirmModalTitle'),
    body: t('deleteCommentConfirmModalBody'),
  })

  const [updateComment, { loading }] = useUpdatePostCommentMutation({
    onCompleted: () => {
      onUpdateComment()
      setUpdatingCommentBody('')
    },
  })

  const updateExistingComment = () => {
    updateComment({
      variables: {
        postCommentId: comment.id,
        body: updatingCommentBody,
      },
    })
    setIsEditMode(false)
  }

  const [deleteComment] = useDeletePostCommentMutation({
    onCompleted: () => {
      // just refetches the post as in updateComment
      onDeleteComment()
    },
  })

  const deleteExistingComment = async () => {
    if (!(await confirmDeletion())) return

    deleteComment({
      variables: {
        postCommentId: comment.id,
      },
    })
  }

  return (
    <div className="comment" id={`pc-${comment.id}`}>
      <div className="author-body-container">
        <div className="author-block">
          <Link href={`/user/${comment.author.handle}`} legacyBehavior>
            <a className="author-info">
              <UserAvatar size={30} user={comment.author} />
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
          // TODO: `currentContentInPost` & `isPostAuthor` are only relevant to
          // Inline Feedback Comments so for now we just pass falsy values here.
          // We should pull the suggestion logic out of EditableMarkdown and have
          // the parent pass down the rehype config.
          currentContentInPost={null}
          isPostAuthor={false}
        />
      </div>
      {canEdit && !isEditMode && (
        <div className="edit-block">
          <span
            className="edit-btn"
            onClick={() => {
              setIsEditMode(true)
              setUpdatingCommentBody(comment.body)
            }}
          >
            <EditIcon size={24} />
          </span>
          <span className="delete-btn" onClick={deleteExistingComment}>
            <DeleteIcon size={24} />
          </span>
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

        .author-identifier {
          text-align: left;
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

        .body-block :global(p) {
          word-wrap: break-word;
        }

        .edit-block {
          display: flex;
          margin-left: 10px;
        }

        .edit-block span {
          margin-right: 5px;
          display: flex;
          align-items: center;
        }

        .edit-btn :global(svg:hover) {
          cursor: pointer;
          fill: ${theme.colors.blueLight};
        }

        .delete-btn :global(svg:hover path) {
          cursor: pointer;
          fill: ${theme.colors.red};
        }

        textarea {
          flex: 1;
          width: 100%;
          outline: none;
          padding: 5px;
          margin-right: 10px;
          resize: vertical;
          border: 1px solid ${theme.colors.gray400};
          border-radius: 5px;
        }
      `}</style>
    </div>
  )
}

export default PostComment
