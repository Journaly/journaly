import React from 'react'
import ProfileCard from './ProfileCard'
import PostList from './PostList'
import { layoutPadding } from '../../Dashboard/dashboardConstants'
import theme from '../../../theme'

const Profile: React.FC = () => {
  return (
    <div className="profile-wrapper">
      <ProfileCard />
      <PostList />

      <style jsx>{`
        .profile-wrapper {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .profile-wrapper {
            flex-direction: row;
            padding: ${layoutPadding};
          }

          .profile-wrapper > :global(div) {
            flex-basis: 50%;
          }
        }
      `}</style>
    </div>
  )
}

export default Profile
