// @ts-nocheck
import { NextPage } from 'next'
import { withApollo } from '../../lib/apollo'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import Profile from '../../components/Dashboard/Profile'
import { useMyPostsQuery } from '../../generated/graphql'

interface InitialProps {
  namespacesRequired: string[]
}

const ProfilePage: NextPage<InitialProps> = () => {
  const { loading, data, error } = useMyPostsQuery()
  console.log('error', error)

  return (
    <DashboardLayout withPadding={false}>
      {loading ? (
        <>
          <div>Loading...</div>
        </>
      ) : (
        <Profile posts={data.myPosts} />
      )}
    </DashboardLayout>
  )
}

ProfilePage.getInitialProps = async () => ({
  namespacesRequired: ['profile', 'posts'],
})

export default withApollo(ProfilePage)
