import { useRouter } from 'next/router'
import { withApollo } from '@/lib/apollo'

const OldMyFeedPage = () => {
  const router = useRouter()
  if (typeof window !== 'undefined') {
    router.push({
      pathname: `/my-feed`,
    })
  }
  return null
}

export default withApollo(OldMyFeedPage)
