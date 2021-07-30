import React from 'react'
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
  ProfileUserFragmentFragment
} from '@/generated/graphql'
import BlankAvatarIcon from '@/components/Icons/BlankAvatarIcon'
import Button, { ButtonVariant } from '@/components/Button'

type Props = {
  user: ProfileUserFragmentFragment
}

const ProfileCard: React.FC<Props> = ({ user }) => {
  const { t } = useTranslation('profile')

  const sampleUser = {
    likes: ['cooking, reading, movies, design'],
  }

  const name = user.name || user.handle
  const showSeparator =
    user.socialMedia?.facebook ||
    user.socialMedia?.instagram ||
    user.socialMedia?.youtube ||
    user.socialMedia?.website
  const profileImage = user.profileImage

  const speaksList = user.languages.filter((language) => language.level === LanguageLevel.Native)
  const learnsList = user.languages.filter((language) => language.level !== LanguageLevel.Native)

  const speaks = speaksList.map(({ language }) => languageNameWithDialect(language))
  const learns = learnsList.map(({ language }) => languageNameWithDialect(language))

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
      <div className="profile-header">
        <h1 className="profile-name">{name}</h1>

        {profileImage ? (
          <img className="profile-image-mobile" src={profileImage} />
        ) : (
          <BlankAvatarIcon className="blank-avatar-mobile" size={130} />
        )}

        <div className="languages-and-interests">
          <p>
            <span>{t('card.speaks')}:</span> {speaks.join(', ')}
          </p>
          <p>
            <span>{t('card.learns')}:</span> {learns.join(', ')}
          </p>
          {/* {sampleUser.likes.length && (
            <p>
              <span>{t('card.likes')}:</span> {sampleUser.likes.join(', ')}
            </p>
          )} */}
          {sampleUser.likes.length && (
            <p>
              <span>{t('card.likes')}:</span> languages, journaling
            </p>
          )}
        </div>
      </div>

      <div className="profile-body">
        {profileImage ? (
          <img className="profile-image-desktop" src={profileImage} />
        ) : (
          <BlankAvatarIcon className="blank-avatar-desktop" size={130} />
        )}

        {user.bio && <p className="bio">{sanitize(user.bio)}</p>}

        <ul className="badge-list">
          {user.badges.map((badge) => (
            <li key={badge.type}>
              <Badge badge={badge} />
            </li>
          ))}
        </ul>

        { currentUser && currentUser.id !== user.id &&
          <Button
            className="follow-btn"
            variant={ButtonVariant.Primary}
            onClick={hasFollowedAuthor ? handleUnfollowUser : handleFollowUser}
            loading={followLoading || unfollowLoading}
          >
            {hasFollowedAuthor ? t('Unfollow') : t('Follow')}
          </Button>
        }
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

      <style jsx>{`
        .profile-card {
          position: relative;
          padding: 30px 25px;
          color: ${theme.colors.white};
          box-shadow: 0px 8px 10px #00000029;
        }

        .profile-card::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: -1;
          opacity: 0.75;
          background-image: url('/images/profile/person_using_typewriter.jpg');
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
        }

        .profile-card::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
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
        }
        .profile-body {
          margin: 50px 0;
          text-align: center;
        }
        .profile-body :global(.follow-btn) {
          margin: 20px auto;
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

        .profile-card :global(.blank-avatar-mobile),
        .profile-card :global(.blank-avatar-desktop) {
          border-radius: 50%;
          background-color: ${theme.colors.blueLight};
        }

        .profile-image-mobile,
        .profile-image-desktop {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
        }
        .profile-image-mobile,
        .profile-card :global(.blank-avatar-mobile) {
          margin: 30px 0 20px;
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .profile-image-mobile {
            display: none;
          }
          .profile-card :global(.blank-avatar-mobile) {
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
        .profile-card :global(.blank-avatar-desktop) {
          display: none;
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .profile-image-desktop {
            display: block;
            margin: 0 auto 40px;
          }

          .profile-card :global(.blank-avatar-desktop) {
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
      `}</style>
    </div>
  )
}

export default ProfileCard
