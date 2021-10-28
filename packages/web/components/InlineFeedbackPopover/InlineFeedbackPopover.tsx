import React from 'react'

import {
  ThreadFragmentFragment as ThreadType,
  UserFragmentFragment as UserType,
} from '@/generated/graphql'
import { gtag } from '@/components/GoogleAnalytics'
import Popover, { DOMOffsetTarget } from './Popover'
import Thread from './Thread'

type InlineFeedbackPopoverProps = {
  target: DOMOffsetTarget
  thread: ThreadType
  currentUser: UserType | null | undefined
  onNewComment: () => void
  onUpdateComment: () => void
  onDeleteThread: () => void
}

const InlineFeedbackPopover = React.forwardRef<HTMLDivElement, InlineFeedbackPopoverProps>(
  ({ target, thread, onNewComment, onUpdateComment, onDeleteThread, currentUser }, ref) => {
    React.useEffect(() => {
      gtag('event', 'open_thread', { event_label: `thread#${thread.id}` })
    }, [thread.id])

    return (
      <Popover target={target} ref={ref}>
        <Thread
          thread={thread}
          onNewComment={onNewComment}
          onUpdateComment={onUpdateComment}
          currentUser={currentUser}
          onDeleteThread={onDeleteThread}
        />
      </Popover>
    )
  },
)

export default InlineFeedbackPopover
