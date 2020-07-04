import { NextPage } from 'next'
import { withApollo } from '../../lib/apollo'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import Profile from '../../components/Dashboard/Profile'
import AuthGate from '../../components/AuthGate'

interface InitialProps {
  namespacesRequired: string[]
}

const ProfilePage: NextPage<InitialProps> = () => {
  return (
    <AuthGate>
      {(currentUser) => (
        <DashboardLayout currentUser={currentUser} withPadding={false}>
          <Profile currentUser={currentUser} />
        </DashboardLayout>
      )}
    </AuthGate>
  )
}

ProfilePage.getInitialProps = async () => ({
  namespacesRequired: ['profile', 'post'],
})

export default withApollo(ProfilePage)
