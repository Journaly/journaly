import React from 'react'
import { useTranslation, Trans } from '@/config/i18n'
import {
  PostCardFragmentFragment as PostType,
  UserWithLanguagesFragmentFragment as UserType,
} from '@/generated/graphql'
import {
  layoutTopBottomPadding,
  layoutLeftRightPadding,
} from '@/components/Dashboard/dashboardConstants'
import TranslationLink from '@/components/TranslationLink'
import PostCard from '../PostCard'
import theme from '@/theme'

type Props = {
  isLoggedInUser: boolean
  user: UserType
  posts: PostType[]
}

const PostList: React.FC<Props> = ({ isLoggedInUser, user, posts }) => {
  const { t } = useTranslation(['profile'])

  return (
    <div className="post-list">
      <h1 className="posts-title">{t('postsTitle')}</h1>

      {posts.length ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <div className="empty-list">
          {isLoggedInUser ? (
            <Trans>
              You have no recent posts.{' '}
              <TranslationLink href="/dashboard/new-post">Write a new post</TranslationLink>!
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
          padding: 0 ${layoutLeftRightPadding} ${layoutTopBottomPadding};
          background-color: ${theme.colors.white};
          box-shadow: 0px 8px 10px #00000029;
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .post-list {
            padding: 25px;
            border-top: 0;
            overflow: auto;
          }
        }

        .posts-title {
          margin: 40px 0;
          ${theme.typography.headingLG};
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .posts-title {
            margin: 5px 0 40px;
          }
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
