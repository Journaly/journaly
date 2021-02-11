import React from 'react'
import ProfileCard from './ProfileCard'
import PostList from './PostList'
import {
  ProfileUserFragmentFragment as UserType,
  PostCardFragmentFragment as PostCardType,
} from '@/generated/graphql'
import theme from '@/theme'

type Props = {
  isLoggedInUser: boolean
  user: UserType
  posts: PostCardType[]
}

const Profile: React.FC<Props> = ({ isLoggedInUser, user, posts }) => {
  return (
    <div className="profile-wrapper">
      <ProfileCard user={user} />
      <PostList isLoggedInUser={isLoggedInUser} user={user} posts={posts} />

      <style jsx>{`
        .profile-wrapper {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }
        @media (min-width: ${theme.breakpoints.MD}) {
          .profile-wrapper {
            flex-direction: row;
            padding: 25px;
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
