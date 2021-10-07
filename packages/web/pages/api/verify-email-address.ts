import { EmailVerificationStatus } from '@journaly/j-db-client'
import { getClient } from '@/nexus/utils'

/**
 * An API route to handle user email address verification.
 * @param req
 * @param res
 */

const handler = async (req: any) => {
  const db = getClient()
  const queryParams = req.query
  const requiredParams = ['verificationToken', 'id']

  for (const param of requiredParams) {
    if (!queryParams[param]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oh no! You are missing the ${param} parametre`,
        }),
      }
    }
  }

  const user = await db.user.findUnique({
    where: { id: parseInt(queryParams.id) },
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

  // // Redirect user to My Feed page
  // const state = {}
  // const title = ''
  // const url = `/dashboard/my-feed?email-verification=success&id=${updatedUser.id}`
  // if (window) window.history.pushState(state, title, url)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Success!',
    }),
  }
}

export default handler
