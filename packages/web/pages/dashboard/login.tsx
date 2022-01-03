import { useRouter } from 'next/router'
import { withApollo } from '@/lib/apollo'

const OldLoginPage = () => {
  const router = useRouter()
  if (typeof window !== 'undefined') {
    router.push({
      pathname: `/login`,
    })
  }
  return null
}

export default withApollo(OldLoginPage)
