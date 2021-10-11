import type { NextApiRequest, NextApiResponse } from 'next'
import { EmailVerificationStatus } from '@journaly/j-db-client'
import { getClient, subscribeUserToProductUpdates } from '@/nexus/utils'

/**
 * An API route to handle user email address verification.
 * @param req
 * @param res
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = getClient()
  const queryParams = req.query
  const requiredParams = ['verificationToken', 'id']

  for (const param of requiredParams) {
    if (!queryParams[param]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oh no! You are missing the ${param} parameter`,
        }),
      }
    }
  }

  const user = await db.user.findUnique({
    where: { id: parseInt(queryParams.id as string) },
    include: { auth: true },
  })

  if (!user) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: `Oh no! User ${queryParams.id} not found`,
      }),
    }
  }

  if (user.auth && user.auth.emailVerificationToken !== queryParams.verificationToken) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Hmm, token ${queryParams.verificationToken} doesn't match our records.`,
      }),
    }
  }

  const updatedUser = await db.auth.update({
    where: { userId: user.id },
    data: {
      emailVerificationStatus: EmailVerificationStatus.VERIFIED,
    },
  })
  await subscribeUserToProductUpdates(user, db)

  return res.redirect(`/dashboard/my-feed?email-verification=success&id=${updatedUser.id}`)
}

export default handler
