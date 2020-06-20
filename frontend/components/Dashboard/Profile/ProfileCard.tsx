import React from 'react'
import { useTranslation } from '../../../config/i18n'
import XIcon from '../../../components/Icons/XIcon'
import ExternalLink from '../../../elements/ExternalLink'
import theme from '../../../theme'

const ProfileCard: React.FC = () => {
  const { t } = useTranslation('profile')

  const user = {
    name: 'Avocado King',
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

  return (
    <div className="profile-card">
      <h1 className="profile-name">{name}</h1>

      <img className="profile-image-mobile" src={user.image} />

      <div className="langauges-and-interests">
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

      <img className="profile-image-desktop" src={user.image} />

      {user.bio && <p className="bio">{user.bio}</p>}

      {user.location && <p className="location">{user.location}</p>}

      <div className="separator">- -</div>

      <div className="social-links">
        {user.facebook && (
          <ExternalLink href={user.facebook} className="social-link">
            <XIcon />
          </ExternalLink>
        )}
        {user.instagram && (
          <ExternalLink href={user.instagram} className="social-link">
            <XIcon />
          </ExternalLink>
        )}
        {user.youtube && (
          <ExternalLink href={user.youtube} className="social-link">
            <XIcon />
          </ExternalLink>
        )}
        {user.website && (
          <ExternalLink href={user.website} className="social-link">
            <XIcon />
          </ExternalLink>
        )}
      </div>

      <style jsx>{`
        .profile-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-bottom: 40px;
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .profile-card {
            padding: 80px 50px;
          }
        }

        .profile-name {
          ${theme.typography.headingLG};
        }

        .profile-image-mobile,
        .profile-image-desktop {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
        }
        .profile-image-mobile {
          margin: 24px 0;
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .profile-image-mobile {
            display: none;
          }
        }

        .langauges-and-interests {
          align-self: flex-start;
          margin-bottom: 24px;
        }

        .langauges-and-interests p {
          margin-bottom: 10px;
        }
        .langauges-and-interests p:last-child {
          margin-bottom: 0;
        }

        .langauges-and-interests span {
          font-weight: bold;
        }

        .profile-image-desktop {
          display: none;
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .profile-image-desktop {
            display: block;
          }
        }

        .bio {
          max-width: 660px;
          margin: 25px 0;
          text-align: center;
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
          border: 2px solid black;
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
