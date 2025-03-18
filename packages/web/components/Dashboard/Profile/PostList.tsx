import React from 'react'
import { useTranslation, Trans } from 'next-i18next'
import {
  PostCardFragmentFragment as PostType,
  UserWithLanguagesFragmentFragment as UserType,
} from '@/generated/graphql'
import TranslationLink from '@/components/TranslationLink'
import PostCard from '../PostCard'

type Props = {
  isLoggedInUser: boolean
  user: UserType
  posts: PostType[]
}

const PostList: React.FC<Props> = ({ isLoggedInUser, user, posts }) => {
  const { t } = useTranslation(['profile'])

  return (
    <div className="post-list">
      {posts.length ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <div className="empty-list">
          {isLoggedInUser ? (
            <Trans>
              You have no recent posts.{' '}
              <TranslationLink href="/new-post">Write a new post</TranslationLink>!
            </Trans>
          ) : (
            t('emptyPosts', { user: user.name || user.handle })
          )}
        </div>
      )}

      <style jsx>{`
        .post-list {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .post-list :global(.post-card-container) {
          margin-bottom: 50px;
        }
        .post-list :global(.post-card-container:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  )
}

export default PostList
