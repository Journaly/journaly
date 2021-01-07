import React from 'react'
import ReactDOM from 'react-dom'
import CSS from 'csstype'

import {
  ThreadFragmentFragment as ThreadType,
  UserFragmentFragment as UserType,
} from '@/generated/graphql'

import Thread from './Thread'

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

type InlineFeedbackPopoverProps = {
  target: DOMOffsetTarget
  thread: ThreadType
  currentUser: UserType | null | undefined
  onNewComment: () => void
  onUpdateComment: () => void
  onDeleteThread: () => void
}

const VP_PADDING = 20

const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(({ target, children }, ref) => {
  const [rerenderCount, setRerenderCount] = React.useState<number>(0)
  const popoverRoot = document.getElementById('popover-root')

  if (!popoverRoot) {
    // Re-render until we can actually get a popover root to render into. Unclear
    // what situation would cause popover root to not show up before this but
    // hey, not a bad check to do.
    if (rerenderCount < 10) {
      setTimeout(() => setRerenderCount((i) => i + 1), 500)
    }
    return null
  }

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
          border: none;
          box-shadow: #00000045 5px 5px 33px;
          border-radius: 3px;
        }
      `}</style>
    </div>
  )

  return ReactDOM.createPortal(popover, popoverRoot)
})

const InlineFeedbackPopover = React.forwardRef<HTMLDivElement, InlineFeedbackPopoverProps>(
  ({ target, thread, onNewComment, onUpdateComment, onDeleteThread, currentUser }, ref) => (
    <Popover target={target} ref={ref}>
      <Thread
        thread={thread}
        onNewComment={onNewComment}
        onUpdateComment={onUpdateComment}
        currentUser={currentUser}
        onDeleteThread={onDeleteThread}
      />
    </Popover>
  ),
)

export default InlineFeedbackPopover
