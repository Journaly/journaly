import React from 'react'
import { useRouter } from 'next/router'

import { withApollo } from '@/lib/apollo'
import { useUserByIdentifierQuery } from '@/generated/graphql'
import theme from '@/theme'

/**
 * This page is part of the deprecated URL pattern: `/dashboard/*` and should not be used.
 * See the `redirects` config property in `next.config.js` for all redirect paths.ss
 */

const OldProfilePage = () => {
  const router = useRouter()
  const idStr = router.query.id as string
  const userId = parseInt(idStr, 10)

  const { data, loading, error } = useUserByIdentifierQuery({ variables: { id: userId } })

  if (data?.userByIdentifier && typeof window !== 'undefined') {
    router.push({
      pathname: `/user/${data.userByIdentifier.handle}`,
    })
    return null
  }

  if (error && !loading) {
    return (
      <div className="container">
        <h1>404</h1>
        <p>Oops! The Journaler you are looking for could not be found</p>
        <style jsx>{`
          .container {
            max-width: 900px;
            margin: 30vh auto;
            padding: 50px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: ${theme.colors.white};
            box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
          }

          h1 {
            text-align: center;
            font-weight: 700;
            font-size: 28px;
            margin-bottom: 20px;
          }

          p {
            margin-bottom: 35px;
          }
        `}</style>
      </div>
    )
  }

  return null
}

export default withApollo(OldProfilePage)
