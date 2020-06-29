// @ts-nocheck
import { NextPage } from 'next'
import { withApollo } from '../../lib/apollo'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import Profile from '../../components/Dashboard/Profile'
import { usePostsQuery } from '../../generated/graphql'

interface InitialProps {
  namespacesRequired: string[]
}

const ProfilePage: NextPage<InitialProps> = () => {
  const { loading, data, error } = usePostsQuery({
    variables: {
      // TODO(remove hardcoded value once currentUser is available on the application state)
      authorId: 1,
    },
  })

  return (
    <DashboardLayout withPadding={false}>
      {loading ? (
        <>
          <div>Loading...</div>
        </>
      ) : (
        <Profile posts={data.posts} />
      )}
    </DashboardLayout>
  )
}

ProfilePage.getInitialProps = async () => ({
  namespacesRequired: ['profile', 'posts'],
})

export default withApollo(ProfilePage)
