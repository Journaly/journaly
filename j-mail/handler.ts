import AWS from 'aws-sdk'
import nodemailer from 'nodemailer'

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

const cacheFn = <T>(create: () => T): () => T => {
  let value: T | null = null

  return () => {
    if (value === null) {
      value = create()
    }

    return value
  }
}

const getDBClient = cacheFn(() => new PrismaClient())
const getSQS = cacheFn(() => new AWS.SQS({ region: 'us-east-2' })

const enqueueEmail = (params: EmailParams) => {
  const params: SqsParams = {
    MessageBody: JSON.stringify(params),
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

const getUsersToNotify = async () => {
  const prisma = getDBClient()
  const users = await prisma.pendingNotification.findMany({
    select: { userId: true },
    distinct: ['userId'],
  })

  return users
}

type EmailParams = {
  from: string
  to: string
  subject: string
  html: string
}

type ValidatedNotification = 
  | { type: 'POST_COMMENT', postComment: PostComment, post: Post}
  | { type: 'THREAD_COMMENT', comment: Comment, thread: Thread, post: Post}

type DataForUpdateEmail = {
  user: User,
  own: ValidatedNotification[],
  other: ValidatedNotification[],
}

const mapCat = <T>(data: T[], cb: (arg: T) => string) => {
  return data.map(cb).join('\n')
}

const formatNotificationBlock = (note: ValidatedNotification): string => {
  switch (note.type) {
    case ('POST_COMMENT'): {
      return `
        <div>
          <h3>
            New post comment on post:
            <a
              href="https://${process.env.SITE_DOMAIN || 'journaly.com'}/post/${note.post.id}"
              style="
                color: #4391C9;
                text-decoration: none;
                font-size: 16px;
            ">
              ${note.post.title}
            </a>
          </h3>
          <p style="font-size: 16px;"><span style="font-weight: 600;">Comment:</span> ${note.postComment.body}</p>
        </div>
      `
    }
    case ('THREAD_COMMENT'): {
      return `
        <div>
          <h3>
            New feedback comment on post:
            <a
              href="https://${process.env.SITE_DOMAIN || 'journaly.com'}/post/${note.post.id}"
              style="
                color: #4391C9;
                text-decoration: none;
                font-size: 16px;
            ">
                ${note.post.title}
            </a>
          </h3>
          <p style="font-size: 16px;"><span style="font-weight: 600;">In response to:</span> <span style="background: #4391C940; padding: 0 5px;">${note.thread.highlightedContent}</span></p>
          <p style="font-size: 16px;"><span style="font-weight: 600;">Comment:</span> ${note.comment.body}</p>
        </div>
      `
    }
  }
}

const createUpdateEmailBody = (data: DataForUpdateEmail) => {
  return `
    <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 20px;
      font-family: 'Courier New', Courier, monospace;
      line-height: 1.2;
      background: #ebeae7;
      margin-top: 0px;
    ">
      <div style="
        border-top: 10px solid #313131;
        width: 80%;
        background: white;
        padding: 30px 20px;
        text-align: center;
        margin-bottom: 25px;
      ">
        <img
          src="https://journaly-email-assets.s3.us-east-2.amazonaws.com/j-logo-100.png"
          style="width: 75px;"
        >
        <h1 style="
          margin-top: 25px;
          margin-bottom: 25px;
          font-size: 24px;
          font-family: Verdana, Geneva, Tahoma, sans-serif;
          font-weight: 400;
        ">Howdy, Journaler!</h1>
        <p style="font-size: 14px; text-align: left;">
          There's been some new activity on Journaly that we thought you'd like to know about. Here's a summary!
        </p>
      </div>

      
      ${ (data.own.length && `
        <div style="
          padding: 5px 20px;
          font-family: 'Courier New', Courier, monospace;
          line-height: 1.2;
          font-size: 14px;
          margin-bottom: 25px;
          width: 80%;
          background: white;
        ">
          <h2 style="
            text-transform: uppercase;
            text-align: center;
            font-size: 20px;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            font-weight: 400;
          ">Your posts:</h2>
          ${mapCat(data.own, formatNotificationBlock)}
        </div>
      `) || '' }

      ${ (data.other.length && `
        <div style="
          padding: 5px 20px;
          font-family: 'Courier New', Courier, monospace;
          line-height: 1.2;
          font-size: 20px;
          margin-bottom: 25px;
          width: 80%;
          background: white;
        ">
          <h2 style="
            text-transform: uppercase;
            text-align: center;
            font-size: 20px;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            font-weight: 400;
          ">Posts you've participated in:</h2>
          ${mapCat(data.other, formatNotificationBlock)}
        </div>
      `) || '' }

      <div style="
        background: white;
        width: 80%;
        padding: 5px 20px;
        margin-bottom: 25px;
      ">
        <p style="font-size: 14px;">Keep up all the great work and thank you for contributing to the community!</p>
        <p style="font-size: 14px; font-weight: 600;">Robin @ Journaly</p>
      </div>
      <div style="
        padding: 40px 20px;
        margin-bottom: 25px;
        background-color: #313131;
        width: 80%;
        text-align: center; 
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-weight: 400;
        font-size: 10px;
      ">
      <p style="
        text-transform: uppercase;
        color: white;
      ">
        Sent with ❤️ from the <a href="https://www.journaly.com" style="color: #4391C9; text-decoration: none;">journaly</a> team
      </p>
      </div>
    </div>
  `
}

const getDataForUpdateEmail = async (userId: number) => {
  const prisma = getDBClient()
  const validated: ValidatedNotification[] = []

  const user = (await prisma.user.findUnique({ where: { id: userId } })) as User
  const notes = await prisma.pendingNotification.findMany({
    where: {
      userId
    },
    include: {
      user: true,
      postComment: {
        select: {
          body: true,
          post: true,
        }
      },
      comment: {
        select: {
          body: true,
          thread: {
            select: {
              highlightedContent: true,
              post: true,
            }
          }
        }
      },
    }
  })

  notes.forEach(note => {
    if (note.type === NotificationType.POST_COMMENT) {
      if (note.postComment) {
        validated.push({
          type: note.type,
          postComment: note.postComment,
          post: note.postComment.post,
        })
      }
    } else if (note.type === NotificationType.THREAD_COMMENT) {
      if (note.comment) {
        validated.push({
          type: note.type,
          comment: note.comment,
          thread: note.comment.thread,
          post: note.comment.thread.post,
        })
      }
    }
  })

  return {
    user,
    own: validated.filter(({ post }) => post.authorId === userId),
    other: validated.filter(({ post }) => post.authorId !== userId),
  }
}

module.exports.sendUpdateEmails = async () => {
  const sqs = getSQS()
  const usersToUpdate = await getUsersToNotify()

  const emailPromises = usersToUpdate.map(async ({ userId }) => {
    const data = await getDataForUpdateEmail(userId)
    const body = createUpdateEmailBody(data)
    return enqueueEmail({
      from: 'robin@journaly.com',
      to: user.email,
      subject: 'New Activity on Journaly 📖',
      html: body,
    })
  })

  await Promise.all(emailPromises)
}

module.exports.testFunc = async () => {
  const users = await getUsersToNotify()
  users.map(async ({ userId }) => {
    console.log(createUpdateEmailBody(await getDataForUpdateEmail(userId)))
    console.log('================================================')
  })
  return null
}

module.exports.processJMailQueue = async (event: any, context: any) => {
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST as string,
    port: parseInt(process.env.MAIL_PORT || '25', 10),
    auth: {
      user: process.env.MAIL_USER as string,
      pass: process.env.MAIL_PASSWORD as string,
    },
    secure: process.env.MAIL_SECURE === 'true',
  })

  for (let record of event.Records) {
    const { to, from, subject, html } = JSON.parse(record.body)

    await transport.sendMail({
      to,
      from,
      subject,
      html,
    })
  }

  console.log('Success!')

  context.done(null, '')
}
