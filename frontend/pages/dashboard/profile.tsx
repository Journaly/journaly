// @ts-nocheck
import { NextPage } from 'next'
import { withApollo } from '../../lib/apollo'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import Profile from '../../components/Dashboard/Profile'
import { useFeedQuery } from '../../generated/graphql'

interface InitialProps {
  namespacesRequired: string[]
}

const ProfilePage: NextPage<InitialProps> = () => {
  // TODO: this should only query posts for the user who's profile we are on
  const { data } = useFeedQuery({
    variables: {
      published: true,
    },
  })

  const posts = data?.feed

  return (
    <DashboardLayout withPadding={false}>
      <Profile posts={posts} />
    </DashboardLayout>
  )
}

ProfilePage.getInitialProps = async () => ({
  namespacesRequired: ['profile', 'posts'],
})

export default withApollo(ProfilePage)
