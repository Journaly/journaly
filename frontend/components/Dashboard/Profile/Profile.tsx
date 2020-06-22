// @ts-nocheck
import React from 'react'
import ProfileCard from './ProfileCard'
import PostList from './PostList'
import { layoutPadding } from '../../Dashboard/dashboardConstants'
import theme from '../../../theme'

type Props = {
  // TODO: use Post type from generated graphql
  posts: any[]
}

const Profile: React.FC<Props> = ({ posts }) => {
  return (
    <div className="profile-wrapper">
      <ProfileCard />
      <PostList posts={posts} />

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
