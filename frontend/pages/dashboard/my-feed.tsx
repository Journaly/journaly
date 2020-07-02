// @ts-nocheck
import { NextPage } from 'next'
import { withApollo } from '../../lib/apollo'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import MyFeed from '../../components/Dashboard/MyFeed'
import { useFeedQuery, useCurrentUserQuery } from '../../generated/graphql'
import LoadingWrapper from '../../components/LoadingWrapper'
import { useTranslation } from '../../config/i18n'
import AuthGate from '../../components/AuthGate'

interface InitialProps {
  namespacesRequired: string[]
}

const MyFeedPage: NextPage<InitialProps> = () => {
  const { t } = useTranslation()
  const {
    data: currentUserData,
    loading: currentUserLoading,
    error: currentUserError,
  } = useCurrentUserQuery()

  const { loading: feedLoading, error: feedError, data: feedData } = useFeedQuery({
    variables: {
      published: true,
    },
  })

  const posts = feedData?.feed

  return (
    <AuthGate>
      <DashboardLayout>
        <LoadingWrapper
          loading={currentUserLoading || feedLoading}
          error={currentUserError || feedError}
          render={() => <MyFeed posts={posts} currentUser={currentUserData.currentUser} />}
        />
      </DashboardLayout>
    </AuthGate>
  )
}

MyFeedPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default withApollo(MyFeedPage)
