// @ts-nocheck
import { NextPage } from 'next'
import { withApollo } from '../../lib/apollo'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import MyFeed from '../../components/Dashboard/MyFeed'
import { useFeedQuery } from '../../generated/graphql'
import LoadingWrapper from '../../components/LoadingWrapper'
import { useTranslation } from '../../config/i18n'

interface InitialProps {
  namespacesRequired: string[]
}

const MyFeedPage: NextPage<InitialProps> = () => {
  const { t } = useTranslation()
  const { loading, error, data } = useFeedQuery({
    variables: {
      published: true,
    },
  })

  const posts = data?.feed

  return (
    <DashboardLayout>
      <LoadingWrapper loading={loading} error={error} render={() => <MyFeed posts={posts} />} />
    </DashboardLayout>
  )
}

MyFeedPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default withApollo(MyFeedPage)
