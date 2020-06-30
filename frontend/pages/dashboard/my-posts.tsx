import React, { useState } from 'react'
import { NextPage } from 'next'
import { withApollo } from '../../lib/apollo'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import TabToggle from '../../elements/TabToggle'

const MyPostsPage: NextPage = () => {
  const tabs = [
    { key: 'published', text: 'Published' },
    { key: 'drafts', text: 'Drafts' },
  ]
  const [activeKey, setActiveKey] = useState(tabs[0].key)

  const handleToggle = (key: string): void => {
    // TODO(nick): wire up query params so you can directly link to a tab
    setActiveKey(key)
  }

  return (
    <DashboardLayout>
      <TabToggle activeKey={activeKey} tabs={tabs} onToggle={handleToggle} />

      <div className="posts-wrapper">
        {activeKey === 'published' && <div>My Posts</div>}
        {activeKey === 'drafts' && <div>Drafts</div>}
      </div>

      <style jsx>{`
        :global(.tab-toggle) {
          margin: 0 auto;
        }
        .posts-wrapper {
          margin: 0 auto 50px;
          padding: 50px 200px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .posts-wrapper > div {
          padding: 50px;
          animation: 150ms fadeIn ease-in;
        }
      `}</style>
    </DashboardLayout>
  )
}

MyPostsPage.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withApollo(MyPostsPage)
