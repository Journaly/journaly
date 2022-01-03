import { useRouter } from 'next/router'
import { withApollo } from '@/lib/apollo'

const OldAccountPage = () => {
  const router = useRouter()
  if (typeof window !== 'undefined') {
    router.push({
      pathname: `/settings/account`,
    })
  }
  return null
}

export default withApollo(OldAccountPage)
