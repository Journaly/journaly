import nodemailer from 'nodemailer'
import {
  NotificationType,
  User,
} from '@journaly/j-db-client'

import {
  getDBClient,
  ValidatedNotification,
  enqueueEmail,
} from './utils'

import updateEmail from './emails/updateEmail' 


const getUsersToNotify = async () => {
  const prisma = getDBClient()
  const users = await prisma.pendingNotification.findMany({
    select: { userId: true },
    distinct: ['userId'],
  })

  return users
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
        include: {
          post: true,
        }
      },
      comment: {
        include: {
          thread: {
            include: {
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
  const usersToUpdate = await getUsersToNotify()

  const emailPromises = usersToUpdate.map(async ({ userId }) => {
    const data = await getDataForUpdateEmail(userId)
    const body = updateEmail(data)
    return enqueueEmail({
      from: 'robin@journaly.com',
      to: data.user.email,
      subject: 'New Activity on Journaly 📖',
      html: body,
    })
  })

  await Promise.all(emailPromises)
}

module.exports.testFunc = async () => {
  const users = await getUsersToNotify()
  users.map(async ({ userId }) => {
    console.log(JSON.stringify(await getDataForUpdateEmail(userId)))
    //console.log(updateEmail(await getDataForUpdateEmail(userId)))
    //console.log('================================================')
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
