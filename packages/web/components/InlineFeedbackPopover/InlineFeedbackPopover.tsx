import React from 'react'

import Popover, { DOMOffsetTarget } from '@/components/Popover'
import Thread, { ThreadProps } from './Thread'

type InlineFeedbackPopoverProps = ThreadProps & {
  target: DOMOffsetTarget
  currentInPostContent: string
}

const InlineFeedbackPopover = React.forwardRef<HTMLDivElement, InlineFeedbackPopoverProps>(
  ({ target, currentInPostContent, ...rest }, ref) => {
    return (
      <Popover target={target} ref={ref}>
        <Thread currentInPostContent={currentInPostContent} {...rest} />
      </Popover>
    )
  },
)

export default InlineFeedbackPopover
