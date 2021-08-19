import fetch from 'isomorphic-unfetch'

import { User, BadgeType, PrismaClient } from '@journaly/j-db-client'

import { AWS } from './aws'

const sqs = new AWS.SQS({ region: 'us-east-2' })

type sendPasswordResetTokenEmailArgs = {
  user: User
  resetToken: string
}

type sendNewBadgeEmailArgs = {
  badgeType: BadgeType
  user: User
}

type EmailParams = {
  from: string
  to: string
  subject: string
  html: string
}

type SqsParams = {
  MessageBody: string
  QueueUrl: string
}

const makeEmail = (text: string) => `
<div className="email" style="
  border: 1px solid black;
  padding: 20px;
  font-family: sans-serif;
  line-height: 2;
font-size: 20px;
">
  <h2>Howdy, Journaler!</h2>
  ${text}
  <p>Robin @ Journaly</p>
</div>
`

const sendJmail = (emailParams: EmailParams) => {
  if (!process.env.JMAIL_QUEUE_URL) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'NODE_ENV is prod, but no JMAIL_QUEUE_URL is specified. Something is probably very wrong.',
      )
    }

    // We don't have a jmail queue url, so let's just spit this out to the
    // console for debugging
    console.info(
      'Would have sent the follwing email data to the jmail queue if I had a JMAIL_QUEUE_URL:',
    )
    console.info(emailParams)
    return new Promise<void>((res) => res())
  }

  const params: SqsParams = {
    MessageBody: JSON.stringify(emailParams),
    QueueUrl: process.env.JMAIL_QUEUE_URL!,
  }

  return new Promise((res, rej) => {
    sqs.sendMessage(params, function (err, data) {
      if (err) {
        rej(err)
      } else {
        res(data)
      }
    })
  })
}

const sendPasswordResetTokenEmail = ({ user, resetToken }: sendPasswordResetTokenEmailArgs) => {
  return sendJmail({
    from: 'robin@journaly.com',
    to: user.email,
    subject: 'Your Password Reset Link',
    html: makeEmail(`
      <p>I heard you were having some trouble logging in.</>
      <p>Click <a href="https://${process.env.SITE_DOMAIN}/dashboard/reset-password?resetToken=${resetToken}">here</a> to reset your password!</p>
      <p>Please note that the link will expire in 1 hour.</p>
      <p>Warmly,</p>
    `),
  })
}

const assertUnreachable = (x: never): never => {
  throw new Error(`Didn't expect to get here ${x}`)
}

const getBadgeName = (badgeType: BadgeType): string => {
  switch (badgeType) {
    case BadgeType.ALPHA_USER:
      return 'Alpha User'
    case BadgeType.BETA_USER:
      return 'Beta User'
    case BadgeType.TEN_POSTS:
      return '10 Posts'
    case BadgeType.ONEHUNDRED_POSTS:
      return '100 Posts'
    case BadgeType.CODE_CONTRIBUTOR:
      return 'Code Contributor'
    case BadgeType.NECROMANCER:
      return 'Necromancer'
    case BadgeType.ODRADEK:
      return 'Odradek'
  }

  return assertUnreachable(badgeType)
}

const sendNewBadgeEmail = ({ user, badgeType }: sendNewBadgeEmailArgs) => {
  return sendJmail({
    from: 'robin@journaly.com',
    to: user.email,
    subject: 'You earned a new badge!',
    html: makeEmail(`
      <p>Congratulations! You just earned the "${getBadgeName(badgeType)}" badge on Journaly.</p>
      <p>This badge will now be displayed on your <a href="https://${
        process.env.SITE_DOMAIN
      }/dashboard/profile/${user.id}">profile page</a>.</p>
    `),
  })
}

type MoosendSubscriberResponse = {
  Code: number
  Error: string | null
  Context: {
    ID: string
  }
}

const subscribeUserToProductUpdates = async (user: User, db: PrismaClient) => {
  const apiKey = process.env.MOOSEND_API_KEY
  const listId = process.env.MOOSEND_PRODUCT_UPDATES_MAILING_LIST_ID

  if (!apiKey || !listId) {
    console.warn('No `MOOSEND_API_KEY` present, not signing user up for product updates.')
    return
  }

  // If user already has an ID, do an update instead (only changes the URL)
  const url = user.moosendSubscriberId
    ? `https://api.moosend.com/v3/subscribers/${listId}/update/${user.moosendSubscriberId}.json?apikey=${apiKey}`
    : `https://api.moosend.com/v3/subscribers/${listId}/subscribe.json?apikey=${apiKey}`

  const resp = (await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    cache: 'no-cache',
    body: JSON.stringify({
      Name: user.name || user.handle,
      Email: user.email,
      CustomFields: [`journalyId=${user.id}`, `registrationDate=${user.createdAt.toISOString()}`],
    }),
  }).then((r) => r.json())) as MoosendSubscriberResponse

  if (resp['Error']) {
    throw new Error(resp['Error'])
  }

  if (resp.Code !== 0) {
    throw new Error('Subscription call returned a non-zero code, but had no Error')
  }

  if (user.moosendSubscriberId) {
    return user
  } else {
    // Only update the DB if we created a new subscriber.
    return db.user.update({
      where: { id: user.id },
      data: { moosendSubscriberId: resp.Context.ID },
    })
  }
}

export { sendJmail, sendPasswordResetTokenEmail, sendNewBadgeEmail, subscribeUserToProductUpdates }
