import React from 'react'
import { User } from '../../../generated/graphql'

interface Props {
  users: User[]
}

const Users: React.FC<Props> = ({ users }) => {
  return (
    <div>
      {users.map(user => (
        <p key={user.Id}>{user.Name}</p>
      ))}
    </div>
  )
}

export default Users
