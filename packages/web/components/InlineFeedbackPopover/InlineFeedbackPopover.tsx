import React from 'react'

import Popover, { DOMOffsetTarget } from '@/components/Popover'
import Thread, { ThreadProps } from './Thread'

type InlineFeedbackPopoverProps = ThreadProps & {
  target: DOMOffsetTarget
}

const InlineFeedbackPopover = React.forwardRef<HTMLDivElement, InlineFeedbackPopoverProps>(
  ({ target, ...rest }, ref) => {
    return (
      <Popover target={target} ref={ref}>
        <Thread {...rest} />
      </Popover>
    )
  },
)

export default InlineFeedbackPopover
