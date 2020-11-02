import React from 'react'
import { useTranslation } from '../../../config/i18n'
import FacebookIcon from '../../../components/Icons/FacebookIcon'
import InstagramIcon from '../../../components/Icons/InstagramIcon'
import YoutubeIcon from '../../../components/Icons/YoutubeIcon'
import GlobeIcon from '../../../components/Icons/GlobeIcon'
import ExternalLink from '../../../elements/ExternalLink'
import { sanitize } from '../../../utils'
import { languageNameWithDialect } from '../../../utils/languages'
import theme from '../../../theme'
import { ProfileUserFragmentFragment as UserType, LanguageLevel } from '../../../generated/graphql'
import BlankAvatarIcon from '../../Icons/BlankAvatarIcon'

type Props = {
  user: UserType
}

const ProfileCard: React.FC<Props> = ({ user }) => {
  const { t } = useTranslation('profile')
  
  const sampleUser = {
    likes: ['cooking, reading, movies, design'],
    location: 'San Francisco, United States',
    facebook: 'https://www.facebook.com/robinmacpherson.co',
    instagram: 'https://instagram.com/my-link',
    youtube: 'https://www.youtube.com/user/TheLifeOfRob/',
    website: 'https://robinmacpherson.com',
  }

  const name = user.name || user.handle
  const showSeparator =
    sampleUser.facebook || sampleUser.instagram || sampleUser.youtube || sampleUser.website
  const profileImage = user.profileImage
  
  const speaksList = user.languages.filter((language) => language.level === LanguageLevel.Native)
  const learnsList = user.languages.filter((language) => language.level !== LanguageLevel.Native)

  const speaks = speaksList.map(({ language }) => languageNameWithDialect(language))
  const learns = learnsList.map(({ language }) => languageNameWithDialect(language))

  console.log(user.badges)

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
      </div>

      <div className="profile-footer">
        {sampleUser.location && (
          <>
            <p className="location">{sampleUser.location}</p>
            {showSeparator && <div className="separator">- -</div>}
          </>
        )}

        <div className="social-links">
          {sampleUser.facebook && (
            <ExternalLink href={sampleUser.facebook} className="social-link">
              <FacebookIcon />
            </ExternalLink>
          )}
          {sampleUser.instagram && (
            <ExternalLink href={sampleUser.instagram} className="social-link">
              <InstagramIcon />
            </ExternalLink>
          )}
          {sampleUser.youtube && (
            <ExternalLink href={sampleUser.youtube} className="social-link">
              <YoutubeIcon />
            </ExternalLink>
          )}
          {sampleUser.website && (
            <ExternalLink href={sampleUser.website} className="social-link">
              <GlobeIcon />
            </ExternalLink>
          )}
        </div>
      </div>

      <style jsx>{`
        .profile-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 30px 25px;
          color: ${theme.colors.white};
          box-shadow: 0px 8px 10px #00000029;
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .profile-card {
            justify-content: space-between;
          }
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

        .languages-and-interests,
        .bio {
          max-width: 660px;
          margin-left: auto;
          margin-right: auto;
        }

        .location {
          font-weight: bold;
        }

        .separator {
          margin: 8px 0;
          font-weight: bold;
        }

        .social-links {
          display: flex;
          justify-content: space-between;
          max-width: 320px;
        }

        :global(.social-link) {
          margin-right: 20px;
        }
        :global(.social-link:last-child) {
          margin-right: 0;
        }
      `}</style>
    </div>
  )
}

export default ProfileCard
