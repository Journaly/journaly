import React, { useState } from 'react'

import theme from '@/theme'
import { useTranslation } from 'next-i18next'
import {
  ProfileUserFragmentFragment as UserType,
  PostCardFragmentFragment as PostCardType,
} from '@/generated/graphql'
import {
  layoutTopBottomPadding,
  layoutLeftRightPadding,
} from '@/components/Dashboard/dashboardConstants'
import TabToggle from '@/components/TabToggle'

import ProfileCard from './ProfileCard'
import ProfileStats from './ProfileStats'
import PostList from './PostList'

type ProfileTabsProps = {
  isLoggedInUser: boolean
  user: UserType
  posts: PostCardType[]
}


const ProfileTabs = ({ isLoggedInUser, user, posts}: ProfileTabsProps) => {
  const { t } = useTranslation('profile')
  const tabs = [
    { key: 'posts', text: t('postsTitle') },
    { key: 'stats', text: t('statsTitle') },
  ]

  const [activeKey, setActiveKey] = useState(tabs[0].key)

  return (
    <>
      <div className="container">
        <div className="tab-container">
          <TabToggle
            tabs={tabs} 
            activeKey={activeKey}
            onToggle={setActiveKey}
          />
        </div>

        { activeKey === 'posts' && (
          <PostList
            isLoggedInUser={isLoggedInUser}
            user={user}
            posts={posts}
          />
        )}
        { activeKey === 'stats' && (
          <ProfileStats userId={user.id} />
        )}
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          padding: 0 ${layoutLeftRightPadding} ${layoutTopBottomPadding};
          background-color: ${theme.colors.white};
          box-shadow: 0px 8px 10px #00000029;
          padding: 25px;
        }

        .tab-container {
          align-self: center;
          margin-bottom: 20px;
        }

        @media (min-width: ${theme.breakpoints.MD}) {
          .container {
            border-top: 0;
            overflow: auto;
          }
        }
      `}</style>
    </>
  )

}

type Props = {
  isLoggedInUser: boolean
  user: UserType
  posts: PostCardType[]
}

const Profile: React.FC<Props> = ({ isLoggedInUser, user, posts }) => {
  return (
    <div className="profile-wrapper">
      <ProfileCard user={user} />
      <ProfileTabs
        isLoggedInUser={isLoggedInUser}
        user={user}
        posts={posts}
      />

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
