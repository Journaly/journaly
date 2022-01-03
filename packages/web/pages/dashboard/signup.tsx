import { useRouter } from 'next/router'
import { withApollo } from '@/lib/apollo'

const OldSignupPage = () => {
  const router = useRouter()
  if (typeof window !== 'undefined') {
    router.push({
      pathname: `/signup`,
    })
  }
  return null
}

export default withApollo(OldSignupPage)
