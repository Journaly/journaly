import AWS from 'aws-sdk'

import {
  PrismaClient,
  PendingNotification,
  NotificationType,
  User,
  Post,
  Thread,
  PostComment,
  Comment,
} from '@journaly/j-db-client'

export type SqsParams = {
  MessageBody: string
  QueueUrl: string
}

export type EmailParams = {
  from: string
  to: string
  subject: string
  html: string
}

export type ValidatedNotification = 
  | { type: 'POST_COMMENT', postComment: PostComment, post: Post}
  | { type: 'THREAD_COMMENT', comment: Comment, thread: Thread, post: Post}

export type DataForUpdateEmail = {
  user: User,
  own: ValidatedNotification[],
  other: ValidatedNotification[],
}

const cacheFn = <T>(create: () => T): () => T => {
  let value: T | null = null

  return () => {
    if (value === null) {
      value = create()
    }

    return value
  }
}

export const getDBClient = cacheFn(() => new PrismaClient())
export const getSQS = cacheFn(() => new AWS.SQS({ region: 'us-east-2' }))

export const enqueueEmail = (emailParams: EmailParams) => {
  const params: SqsParams = {
    MessageBody: JSON.stringify(emailParams),
    QueueUrl: process.env.JMAIL_QUEUE_URL!,
  }

  return new Promise((res, rej) => {
    getSQS().sendMessage(params, (err, data) => {
      if (err) {
        rej(err)
      } else {
        res(data)
      }
    })
  })
}

export const mapCat = <T>(data: T[], cb: (arg: T) => string) => {
  return data.map(cb).join('\n')
}
