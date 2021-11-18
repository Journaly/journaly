import React from 'react'
import Link from 'next/link'
import { AuthorFragmentFragment as UserType } from '@/generated/graphql'
import theme from '@/theme'
import UserAvatar from '../UserAvatar'

type UserListProps = {
  users: UserType[]
  colorScheme?: 'light-mode' | 'dark-mode'
}

const UserList: React.FC<UserListProps> = ({ users, colorScheme = 'light-mode' }) => {
  return (
    <div className="list-container">
      {users.map((user) => (
        <Link href={`/dashboard/profile/[id]`} as={`/dashboard/profile/${user.id}`} key={user.id}>
          <a className="user-container">
            <UserAvatar user={user} size={50} />
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
          color: ${colorScheme === 'light-mode' ? theme.colors.black : theme.colors.white};
        }

        .user-container:hover {
          background-color: ${colorScheme === 'light-mode' ? theme.colors.gray200 : theme.colors.gray800};
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
