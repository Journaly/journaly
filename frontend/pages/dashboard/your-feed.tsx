import { NextPage } from 'next'
import { withApollo } from '../../lib/apollo'

import Feed from '../../components/Dashboard/Feed'

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
    <>
      <h1>Welcome to your feed!</h1>
      {posts.length > 0 ? (
        <Feed posts={posts} />
      ) : (
        <p>Nothing to see here...</p>
      )}
      <style jsx>{`
        h1 {
          margin: 50px auto;
          text-align: center;
        }
      `}</style>
    </>
  )
}

export default withApollo(MyFeedPage)
