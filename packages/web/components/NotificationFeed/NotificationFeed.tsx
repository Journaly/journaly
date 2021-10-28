import React from 'react'
import { UserFragmentFragment as UserType } from '@/generated/graphql'
import Popover, { DOMOffsetTarget } from '@/components/Popover'

type NotificationFeedProps = {
  target: DOMOffsetTarget
  currentUser: UserType | null | undefined
}

const NotificationFeed = React.forwardRef<HTMLDivElement, NotificationFeedProps>(
  ({ target, currentUser }, ref) => {
    console.log('feed open!')
    return (
      <Popover target={target} ref={ref}>
        <div>Notification 1</div>
        <div>Notification 2</div>
      </Popover>
    )
  },
)

export default NotificationFeed
