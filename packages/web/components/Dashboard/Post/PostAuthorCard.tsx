import React from 'react'
import Link from 'next/link'
import theme from '@/theme'
import {
  AuthorWithLanguagesFragmentFragment as Author,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useFollowingUsersQuery,
} from '@/generated/graphql'
import { useTranslation } from '@/config/i18n'
import BlankAvatarIcon from '@/components/Icons/BlankAvatarIcon'
import { languageNameWithDialect } from '@/utils/languages'
import Button, { ButtonVariant } from '@/components/Button'
import LevelGauge from '@/components/LevelGauge'

type PostAuthorCardProps = {
  author: Author
}

const PostAuthorCard: React.FC<PostAuthorCardProps> = ({ author }) => {
  const { t } = useTranslation('post-author-card')
  const { languages } = author

  const { data: { currentUser } = {}, refetch } = useFollowingUsersQuery()

  const hasFollowedAuthor =
    currentUser && currentUser.following.find((user) => user.id === author.id) !== undefined

  const [followUserMutation, { loading: followLoading }] = useFollowUserMutation({
    onCompleted: () => {
      refetch()
    },
  })

  const handleFollowUser = () => {
    followUserMutation({
      variables: {
        followedUserId: author.id,
      },
    })
  }

  const [unfollowUserMutation, { loading: unfollowLoading }] = useUnfollowUserMutation({
    onCompleted: () => {
      refetch()
    },
  })

  const handleUnfollowUser = () => {
    unfollowUserMutation({
      variables: {
        followedUserId: author.id,
      },
    })
  }

  return (
    <div className="container">
      <div className="author-info-container">
        <Link href={`/dashboard/profile/[id]`} as={`/dashboard/profile/${author.id}`}>
          <a className="author-info">
            {author.profileImage ? (
              <img src={author.profileImage} alt="" />
            ) : (
              <BlankAvatarIcon size={60} />
            )}
          </a>
        </Link>
        <p className="author-name">{author.name || author.handle}</p>
        {currentUser && currentUser.id !== author.id && (
          <Button
            variant={ButtonVariant.Link}
            onClick={hasFollowedAuthor ? handleUnfollowUser : handleFollowUser}
            loading={followLoading || unfollowLoading}
          >
            {hasFollowedAuthor ? t('unfollow') : t('follow')}
          </Button>
        )}
      </div>
      <div className="language-info">
        <p className="author-info-heading">{t('languagesHeader')}</p>
        <ul className="language-list">
          {languages.map((language) => {
            return (
              <li key={language.language.id}>
                <span>{languageNameWithDialect(language.language)}</span>
                <LevelGauge level={language.level} />
              </li>
            )
          })}
        </ul>
      </div>
      <div className="stats">
        <ul>
          <li className="author-info-heading">
            {author.postsWrittenCount}{' '}
            {author.postsWrittenCount === 1
              ? t('postsWrittenCountSingular')
              : t('postsWrittenCountPlural')}
          </li>
          <li className="author-info-heading">
            {author.thanksReceivedCount}{' '}
            {author.thanksReceivedCount === 1
              ? t('thanksReceivedCountSingular')
              : t('thanksReceivedCountPlural')}
          </li>
        </ul>
      </div>
      <style jsx>{`
        .container {
          background-color: ${theme.colors.white};
          box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
          width: 100%;
          height: 100%;
          padding: 20px;
          margin-bottom: 25px;
        }

        @media (min-width: ${theme.breakpoints.XS}) {
          .container {
            width: 38%;
            margin-bottom: 0;
          }
        }

        .author-info-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-bottom: 10px;
          margin-bottom: 5px;
          border-bottom: 1px solid ${theme.colors.gray400};
          font-weight: 600;
        }

        .author-info img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
        }

        .author-info :global(svg) {
          border-radius: 50%;
          background-color: ${theme.colors.blueLight};
        }

        .author-info-heading {
          font-size: 11px;
          text-transform: uppercase;
          line-height: 1;
          font-weight: 600;
          margin-top: 10px;
        }

        .language-info {
          padding-bottom: 8px;
          border-bottom: 1px solid ${theme.colors.gray400};
        }

        .language-list {
          display: flex;
          flex-wrap: wrap;
        }

        .language-list li {
          display: inline-block;
          margin-right: 8px;
        }
      `}</style>
    </div>
  )
}

export default PostAuthorCard
