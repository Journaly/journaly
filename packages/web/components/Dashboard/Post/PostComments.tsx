import React, { useState } from 'react'

import cloneDeep from 'lodash/cloneDeep'
import { toast } from 'react-toastify'
import {
  useCreatePostCommentMutation,
  PostCommentFragmentFragment as PostCommentType,
  UserWithLanguagesFragmentFragment as UserType,
  ThreadFragmentFragment as ThreadType,
  PostPageDocument,
  PostPageQuery,
  PostPageQueryVariables,
  LanguageLevel,
} from '@/generated/graphql'
import { useTranslation } from '@/config/i18n'

import theme from '@/theme'
import PostComment from './PostComment'
import Thread from '@/components/InlineFeedbackPopover/Thread'
import Button, { ButtonVariant } from '@/components/Button'
import TabToggle from '@/components/TabToggle'
import Textarea from '@/components/Textarea'
import useUILanguage from '@/hooks/useUILanguage'
import { generateNegativeRandomNumber } from '@/utils/number'

type PostCommentsProps = {
  postId: number
  comments: PostCommentType[]
  outdatedThreads: ThreadType[]
  currentUser: UserType | null
  onUpdateComment: () => void
  onDeleteComment: () => void
}

const PostComments = ({
  postId,
  comments,
  outdatedThreads,
  onUpdateComment,
  onDeleteComment,
  currentUser,
}: PostCommentsProps) => {
  const uiLanguage = useUILanguage()
  const { t } = useTranslation('comment')

  const tabs = [
    { key: 'general', text: t('tabGeneralKey') },
    { key: 'outdated', text: t('tabOutdatedKey') },
  ]

  const [activeKey, setActiveKey] = useState(tabs[0].key)
  const [postCommentBody, setPostCommentBody] = useState('')

  const handleToggle = (key: string) => {
    setActiveKey(key)
  }

  const [createPostComment, { loading }] = useCreatePostCommentMutation({
    onError: (error) => {
      toast.error(error.message)
    },
    update: (cache, mutationResult) => {
      if (mutationResult.data?.createPostComment) {
        const data = cache.readQuery<PostPageQuery, PostPageQueryVariables>({
          query: PostPageDocument,
          variables: { id: postId, uiLanguage },
        })

        if (data?.postById) {
          const dataClone = cloneDeep(data)
          dataClone.postById.postComments = [
            ...dataClone.postById.postComments,
            mutationResult.data.createPostComment,
          ]

          cache.writeQuery({ query: PostPageDocument, data: dataClone })
        }
      }
    },
  })

  const createNewPostComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    createPostComment({
      variables: {
        postId,
        body: postCommentBody,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createPostComment: {
          __typename: 'PostComment',
          authorLanguageLevel: LanguageLevel.Beginner,
          author: {
            __typename: 'User',
            handle: currentUser!.handle,
            id: currentUser!.id,
          },
          id: generateNegativeRandomNumber(),
          createdAt: new Date().toISOString(),
          body: postCommentBody,
        },
      },
    })
    setPostCommentBody('')
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
              {comments.map((comment) => {
                const canEdit = currentUser?.id === comment.author.id && comment.id > 0

                return (
                  <PostComment
                    comment={comment}
                    canEdit={canEdit}
                    onDeleteComment={onDeleteComment}
                    onUpdateComment={onUpdateComment}
                    key={comment.id}
                  />
                )
              })}
            </div>
            {currentUser && (
              <form onSubmit={createNewPostComment}>
                <div className="new-comment-block">
                  <Textarea
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
                    title="ctrl + enter"
                  >
                    {t('submit')}
                  </Button>
                </div>
              </form>
            )}
          </>
        ) : (
          <div className="outdated-comments-container">
            {!outdatedThreads.length && <div>{t('noOutdatedThreadsMessage')}</div>}
            {outdatedThreads.map((thread) => (
              <div className="archived-thread-container" key={thread.id}>
                <Thread
                  thread={thread}
                  currentUser={currentUser}
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

        .new-comment-block :global(textarea) {
          min-height: 4em;
          width: 100%;
          padding: 5px;
          background-color: transparent;
          margin-top: 10px;
          margin-right: 10px;
          resize: vertical;
        }

        .new-comment-block :global(textarea:focus) {
          outline: none;
        }

        .toggle-wrapper {
          margin: 0 auto 20px;
        }

        .archived-thread-container {
          margin-bottom: 20px;
          box-shadow: 0px 0px 12px #00000029;
        }
      `}</style>
    </div>
  )
}

export default PostComments
