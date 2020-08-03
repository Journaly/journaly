import React, { useState } from 'react'
import {
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  CommentFragmentFragment as CommentType,
} from '../../generated/graphql'
import Button, { ButtonSize, ButtonVariant } from '../../elements/Button'
import BlankAvatarIcon from '../Icons/BlankAvatarIcon'
import theme from '../../theme'

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
      <div className="author-block">
        {comment.author.profileImage ? (
          <img className="profile-image" src={comment.author.profileImage} alt="" />
        ) : (
          <BlankAvatarIcon size={20} />
        )}
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
        {canEdit && !isEditMode && (
          <div className="edit-block">
            <Button
              size={ButtonSize.Small}
              onClick={() => setIsEditMode(true)}
              className="edit-btn"
            >
              Edit
            </Button>
            <Button
              size={ButtonSize.Small}
              variant={ButtonVariant.Destructive}
              onClick={deleteExistingComment}
              disabled={deleteLoading}
            >
              Delete
            </Button>
          </div>
        )}
        {canEdit && isEditMode && (
          <Button size={ButtonSize.Small} onClick={updateExistingComment} disabled={loading}>
            Save
          </Button>
        )}
      </div>
      <style jsx>{`
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

        :global(.edit-btn) {
          margin-right: 5px;
        }

        textarea {
          flex: 1;
          margin-right: 10px;
          outline: none;
          padding: 5px 0;
          margin-right: 10px;
          background-color: #f9f9f9;
        }
      `}</style>
    </div>
  )
}

export default Comment
