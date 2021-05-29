import nodemailer from 'nodemailer'
import { Handler, SQSHandler } from 'aws-lambda'

import {
  NotificationType,
  User,
} from '@journaly/j-db-client'

import updateEmail from './emails/updateEmail' 
import {
  getDBClient,
  ValidatedNotification,
  DataForUpdateEmail,
  enqueueEmail,
} from './utils'

const getUsersToNotify = async () => {
  const prisma = getDBClient()
  const users = await prisma.pendingNotification.findMany({
    select: { userId: true },
    distinct: ['userId'],
  })

  return users
}

const getDataForUpdateEmail = async (
  userId: number
): Promise<DataForUpdateEmail> => {
  const prisma = getDBClient()
  const validated: ValidatedNotification[] = []
  let lastNotificationDate = new Date(0)
  let thanksCount = 0

  const user = (await prisma.user.findUnique({ where: { id: userId } })) as User
  const notes = await prisma.pendingNotification.findMany({
    where: {
      userId
    },
    include: {
      user: true,
      postComment: {
        include: {
          post: {
            include: {
              images: true,
            }
          },
          author: true,
        },
      },
      comment: {
        include: {
          thread: {
            include: {
              post: {
                include: {
                  images: true,
                }
              }
            }
          },
          author: true,
        },
      },
      commentThanks: true,
    }
  })

  notes.forEach((note) => {
    lastNotificationDate = (lastNotificationDate < note.createdAt)
      ? note.createdAt
      : lastNotificationDate

    if (note.type === NotificationType.POST_COMMENT) {
      if (note.postComment) {
        validated.push({
          type: note.type,
          notificationDate: note.createdAt,
          postComment: note.postComment,
          post: note.postComment.post,
          headlineImage: note.postComment.post.headlineImage,
          commentAuthor: note.postComment.author.handle,
        })
      }
    } else if (note.type === NotificationType.THREAD_COMMENT) {
      if (note.comment) {
        validated.push({
          type: note.type,
          notificationDate: note.createdAt,
          comment: note.comment,
          thread: note.comment.thread,
          post: note.comment.thread.post,
          headlineImage: note.comment.thread.post.headlineImage,
          commentAuthor: note.comment.author.handle,
        })
      }
    } else if (note.type === NotificationType.THREAD_COMMENT_THANKS) {
      thanksCount++
    }
  })

  return {
    user,
    lastNotificationDate,
    own: validated.filter(({ post }) => post.authorId === userId),
    other: validated.filter(({ post }) => post.authorId !== userId),
    thanksCount,
  }
}

export const sendUpdateEmails: Handler = async (event, context) => {
  const prisma = getDBClient()
  const usersToUpdate = await getUsersToNotify()
  const emailPromises = usersToUpdate.map(async ({ userId }) => {
    const data = await getDataForUpdateEmail(userId)
    const body = updateEmail(data)

    await enqueueEmail({
      from: 'robin@journaly.com',
      to: data.user.email,
      subject: 'New Activity on Journaly 📖',
      html: body,
    })

    return prisma.pendingNotification.deleteMany({
      where: {
        userId,
        createdAt: {
          lte: data.lastNotificationDate
        }
      }
    })
  })

  await Promise.all(emailPromises)

  return { message: `${emailPromises.length} emails sent` }
}

export const processJMailQueue: SQSHandler = async (event, context) => {
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
}
