import React from 'react'

import { useTranslation } from '@/config/i18n'
import { sanitize } from '@/utils'
import {
  useCreateCommentMutation,
  UserFragmentFragment as UserType,
  ThreadFragmentFragment as ThreadType,
  useDeleteThreadMutation,
} from '@/generated/graphql'

import theme from '@/theme'
import Comment from './Comment'
import Button, { ButtonVariant } from '@/components/Button'

type ThreadProps = {
  thread: ThreadType
  onNewComment: () => void
  onUpdateComment: () => void
  onDeleteThread: () => void
  currentUser: UserType | null | undefined
}

const Thread: React.FC<ThreadProps> = ({
  thread,
  onNewComment,
  onUpdateComment,
  onDeleteThread,
  currentUser,
}) => {
  const { t } = useTranslation('comment')

  const [commentBody, setCommentBody] = React.useState<string>('')
  const [createComment, { loading }] = useCreateCommentMutation({
    onCompleted: () => {
      onNewComment()
      setCommentBody('')
    },
  })
  const [deleteThread] = useDeleteThreadMutation({
    onCompleted: () => {
      onDeleteThread()
    },
  })

  const createNewComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    createComment({
      variables: {
        threadId: thread.id,
        body: commentBody,
      },
    })
  }

  const cancelNewComment = () => {
    if (thread.comments.length === 0) {
      deleteThread({
        variables: {
          threadId: thread.id,
        },
      })
    }
  }

  const sanitizedHTML = sanitize(thread.highlightedContent)

  return (
    <div className="thread">
      <div className="thread-subject">
        <span className="highlighted-content" dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
      </div>
      <div className="thread-body">
        <div className="comments">
          {thread.comments.map((comment, idx) => {
            const canEdit = currentUser?.id === comment.author.id
            return (
              <Comment
                comment={comment}
                canEdit={canEdit}
                key={idx}
                onUpdateComment={onUpdateComment}
                currentUser={currentUser}
              />
            )
          })}

          {!thread.comments.length && <div className="empty-notice">{t('noCommentsYetMessage')}</div>}
        </div>
        {currentUser && !thread.archived && (
          <form onSubmit={createNewComment}>
            <fieldset>
              <div className="new-comment-block">
                <textarea
                  placeholder={t('addCommentPlaceholder')}
                  value={commentBody}
                  onChange={(e) => setCommentBody(e.target.value)}
                  disabled={loading}
                />
                <div className="btn-container">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="new-comment-btn"
                    variant={ButtonVariant.PrimaryDark}
                  >
                    {t('submit')}
                  </Button>
                  {thread.comments.length === 0 && (
                    <Button
                      onClick={() => cancelNewComment()}
                      disabled={loading}
                      variant={ButtonVariant.Secondary}
                    >
                      {t('cancel')}
                    </Button>
                  )}
                </div>
              </div>
            </fieldset>
          </form>
        )}
      </div>
      <style jsx>{`
        .thread {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          max-height: 100%;
        }

        .thread-subject {
          border-bottom: 1px solid ${theme.colors.gray400};
          text-align: center;
          padding: 5px 20px;
          margin: 0 10px;
        }

        .thread-body {
          flex: 1;
          overflow-y: auto;
          padding: 10px;
        }

        .highlighted-content {
          background-color: ${theme.colors.highlightColor};
        }

        .comments {
          padding: 5px 0;
        }

        .empty-notice {
          text-align: center;
          padding: 20px;
          font-style: italic;
        }

        .new-comment-block {
          border-top: 1px solid ${theme.colors.gray400};
          margin-top: 5px;
          padding-top: 10px;
        }

        .new-comment-block textarea {
          min-height: 4em;
          width: 100%;
          background-color: transparent;
          padding: 5px 0;
          margin-right: 10px;
          resize: vertical;
        }

        .new-comment-block textarea:focus {
          outline: none;
        }

        .btn-container {
          display: flex;
          align-items: center;
        }

        .btn-container :global(.new-comment-btn) {
          margin-right: 10px;
        }
      `}</style>
    </div>
  )
}

export default Thread
