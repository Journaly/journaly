import React, { useState } from 'react'
import Link from 'next/link'
import {
  useUpdatePostCommentMutation,
  useDeletePostCommentMutation,
  PostCommentFragmentFragment as PostCommentType,
} from '../../../generated/graphql'
import Button, { ButtonSize, ButtonVariant } from '../../../elements/Button'
import BlankAvatarIcon from '../../Icons/BlankAvatarIcon'
import theme from '../../../theme'

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
  const [isEditMode, setIsEditMode] = React.useState<boolean>(false)
  const [updatingCommentBody, setUpdatingCommentBody] = useState<string>(comment.body)

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

  const [deleteComment, { loading: deleteLoading }] = useDeletePostCommentMutation({
    onCompleted: () => {
      // just refetches the post as in updateComment
      onDeleteComment()
    },
  })

  const deleteExistingComment = () => {
    deleteComment({
      variables: {
        postCommentId: comment.id,
      },
    })
  }

  return (
    <div className="comment">
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

export default PostComment
