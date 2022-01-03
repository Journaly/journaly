import { useRouter } from 'next/router'
import { withApollo } from '@/lib/apollo'

const OldResetPasswordPage = () => {
  const router = useRouter()
  if (typeof window !== 'undefined') {
    router.push({
      pathname: `/my-feed`,
    })
  }
  return null
}

export default withApollo(OldResetPasswordPage)
