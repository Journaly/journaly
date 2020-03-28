import { NextPage } from 'next'
import { withApollo } from '../lib/apollo'
import LandingPageLayout from '../components/Layouts/LandingPageLayout'
import Home from '../components/Site/Home'

import { gql, useQuery } from '@apollo/client'

// interface InitialProps {}

// interface Props extends InitialProps {}

const HomePage: NextPage = () => {
  const { loading, error, data } = useQuery(feedQuery)

  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return <p>An error occurred...</p>
  }

  const posts = data?.feed

  console.log(data.feed)

  return (
    <LandingPageLayout>
      <Home />
      {posts.length > 0 ? (
        posts.map(post => <p key={post.Id}>{post.Title}</p>)
      ) : (
        <p>Nothing to see here...</p>
      )}
    </LandingPageLayout>
  )
}

export default withApollo(HomePage)
