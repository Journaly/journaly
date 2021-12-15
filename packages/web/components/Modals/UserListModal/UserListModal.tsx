import React from 'react'
import { AuthorFragmentFragment as UserType } from '@/generated/graphql'
import Modal from '@/components/Modal'
import UserList from '@/components/UserList'

type UserListModalProps = {
  users: UserType[]
  title: string
  onClose: () => void
}

const UserListModal: React.FC<UserListModalProps> = ({ users, title, onClose }) => {
  return <Modal title={title} body={<UserList users={users} />} onClose={onClose} />
}

export default UserListModal
