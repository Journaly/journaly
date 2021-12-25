import React, { useState } from 'react'
import { useTranslation } from '@/config/i18n'
import FacebookIcon from '@/components/Icons/FacebookIcon'
import InstagramIcon from '@/components/Icons/InstagramIcon'
import YoutubeIcon from '@/components/Icons/YoutubeIcon'
import GlobeIcon from '@/components/Icons/GlobeIcon'
import Badge from '@/components/Badge'
import ExternalLink from '@/components/ExternalLink'
import { sanitize } from '@/utils'
import { languageNameWithDialect } from '@/utils/languages'
import theme from '@/theme'
import {
  useFollowingUsersQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  LanguageLevel,
  ProfileUserFragmentFragment,
} from '@/generated/graphql'
import Button, { ButtonVariant } from '@/components/Button'
import UserAvatar from '@/components/UserAvatar'
import UserListModal from '@/components/Modals/UserListModal'

type Props = {
  user: ProfileUserFragmentFragment
}

const ProfileCard: React.FC<Props> = ({ user }) => {
  const { t } = useTranslation('profile')

  const [displayFollowerListModal, setDisplayFollowerListModal] = useState(false)
  const [displayFollowingListModal, setDisplayFollowingListModal] = useState(false)

  const name = user.name || user.handle
  const showSeparator =
    user.socialMedia?.facebook ||
    user.socialMedia?.instagram ||
    user.socialMedia?.youtube ||
    user.socialMedia?.website

  const speaksList = user.languages.filter((language) => language.level === LanguageLevel.Native)
  const learnsList = user.languages.filter((language) => language.level !== LanguageLevel.Native)

  const speaks = speaksList.map(({ language }) => languageNameWithDialect(language))
  const learns = learnsList.map(({ language }) => languageNameWithDialect(language))
  const likes = user.userInterests.map(({ topic }) => topic.name)

  const location = `${user.city && user.city}${user.city && user.country && ', '}${
    user.country && user.country
  }`

  const { data: { currentUser } = {}, refetch } = useFollowingUsersQuery()

  const hasFollowedAuthor =
    currentUser && currentUser.following.find((u) => u.id === user.id) !== undefined

  const [followUserMutation, { loading: followLoading }] = useFollowUserMutation({
    onCompleted: () => {
      refetch()
    },
  })

  const handleFollowUser = () => {
    followUserMutation({
      variables: {
        followedUserId: user.id,
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
        followedUserId: user.id,
      },
    })
  }

  return (
    <div className="profile-card">
      <div className="profile-card-content">
        <div className="profile-header">
          <h1 className="profile-name">{name}</h1>
          <div className="profile-image-mobile">
            <UserAvatar user={user} size={150} />
          </div>

          <div className="languages-and-interests">
            <p>
              <span>{t('card.speaks')}:</span> {speaks.join(', ')}
            </p>
            <p>
              <span>{t('card.learns')}:</span> {learns.join(', ')}
            </p>
            {user.userInterests.length > 0 && (
              <p>
                <span>{t('card.likes')}:</span> {likes.join(', ')}
              </p>
            )}
          </div>
        </div>

        <div className="profile-body">
          <div className="profile-image-desktop">
            <UserAvatar user={user} size={150} />
          </div>
          {/* User is logged in viewing another user's profile */}
          {currentUser && currentUser.id !== user.id && (
            <Button
              className="follow-btn"
              variant={ButtonVariant.Link}
              onClick={hasFollowedAuthor ? handleUnfollowUser : handleFollowUser}
              loading={followLoading || unfollowLoading}
            >
              {hasFollowedAuthor ? t('unfollow') : t('follow')}
            </Button>
          )}
          {/* User is logged in viewing their own profile */}
          {currentUser && currentUser.id === user.id && (
            <div className="follower-stats-container">
              <Button
                variant={ButtonVariant.Link}
                onClick={() => setDisplayFollowerListModal(true)}
              >
                <span className="follower-stat">{user.followedBy?.length} Followers</span>
              </Button>
              <Button
                variant={ButtonVariant.Link}
                onClick={() => setDisplayFollowingListModal(true)}
              >
                <span className="follower-stat">{user.following?.length} Following</span>
              </Button>
            </div>
          )}

          {user.bio && <p className="bio">{sanitize(user.bio)}</p>}

          <ul className="badge-list">
            {user.badges.map((badge) => (
              <li key={badge.type}>
                <Badge badge={badge} />
              </li>
            ))}
          </ul>
        </div>

        <div className="profile-footer">
          {(user.city || user.country) && (
            <>
              <p className="location">{location}</p>
              {showSeparator && <div className="separator">- -</div>}
            </>
          )}

          <div className="social-links">
            {user.socialMedia?.facebook && (
              <ExternalLink href={user.socialMedia?.facebook} className="social-link">
                <FacebookIcon size={null} style={{ width: '100%', maxWidth: '60px' }} />
              </ExternalLink>
            )}
            {user.socialMedia?.instagram && (
              <ExternalLink href={user.socialMedia?.instagram} className="social-link">
                <InstagramIcon size={null} style={{ width: '100%', maxWidth: '60px' }} />
              </ExternalLink>
            )}
            {user.socialMedia?.youtube && (
              <ExternalLink href={user.socialMedia?.youtube} className="social-link">
                <YoutubeIcon size={null} style={{ width: '100%', maxWidth: '60px' }} />
              </ExternalLink>
            )}
            {user.socialMedia?.website && (
              <ExternalLink href={user.socialMedia?.website} className="social-link">
                <GlobeIcon size={null} style={{ width: '100%', maxWidth: '60px' }} />
              </ExternalLink>
            )}
          </div>
        </div>
      </div>
      {displayFollowerListModal && (
        <UserListModal
          title={`${user.followedBy.length} Followers`}
          users={user.followedBy}
          onClose={() => setDisplayFollowerListModal(false)}
        />
      )}
      {displayFollowingListModal && (
        <UserListModal
          title={`${user.following.length} Following`}
          users={user.following}
          onClose={() => setDisplayFollowingListModal(false)}
        />
      )}
      <style jsx>{`
        .profile-card {
          position: relative;
          color: ${theme.colors.white};
          box-shadow: 0px 8px 10px #00000029;
          overflow-x: visible;
        }

        .profile-card-content {
          position: relative;
          padding: 30px 25px;
          min-height: 100%;
        }

        .profile-card-content::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: -1;
          opacity: 0.75;
          background-image: url('/images/profile/person_using_typewriter.jpg');
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
        }

        .profile-card-content::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: -1;
          background: rgba(0, 0, 0, 0.75);
        }

        .profile-header {
          width: 100%;
          text-align: center;
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .profile-header {
            align-self: flex-start;
            text-align: left;
          }
          .profile-card {
            overflow-x: hidden;
          }
        }
        .profile-body {
          margin: 50px 0;
          text-align: center;
        }
        .profile-body :global(.follow-btn) {
          margin: 0 0 20px;
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .profile-body {
            text-align: center;
          }
        }
        .profile-footer {
          text-align: center;
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .profile-footer {
            text-align: center;
          }
        }

        .profile-name {
          ${theme.typography.headingLG};
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .profile-name {
            margin-bottom: 10px;
          }
        }

        .profile-image-mobile {
          margin: 30px 0 20px;
        }

        @media (min-width: ${theme.breakpoints.MD}) {
          .profile-image-mobile {
            display: none;
          }
        }

        .languages-and-interests {
          text-align: left;
        }

        .languages-and-interests p {
          margin-bottom: 10px;
        }
        .languages-and-interests p:last-child {
          margin-bottom: 0;
        }

        .languages-and-interests span {
          font-weight: bold;
        }

        .profile-image-desktop {
          display: none;
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .profile-image-desktop {
            display: block;
            margin: 0 auto 40px;
          }
        }

        .profile-name,
        .languages-and-interests,
        .bio {
          max-width: 660px;
          margin-left: auto;
          margin-right: auto;
        }

        .badge-list {
          display: flex;
          flex-wrap: wrap;
          margin-top: 10px;
          justify-content: center;
        }

        .badge-list > li {
          margin-right: 5px;
          margin-bottom: 5px;
        }

        .location {
          font-weight: bold;
        }

        .separator {
          margin: 8px 0;
          font-weight: bold;
        }

        .social-links {
          margin: 0 auto;
          display: flex;
          justify-content: center;
          max-width: 320px;
        }

        :global(.social-link) {
          margin-right: 20px;
          flex-shrink: 1;
        }
        :global(.social-link:last-child) {
          margin-right: 0;
        }

        .follower-stats-container {
          display: flex;
          justify-content: center;
          gap: 12px;
        }

        .follower-stat {
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}

export default ProfileCard
