import { useRouter } from 'next/router'
import { withApollo } from '@/lib/apollo'

const OldProfileInfoPage = () => {
  const router = useRouter()
  if (typeof window !== 'undefined') {
    router.push({
      pathname: `/settings/profile`,
    })
  }
  return null
}

export default withApollo(OldProfileInfoPage)
