import React from 'react'
import ReactDOM from 'react-dom'
import CSS from 'csstype'
import DOMPurify from 'dompurify'

import { useCreateCommentMutation } from '../../generated/graphql'
import { Thread as ThreadType } from '../../generated/graphql'
import theme from '../../theme'

type DOMOffsetTarget = {
  x: number
  y: number
  w: number
  h: number
}

type PopoverProps = {
  target: DOMOffsetTarget
}

type ThreadProps = {
  thread: ThreadType
  onNewComment: any
}

type InlineFeedbackPopoverProps = {
  target: DOMOffsetTarget
  thread: ThreadType
  onNewComment: any
}

const VP_PADDING = 20

const Popover: React.FC<PopoverProps> = ({ target, children }) => {
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
    <>
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
          border: 1px solid #dadada;
          box-shadow: #00000045 5px 5px 33px;
          border-radius: 3px;
        }
      `}</style>
    </>
  )

  return ReactDOM.createPortal(popover, popoverRoot)
}

const Thread: React.FC<ThreadProps> = ({ thread, onNewComment }) => {
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

  const sanitizedHTML = DOMPurify.sanitize(thread.highlightedContent)

  return (
    <div className="thread">
      <div className="thread-subject">
        <span className="highlighted-content" dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
      </div>
      <div className="thread-body">
        <div className="comments">
          {thread.comments.map((comment, idx) => {
            return (
              <div className="comment" key={idx}>
                <div className="author-block">
                  <span className="author-identifier">
                    {comment.author.name
                      ? `${comment.author.name} (@${comment.author.handle})`
                      : `@${comment.author.handle}`}
                  </span>
                </div>
                <div className="body-block">{comment.body}</div>
              </div>
            )
          })}

          {!thread.comments.length && <div className="empty-notice">No comments... yet!</div>}
        </div>
        <form onSubmit={createNewComment}>
          <fieldset>
            <div className="new-comment-block">
              <textarea
                placeholder="Add a comment..."
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                disabled={loading}
              />
              <button type="submit" disabled={loading}>
                Submit
              </button>
            </div>
          </fieldset>
        </form>
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
          border-bottom: 1px solid #dadada;
          text-align: center;
          padding: 5px 20px;
        }

        .thread-body {
          flex: 1;
          overflow-y: auto;
        }

        .highlighted-content {
          background-color: ${theme.colors.highlightColor};
        }

        .comments {
          padding: 5px 20px;
        }

        .empty-notice {
          text-align: center;
          padding: 20px;
          font-style: italic;
        }

        .author-block {
          font-weight: bold;
          font-size: 0.75em;
        }

        .new-comment-block {
          display: flex;
          flex-direction: row;
        }

        .new-comment-block textarea {
          flex: 1;
          min-height: 4em;
          background-color: #f9f9f9;
          padding: 0.5em 1em;
          font-family: 'Source Sans Pro', sans-serif;
        }

        .new-comment-block button {
          background-color: #f9f9f9;
          padding: 5px 15px;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

const InlineFeedbackPopover: React.FC<InlineFeedbackPopoverProps> = ({
  target,
  thread,
  onNewComment,
}) => (
  <Popover target={target}>
    <Thread thread={thread} onNewComment={onNewComment} />
  </Popover>
)

export default InlineFeedbackPopover
