import React from 'react'
import ReactDOM from 'react-dom'

import { Thread as ThreadType } from '../../generated/graphql'
import theme from '../../theme'

type InlineFeedbackPopoverProps = {
  position: {
    x: string
    y: string
  }
  thread: ThreadType
}

const InlineFeedbackPopover: React.FC<InlineFeedbackPopoverProps> = ({ position, thread }) => {
  const popoverRoot = document.getElementById('popover-root') as HTMLElement

  const popover = (
    <>
      <div className="popover-container">
        <div className="thread-subject">
          <span className="highlighted-content">{thread.highlightedContent}</span>
        </div>
        <div className="comments">
          {thread.comments.map((comment) => {
            return (
              <div className="comment">
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
      </div>
      <style jsx>{`
        .popover-container {
          position: absolute;
          z-index: 5;
          left: ${position.x};
          top: ${position.y};

          width: 90vw;
          max-width: 480px;
          min-height: 200px;
          max-height: 600px;

          background-color: #f9f9f9;
          border: 1px solid #dadada;
          box-shadow: #00000045 5px 5px 33px;
          border-radius: 3px;
        }

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

  return ReactDOM.createPortal(popover, popoverRoot)
}

export default InlineFeedbackPopover
