import React from 'react'
import { AuthorFragmentFragment as UserType } from '@/generated/graphql'
import { useTranslation } from '@/config/i18n'
import Modal from '@/components/Modal'
import UserList from '@/components/UserList'

type UserListModalProps = {
  users: UserType[]
  title: string
  onClose: () => void
}

const UserListModal: React.FC<UserListModalProps> = ({ users, title, onClose }) => {
  const { t } = useTranslation('common')
  return <Modal title={title} body={<UserList users={users} />} onClose={onClose} />
}

export default UserListModal
