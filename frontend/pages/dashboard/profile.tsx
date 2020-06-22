import { NextPage } from 'next'
import { withApollo } from '../../lib/apollo'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import Profile from '../../components/Dashboard/Profile'

interface InitialProps {
  namespacesRequired: string[]
}

const ProfilePage: NextPage<InitialProps> = () => {
  return (
    <DashboardLayout withPadding={false}>
      <Profile />
    </DashboardLayout>
  )
}

ProfilePage.getInitialProps = async () => ({
  namespacesRequired: ['profile'],
})

export default withApollo(ProfilePage)
