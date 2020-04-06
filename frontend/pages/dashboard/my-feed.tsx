import { NextPage } from 'next'
import { withApollo } from '../../lib/apollo'
import { useTranslation } from '../../config/i18n'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import MyFeed from '../../components/Dashboard/MyFeed'
import { useFeedQuery } from '../../generated/graphql'

interface InitialProps {}

interface Props extends InitialProps {}

const MyFeedPage: NextPage<Props, InitialProps> = () => {
  const { t } = useTranslation()
  const { loading, error, data } = useFeedQuery({
    variables: {
      published: true,
    },
  })

  if (loading) {
    return <p>{t('loading')}</p>
  } else if (error) {
    return <p>{t('error')}</p>
  }

  const posts = data?.feed

  return (
    <DashboardLayout>
      <MyFeed posts={posts} />
    </DashboardLayout>
  )
}

MyFeedPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default withApollo(MyFeedPage)
