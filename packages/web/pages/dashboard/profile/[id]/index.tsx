import React from 'react'
import { useRouter } from 'next/router'

import { withApollo } from '@/lib/apollo'
import LoadingWrapper from '@/components/LoadingWrapper'
import { useUserByIdentifier } from '@/generated/graphql'

const ProfilePage = () => {
  const router = useRouter()
  const idStr = router.query.id as string
  const userId = parseInt(idStr, 10)

  const { data, loading, error } = useUserByIdentifier({ variables: { id: userId } })

  if (data?.useUserByIdentifier && typeof window !== 'undefined') {
    router.push({
      pathname: `/dashboard/user/${data.useUserByIdentifier.handle}`,
    })
    return null
  }

  return (
    <LoadingWrapper loading={loading} error={error}>
      {}
    </LoadingWrapper>
  )
}

export default withApollo(ProfilePage)
