import React from 'react'

import { useUserStatsQuery } from '@/generated/graphql'

type ProfileStatsProps = {
  userId: number
}

const ProfileStats = ({ userId }: ProfileStatsProps) => {
  const { data, loading } = useUserStatsQuery({
    variables: {
      id: userId
    }
  })

  if (loading) {
    return <span>Loading...</span>
  }

  return (
    <pre>
      {JSON.stringify(data, undefined, 2)}
    </pre>
  )
}

export default ProfileStats
