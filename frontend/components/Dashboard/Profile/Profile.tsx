import React from 'react'
import ProfileCard from './ProfileCard'
import PostList from './PostList'
import { layoutPadding } from '../../Dashboard/dashboardConstants'
import { User as UserType } from '../../../generated/graphql'
import theme from '../../../theme'

type Props = {
  user: UserType
}

const Profile: React.FC<Props> = ({ user }) => {
  return (
    <div className="profile-wrapper">
      <ProfileCard user={user} />
      <PostList userId={user.id} />

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
            max-height: 850px;
          }
        }
      `}</style>
    </div>
  )
}

export default Profile
