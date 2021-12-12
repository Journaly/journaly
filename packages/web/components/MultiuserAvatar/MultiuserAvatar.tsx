import React from 'react'
import { AuthorFragmentFragment as UserType } from '@/generated/graphql'
import UserAvatar from '../UserAvatar'

type MultiuserAvatarProps = {
  users: UserType[]
}

const MultiuserAvatar: React.FC<MultiuserAvatarProps> = ({ users }) => {
  return (
    <>
      {users.length > 1 ? (
        <ul className="multiple-follower-container">
          <li>
            <UserAvatar user={users[0]} size={50} />
          </li>
          <li>
            <UserAvatar user={users[1]} size={50} />
          </li>
        </ul>
      ) : (
        <UserAvatar user={users[0]} size={50} />
      )}
      <style jsx>{`
        .multiple-follower-container {
          position: relative;
          padding: 16px 0 0 16px;
        }

        .multiple-follower-container > li:nth-child(2) {
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
        }
      `}</style>
    </>
  )
}

export default MultiuserAvatar
