import React from 'react'
import { User as UserType } from '@generated'

interface Props {
  users: UserType[]
}

const Users: React.FC<Props> = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  )
}

export default Users
