import React from 'react'
import Link from 'next/link'
import { AuthorFragmentFragment as UserType } from '@/generated/graphql'
import BlankAvatarIcon from '../Icons/BlankAvatarIcon'
import theme from '@/theme'

type UserListProps = {
  users: UserType[]
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="list-container">
      {users.map((user) => (
        <Link href={`/dashboard/profile/[id]`} as={`/dashboard/profile/${user.id}`}>
          <a className="user-container" key={user.id}>
            {user.profileImage ? (
              <img src={user.profileImage} className="user-avatar" />
            ) : (
              <BlankAvatarIcon size={50} />
            )}
            <div className="name-handle-container">
              <p className="handle">{user.handle}</p>
              {user.name && <p>{user.name}</p>}
            </div>
          </a>
        </Link>
      ))}
      <style jsx>{`
        .list-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .user-container {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .user-container:hover {
          background-color: ${theme.colors.gray100};
        }

        .user-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }

        .name-handle-container {
          display: flex;
          flex-direction: column;
          gap: 0px;
        }

        .handle {
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}

export default UserList
