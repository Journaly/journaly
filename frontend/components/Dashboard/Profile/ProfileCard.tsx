import React from 'react'
import { useTranslation } from '../../../config/i18n'
import XIcon from '../../../components/Icons/XIcon'
import ExternalLink from '../../../elements/ExternalLink'
import theme from '../../../theme'

const ProfileCard: React.FC = () => {
  const { t } = useTranslation('profile')

  const user = {
    name: 'Avocado 🥑 King 🤴🏼',
    handle: 'avocado-me',
    image: '/images/robin-small.png',
    speaks: ['English'],
    learns: ['Japanese, French'],
    likes: ['cooking, reading, movies, design'],
    bio:
      'Praesent commodo a quis at dui taciti sagittis senectus inceptos nascetur, dictumst accumsan quam tortor dictum in ultrices natoque sodales, venenatis et iaculis aliquet blandit mi mauris faucibus molestie. Libero suspendisse urna placerat elit non est metus vivamus justo, duis nam ridiculus mattis eu gravida tellus curae, maecenas nisi pellentesque elementum imperdiet mus ac varius.',
    location: 'San Francisco, United States',
    facebook: 'https://www.facebook.com/robinmacpherson.co',
    instagram: 'https://instagram.com/my-link',
    youtube: 'https://www.youtube.com/user/TheLifeOfRob/',
    website: 'https://robinmacpherson.com',
  }

  const name = user.name || user.handle
  const showSeparator = user.facebook || user.instagram || user.youtube || user.website

  return (
    <div className="profile-card">
      <div className="profile-header">
        <h1 className="profile-name">{name}</h1>

        <img className="profile-image-mobile" src={user.image} />

        <div className="languages-and-interests">
          <p>
            <span>{t('card.speaks')}:</span> {user.speaks.join(', ')}
          </p>
          <p>
            <span>{t('card.learns')}:</span> {user.learns.join(', ')}
          </p>
          {user.likes.length && (
            <p>
              <span>{t('card.likes')}:</span> {user.likes.join(', ')}
            </p>
          )}
        </div>
      </div>

      <div className="profile-body">
        <img className="profile-image-desktop" src={user.image} />

        {user.bio && <p className="bio">{user.bio}</p>}
      </div>

      <div className="profile-footer">
        {user.location && (
          <>
            <p className="location">{user.location}</p>
            {showSeparator && <div className="separator">- -</div>}
          </>
        )}

        <div className="social-links">
          {user.facebook && (
            <ExternalLink href={user.facebook} className="social-link">
              <XIcon color={theme.colors.white} />
            </ExternalLink>
          )}
          {user.instagram && (
            <ExternalLink href={user.instagram} className="social-link">
              <XIcon color={theme.colors.white} />
            </ExternalLink>
          )}
          {user.youtube && (
            <ExternalLink href={user.youtube} className="social-link">
              <XIcon color={theme.colors.white} />
            </ExternalLink>
          )}
          {user.website && (
            <ExternalLink href={user.website} className="social-link">
              <XIcon color={theme.colors.white} />
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

        .profile-image-mobile,
        .profile-image-desktop {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
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
          height: 60px;
          width: 60px;
          padding: 10px;
          border: 2px solid ${theme.colors.white};
          border-radius: 50%;
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
