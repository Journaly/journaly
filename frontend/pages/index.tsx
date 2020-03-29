import { NextPage } from 'next'
import { withApollo } from '../lib/apollo'

import LandingPageLayout from '../components/Layouts/LandingPageLayout'
import Home from '../components/Site/Home'
import Feed from '../components/Dashboard/Feed'

import { useFeedQuery } from '../generated/graphql'

interface InitialProps {}

interface Props extends InitialProps {}

const HomePage: NextPage<Props, InitialProps> = () => {
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
    <LandingPageLayout>
      <Home />
      {posts.length > 0 ? (
        <Feed posts={posts} />
      ) : (
        <p>Nothing to see here...</p>
      )}
    </LandingPageLayout>
  )
}

export default withApollo(HomePage)
