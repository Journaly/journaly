import React from 'react'
import { AuthorFragmentFragment as UserType } from '@/generated/graphql'
import BlankAvatarIcon from '../Icons/BlankAvatarIcon'
import theme from '@/theme'

type UserAvatarProps = {
  user: UserType
  size: number
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, size }) => {
  return (
    <div className="container">
      {user.profileImage ? (
        <img
          src={user.profileImage}
          alt={`${user?.name || user.handle}'s avatar'`}
          className="user-avatar"
        />
      ) : (
        <BlankAvatarIcon
          size={size}
        />
      )}
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .user-avatar {
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          object-fit: cover;
        }

        .container :global(svg) {
          border-radius: 50%;
          background-color: ${theme.colors.blueLight};
        }
      `}</style>
    </div>
  )
}

export default UserAvatar
