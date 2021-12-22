import React from 'react'
import theme from '@/theme'
import { useUsersQuery, UserWithLanguagesFragmentFragment as UserType } from '@/generated/graphql'
import Button, { ButtonVariant } from '@/components/Button'

type UserInfoProps = {
  user: UserType
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <tr>
      <td>{user.handle}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.userRole}</td>
      <td>
        <Button className="user-action-btn" variant={ButtonVariant.Link}>
          Update
        </Button>
      </td>
      <style jsx>{`
        td {
          border-bottom: 1px solid #ededed;
          border-right: 1px solid #ededed;
          position: relative;
          padding: 4px 12px;
        }

        td:last-child {
          border-right: none;
          width: 150px;
        }

        td:last-child :global(.user-action-btn) {
          width: 100%;
        }
      `}</style>
    </tr>
  )
}

const JAdmin = () => {
  const { data } = useUsersQuery()

  return (
    <div>
      <div>
        <h2>Manage Users</h2>
        <table>
          <thead>
            <tr>
              <th>Handle</th>
              <th>Name</th>
              <th>Email</th>
              <th>Permissions</th>
              <th>⬇︎</th>
            </tr>
          </thead>
          <tbody>
            {data?.users.map((user) => (
              <UserInfo user={user} key={user.id} />
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        h2 {
          font-size: 32px;
          lint-height: 40px;
          margin-bottom: 40px;
        }

        table {
          background-color: ${theme.colors.white};
          border-spacing: 0;
          width: 100%;
          border: 1px solid #ededed;
        }

        thead {
          font-size: 10px;
          font-weight: 700;
        }

        th {
          border-bottom: 1px solid #ededed;
          border-right: 1px solid #ededed;
          position: relative;
          padding: 5px;
          text-transform: uppercase;
        }

        th:last-child {
          border-right: none;
          width: 150px;
        }

        tr:hover {
          background-color: #e8f4f8;
        }
      `}</style>
    </div>
  )
}

export default JAdmin
