import React, { useState } from 'react'

import {
  useCreatePostCommentMutation,
  PostCommentFragmentFragment as PostCommentType,
  UserWithLanguagesFragmentFragment as UserType,
  ThreadFragmentFragment as ThreadType,
} from '../../../generated/graphql'
import { useTranslation } from '../../../config/i18n'

import theme from '../../../theme'
import PostComment from './PostComment'
import Thread from '../../InlineFeedbackPopover/Thread'
import Button, { ButtonVariant } from '../../../elements/Button'
import TabToggle from '../../../elements/TabToggle'

type PostCommentsProps = {
  postId: number
  comments: PostCommentType[]
  outdatedThreads: ThreadType[]
  currentUser: UserType | null
  onNewComment: () => void
  onUpdateComment: () => void
  onDeleteComment: () => void
}

const PostComments: React.FC<PostCommentsProps> = ({
  postId,
  comments,
  outdatedThreads,
  onNewComment,
  onUpdateComment,
  onDeleteComment,
  currentUser,
}) => {
  const { t } = useTranslation('comment')

  const tabs = [
    { key: 'general', text: 'General' },
    { key: 'outdated', text: 'Outdated' },
  ]

  const [activeKey, setActiveKey] = useState<string>(tabs[0].key)

  const handleToggle = (key: string): void => {
    setActiveKey(key)
  }

  const [postCommentBody, setPostCommentBody] = React.useState<string>('')
  const [createPostComment, { loading }] = useCreatePostCommentMutation({
    onCompleted: () => {
      onNewComment()
      setPostCommentBody('')
    },
  })

  const createNewPostComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    createPostComment({
      variables: {
        postId,
        body: postCommentBody,
      },
    })
  }

  return (
    <div className="container">
      <h1>{t('postCommentsTitle')}</h1>
      <div className="toggle-wrapper">
        <TabToggle activeKey={activeKey} tabs={tabs} onToggle={handleToggle} />
      </div>
      <div>
        {activeKey === 'general' ? (
          <>
            <div className="post-comments">
              {!comments.length && <div>{t('noCommentsYetMessage')}</div>}
              {comments.map((comment, idx) => {
                const canEdit = currentUser?.id === comment.author.id
                return (
                  <PostComment
                    comment={comment}
                    canEdit={canEdit}
                    onUpdateComment={onUpdateComment}
                    onDeleteComment={onDeleteComment}
                    key={idx}
                  />
                )
              })}
            </div>
            {currentUser && (
              <form onSubmit={createNewPostComment}>
                <div className="new-comment-block">
                  <textarea
                    placeholder={t('addCommentPlaceholder')}
                    value={postCommentBody}
                    onChange={(e) => setPostCommentBody(e.target.value)}
                    disabled={loading}
                    rows={4}
                  />
                  <Button
                    type="submit"
                    loading={loading}
                    className="submit-btn"
                    variant={ButtonVariant.PrimaryDark}
                  >
                    {t('submit')}
                  </Button>
                </div>
              </form>
            )}
          </>
        ) : (
          <div className="outdated-comments-container">
            {!outdatedThreads.length && <div>No outdated threads to see</div>}
            {outdatedThreads.map((thread, idx) => (
              <div className="archived-thread-container">
                <Thread
                  thread={thread}
                  currentUser={currentUser}
                  key={idx}
                  onNewComment={() => {}}
                  onDeleteThread={() => {}}
                  onUpdateComment={onUpdateComment}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        .container {
          background-color: ${theme.colors.white};
          box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
          width: 100%;
          height: 100%;
          padding: 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          max-height: 100%;
        }

        @media (min-width: ${theme.breakpoints.XS}) {
          .container {
            width: 58%;
          }
        }

        h1 {
          ${theme.typography.headingLG};
          margin-bottom: 20px;
        }

        .post-comments {
          margin-bottom: 5px;
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
        }

        .new-comment-block textarea {
          min-height: 4em;
          width: 100%;
          padding: 5px;
          background-color: transparent;
          margin-top: 10px;
          margin-right: 10px;
          resize: vertical;
        }

        .new-comment-block textarea:focus {
          outline: none;
        }

        .toggle-wrapper {
          margin: 0 auto 20px;
        }

        .archived-thread-container {
          margin-bottom: 20px;
          box-shadow: 0px 3px 4px #00000029;
        }
      `}</style>
    </div>
  )
}

export default PostComments
