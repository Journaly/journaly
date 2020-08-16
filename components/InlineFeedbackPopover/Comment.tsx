import React, { useState } from 'react'
import Link from 'next/link'
import {
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  CommentFragmentFragment as CommentType,
} from '../../generated/graphql'
import Button, { ButtonSize, ButtonVariant } from '../../elements/Button'
import BlankAvatarIcon from '../Icons/BlankAvatarIcon'
import theme from '../../theme'
import EditIcon from '../Icons/EditIcon'
import DeleteIcon from '../Icons/DeleteIcon'

type CommentProps = {
  comment: CommentType
  canEdit: boolean
  onUpdateComment: any
}

const Comment: React.FC<CommentProps> = ({ comment, canEdit, onUpdateComment }) => {
  const [isEditMode, setIsEditMode] = React.useState<boolean>(false)
  const [updatingCommentBody, setUpdatingCommentBody] = useState<string>(comment.body)

  const [updateComment, { loading }] = useUpdateCommentMutation({
    onCompleted: () => {
      onUpdateComment()
      setUpdatingCommentBody('')
    },
  })

  const updateExistingComment = () => {
    updateComment({
      variables: {
        commentId: comment.id,
        body: updatingCommentBody,
      },
    })
    setIsEditMode(false)
  }

  const [deleteComment, { loading: deleteLoading }] = useDeleteCommentMutation({
    onCompleted: () => {
      // just refetches the post as in updateComment
      onUpdateComment()
    },
  })

  const deleteExistingComment = () => {
    deleteComment({
      variables: {
        commentId: comment.id,
      },
    })
  }

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
          <span className="author-identifier">
            {comment.author.name
              ? `${comment.author.name} (@${comment.author.handle})`
              : `@${comment.author.handle}`}
          </span>
        </div>
        <div className="body-block">
          {isEditMode ? (
            <textarea
              value={updatingCommentBody}
              onChange={(e) => setUpdatingCommentBody(e.target.value)}
            />
          ) : (
            <p>{comment.body}</p>
          )}
        </div>
      </div>
      {canEdit && !isEditMode && (
        <div className="edit-block">
          <span className="edit-btn" onClick={() => setIsEditMode(true)}>
            <EditIcon size={24} />
          </span>
          <span className="delete-btn" onClick={deleteExistingComment}>
            <DeleteIcon size={24} />
          </span>
        </div>
      )}
      {canEdit && isEditMode && (
        <Button
          size={ButtonSize.Small}
          onClick={updateExistingComment}
          disabled={loading}
          variant={ButtonVariant.Dark}
        >
          Save
        </Button>
      )}
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

        .profile-image {
          border-radius: 50%;
          width: 27px;
          height: 27px;
          object-fit: cover;
        }

        .author-block :global(svg) {
          border-radius: 50%;
          background-color: ${theme.colors.blueLight};
        }

        .body-block {
          display: flex;
          justify-content: space-between;
        }

        .edit-block {
          display: flex;
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
        .delete-btn :global(svg:hover) {
          cursor: pointer;
          fill: ${theme.colors.red};
        }

        textarea {
          flex: 1;
          margin-right: 10px;
          outline: none;
          padding: 5px 0;
          margin-right: 10px;
          background-color: none;
          resize: vertical;
        }
      `}</style>
    </div>
  )
}

export default Comment
