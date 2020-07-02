import { NextPage } from 'next'
import { withApollo } from '../../lib/apollo'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import MyFeed from '../../components/Dashboard/MyFeed'
import { useFeedQuery, Post } from '../../generated/graphql'
import LoadingWrapper from '../../components/LoadingWrapper'
import AuthGate from '../../components/AuthGate'

interface InitialProps {
  namespacesRequired: string[]
}

const MyFeedPage: NextPage<InitialProps> = () => {
  const { loading, error, data } = useFeedQuery({
    variables: {
      published: true,
    },
  })

  const posts = data?.feed

  return (
    <AuthGate>
      {(currentUser) => (
        <DashboardLayout currentUser={currentUser}>
          <LoadingWrapper loading={loading} error={error}>
            <MyFeed posts={posts as Post[]} currentUser={currentUser} />
          </LoadingWrapper>
        </DashboardLayout>
      )}
    </AuthGate>
  )
}

MyFeedPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default withApollo(MyFeedPage)
