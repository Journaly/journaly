import React from 'react'
import ProfileCard from './ProfileCard'
import PostList from './PostList'
import { layoutPadding } from '../../Dashboard/dashboardConstants'
import { User as UserType } from '../../../generated/graphql'
import theme from '../../../theme'

type Props = {
  currentUser: UserType
}

const Profile: React.FC<Props> = ({ currentUser }) => {
  return (
    <div className="profile-wrapper">
      <ProfileCard currentUser={currentUser} />
      <PostList currentUserId={currentUser.id} />

      <style jsx>{`
        .profile-wrapper {
          display: flex;
          flex-direction: column;
          height: 100vh;
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
