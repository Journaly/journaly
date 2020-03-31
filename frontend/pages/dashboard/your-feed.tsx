import { NextPage } from 'next'
import { withApollo } from '../../lib/apollo'

import DashboardLayout from '../../components/Layouts/DashboardLayout'
import MyFeed from '../../components/Dashboard/MyFeed'

import { useFeedQuery } from '../../generated/graphql'

interface InitialProps {}

interface Props extends InitialProps {}

const MyFeedPage: NextPage<Props, InitialProps> = () => {
  const { loading, error, data } = useFeedQuery({
    variables: {
      published: true,
    },
  })

  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return <p>An error occurred...</p>
  }

  const posts = data?.feed

  return (
    <DashboardLayout>
      <MyFeed posts={posts} />
    </DashboardLayout>
  )
}

export default withApollo(MyFeedPage)
