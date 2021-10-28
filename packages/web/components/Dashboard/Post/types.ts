import {
  PostWithTopicsFragmentFragment as PostType,
  CurrentUserFragmentFragment as UserType,
  ThreadFragmentFragment,
} from '@/generated/graphql'

export type PostProps = {
  post: PostType
  currentUser: UserType | null | undefined
  refetch: any
}

export type CommentSelectionButtonProps = {
  position: {
    x: string
    y: string
  }
  display: boolean
  onClick: React.MouseEventHandler
}

export type SelectionState = {
  bouncing: boolean
  lastTimeout: number | null
}

export type PostContentProps = {
  body: string
}

export type ThreadType = ThreadFragmentFragment
