import React, { useState } from 'react'
import { NextPage } from 'next'
import { withApollo } from '../../lib/apollo'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import TabToggle from '../../elements/TabToggle'
import AuthGate from '../../components/AuthGate'
import MyPosts from '../../components/Dashboard/MyPosts'
import { PostStatus as PostStatusType } from '../../generated/graphql'

type Tab = {
  key: PostStatusType
  text: string
}

const MyPostsPage: NextPage = () => {
  const tabs: Tab[] = [
    { key: PostStatusType.Published, text: 'Published' },
    { key: PostStatusType.Draft, text: 'Drafts' },
  ]
  const [activeKey, setActiveKey] = useState<PostStatusType>(tabs[0].key)

  const handleToggle = (key: string): void => {
    // TODO(nick): wire up query params so you can directly link to a tab
    setActiveKey(key as PostStatusType)
  }

  return (
    <AuthGate>
      {(currentUser) => (
        <DashboardLayout>
          <div className="my-posts-page">
            <TabToggle activeKey={activeKey} tabs={tabs} onToggle={handleToggle} />
            <div className="posts-wrapper">
              <MyPosts status={activeKey} currentUser={currentUser} />
            </div>
          </div>

          <style jsx>{`
            .my-posts-page {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .posts-wrapper {
              margin: 0 auto 50px;
              padding: 50px 0;
            }

            .posts-wrapper > div {
              padding: 50px;
            }
          `}</style>
        </DashboardLayout>
      )}
    </AuthGate>
  )
}

MyPostsPage.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withApollo(MyPostsPage)
