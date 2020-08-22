import React from 'react'
import { User as UserType, PostCardFragmentFragment as PostCardType } from '@generated'
import { layoutPadding } from '@components/Dashboard/dashboardConstants'
import ProfileCard from './ProfileCard'
import PostList from './PostList'
import theme from '@theme'

type Props = {
  user: UserType | any
  posts: PostCardType[]
}

const Profile: React.FC<Props> = ({ user, posts }) => {
  return (
    <div className="profile-wrapper">
      <ProfileCard user={user} />
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
            max-height: 850px;
          }
        }
      `}</style>
    </div>
  )
}

export default Profile
