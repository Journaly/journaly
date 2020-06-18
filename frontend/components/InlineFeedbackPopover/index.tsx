import React from 'react'
import ReactDOM from 'react-dom'

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
}

type InlineFeedbackPopoverProps = {
  target: DOMOffsetTarget
  thread: ThreadType
}

const VP_PADDING = 20

const Popover: React.FC<PopoverProps> = ({ target, children }) => {
  const popoverRoot = document.getElementById('popover-root') as HTMLElement

  let x, y

  const vpw = window.visualViewport.width
  const vph = window.visualViewport.height
  const st = document.documentElement.scrollTop

  const ownWidth = Math.min(vpw - VP_PADDING * 2, 480)
  const ownHeight = Math.min(vph - VP_PADDING * 2, 300)

  const tCenterX = target.x + target.w / 2

  const rTop = target.y - st
  const rBottom = vph + st - (target.y + target.h)

  if (rTop > rBottom) {
    y = target.y - ownHeight - 5
  } else {
    y = target.y + target.h + 5
  }

  const idealX = tCenterX - ownWidth / 2

  if (idealX < VP_PADDING) {
    x = VP_PADDING
  } else if (idealX + ownWidth > vpw - VP_PADDING) {
    x = vpw - ownWidth - VP_PADDING
  } else {
    x = idealX
  }

  const popover = (
    <>
      <div className="popover-container">{children}</div>
      <style jsx>{`
        .popover-container {
          position: absolute;
          z-index: 5;
          left: ${x}px;
          top: ${y}px;

          width: ${ownWidth}px;
          height: ${ownHeight}px;

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

const Thread: React.FC<ThreadProps> = ({ thread }) => (
  <>
    <div className="thread-subject">
      <span className="highlighted-content">{thread.highlightedContent}</span>
    </div>
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
    </div>
    <style jsx>{`
      .thread-subject {
        border-bottom: 1px solid #dadada;
        border-bottom: 1px solid #dadada;
        text-align: center;
        padding: 5px 20px;
      }

      .highlighted-content {
        background-color: ${theme.colors.highlightColor};
      }

      .comments {
        padding: 5px 20px;
      }

      .author-block {
        font-weight: bold;
        font-size: 0.75em;
      }
    `}</style>
  </>
)

const InlineFeedbackPopover: React.FC<InlineFeedbackPopoverProps> = ({ target, thread }) => (
  <Popover target={target}>
    <Thread thread={thread} />
  </Popover>
)

export default InlineFeedbackPopover
