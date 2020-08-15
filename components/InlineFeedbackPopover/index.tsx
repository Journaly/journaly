import React from 'react'
import ReactDOM from 'react-dom'
import CSS from 'csstype'

import theme from '../../theme'
import { sanitize } from '../../utils'
import {
  useCreateCommentMutation,
  UserFragmentFragment as UserType,
  ThreadFragmentFragment as ThreadType,
} from '../../generated/graphql'
import Comment from './Comment'
import Button from '../../elements/Button'

type DOMOffsetTarget = {
  x: number
  y: number
  w: number
  h: number
}

type PopoverProps = {
  target: DOMOffsetTarget
  children: JSX.Element[] | JSX.Element
}

type ThreadProps = {
  thread: ThreadType
  onNewComment: any
  onUpdateComment: any
  currentUser: UserType | null | undefined
}

type InlineFeedbackPopoverProps = {
  target: DOMOffsetTarget
  thread: ThreadType
  currentUser: UserType | null | undefined
  onNewComment: any
  onUpdateComment: any
}

const VP_PADDING = 20

const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(({ target, children }, ref) => {
  const popoverRoot = document.getElementById('popover-root') as HTMLElement

  const ownPosition: CSS.Properties = {}

  const vpw = document.documentElement.clientWidth
  const vph = document.documentElement.clientHeight
  const st = document.documentElement.scrollTop
  const dh = document.documentElement.offsetHeight

  const ownWidth = Math.min(vpw - VP_PADDING * 2, 480)
  const ownHeight = Math.min(vph - VP_PADDING * 2, 300)

  const tCenterX = target.x + target.w / 2

  const rTop = target.y - st
  const rBottom = vph + st - (target.y + target.h)

  if (rTop > rBottom) {
    ownPosition.bottom = `${dh - target.y + 5}px`
  } else {
    ownPosition.top = `${target.y + target.h + 5}px`
  }

  const idealX = tCenterX - ownWidth / 2

  if (idealX < VP_PADDING) {
    ownPosition.left = `${VP_PADDING}px`
  } else if (idealX + ownWidth > vpw - VP_PADDING) {
    ownPosition.left = `${vpw - ownWidth - VP_PADDING}px`
  } else {
    ownPosition.left = `${idealX}px`
  }

  const popover = (
    <div ref={ref}>
      <div className="popover-container" style={ownPosition}>
        {children}
      </div>
      <style jsx>{`
        .popover-container {
          position: absolute;
          z-index: 100;
          display: flex;
          flex-direction: column;

          width: ${ownWidth}px;
          max-height: ${ownHeight}px;

          background-color: #f9f9f9;
          border: 1px solid ${theme.colors.gray400};
          box-shadow: #00000045 5px 5px 33px;
          border-radius: 3px;
        }
      `}</style>
    </div>
  )

  return ReactDOM.createPortal(popover, popoverRoot)
})

const Thread: React.FC<ThreadProps> = ({ thread, onNewComment, onUpdateComment, currentUser }) => {
  const [commentBody, setCommentBody] = React.useState<string>('')
  const [createComment, { loading }] = useCreateCommentMutation({
    onCompleted: () => {
      onNewComment()
      setCommentBody('')
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
              />
            )
          })}

          {!thread.comments.length && <div className="empty-notice">No comments... yet!</div>}
        </div>
        {currentUser && (
          <form onSubmit={createNewComment}>
            <fieldset>
              <div className="new-comment-block">
                <textarea
                  placeholder="Add a comment..."
                  value={commentBody}
                  onChange={(e) => setCommentBody(e.target.value)}
                  disabled={loading}
                />
                <Button type="submit" disabled={loading} className="submit-btn">
                  Submit
                </Button>
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
          display: flex;
          flex-direction: row;
          border-top: 1px solid ${theme.colors.gray400};
          margin-top: 5px;
        }

        .new-comment-block textarea {
          flex: 1;
          min-height: 4em;
          background-color: #f9f9f9;
          padding: 5px 0;
          font-family: 'Source Sans Pro', sans-serif;
          margin-right: 10px;
        }

        .new-comment-block textarea:focus {
          outline: none;
        }
      `}</style>
    </div>
  )
}

const InlineFeedbackPopover = React.forwardRef<HTMLDivElement, InlineFeedbackPopoverProps>(
  ({ target, thread, onNewComment, onUpdateComment, currentUser }, ref) => (
    <Popover target={target} ref={ref}>
      <Thread
        thread={thread}
        onNewComment={onNewComment}
        onUpdateComment={onUpdateComment}
        currentUser={currentUser}
      />
    </Popover>
  ),
)

export default InlineFeedbackPopover
