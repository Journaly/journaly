import { useRouter } from 'next/router'
import { withApollo } from '@/lib/apollo'

const OldMyPostsPage = () => {
  const router = useRouter()
  if (typeof window !== 'undefined') {
    router.push({
      pathname: `/my-posts`,
    })
  }
  return null
}

export default withApollo(OldMyPostsPage)
