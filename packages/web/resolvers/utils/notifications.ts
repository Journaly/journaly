import {
  Prisma,
  PrismaClient,
  User,
  Comment,
  PostComment,
  CommentThanks,
  PostClap,
} from '@journaly/j-db-client'

type EmailNotificationCreationType =
  | { type: 'THREAD_COMMENT'; comment: Comment }
  | { type: 'POST_COMMENT'; postComment: PostComment }
  | { type: 'THREAD_COMMENT_THANKS'; commentThanks: CommentThanks }
  | { type: 'POST_CLAP'; postClap: PostClap }

const createEmailNotification = (
  db: PrismaClient,
  user: User,
  note: EmailNotificationCreationType,
) => {
  const data: Prisma.PendingNotificationCreateInput = {
    user: { connect: { id: user.id } },
    type: note.type,
  }

  switch (note.type) {
    case 'THREAD_COMMENT': {
      data.comment = { connect: { id: note.comment.id } }
      break
    }
    case 'POST_COMMENT': {
      data.postComment = { connect: { id: note.postComment.id } }
      break
    }
    case 'THREAD_COMMENT_THANKS': {
      data.commentThanks = { connect: { id: note.commentThanks.id } }
      break
    }
    case 'POST_CLAP': {
      data.postClap = { connect: { id: note.postClap.id } }
      break
    }
    /*
    default:
      return assertUnreachable(note.type)
    */
  }

  return db.pendingNotification.create({ data })
}

type InAppNotificationSubtypes = {
  ThreadComment: {
    type: 'THREAD_COMMENT'
    subNotification: Prisma.InAppNotificationCreateInput.threadNotifications
  }
  ThreadCommentThanks: {
    type: 'THREAD_COMMENT_THANKS'
    subNotification: Prisma.InAppNotificationCreateInput.threadCommentThanksNotifications
  }
  PostClap: {
    type: 'POST_CLAP'
    subNotification: Prisma.InAppNotificationCreateInput.postClapNotifications
  }
  PostComment: {
    type: 'POST_COMMENT'
    subNotification: Prisma.InAppNotificationCreateInput.postCommentNotifications
  }
}

type BaseInAppNotificationCreationInput = {
  user: User,
  key: Partial<Pick<Prisma.InAppNotificationUncheckedCreateInput, 'postId' | 'triggeringUserId' >>
}

type InAppNotificationCreationInput = (
  BaseInAppNotificationCreationInput
  & InAppNotificationSubtypes[keyof InAppNotificationSubtypes]
)


const createInAppNotification = async (
  db: PrismaClient,
  input: InAppNotificationCreationInput,
  notificationTime?: Date
) => {
  const timestamp = notificationTime || new Date()

  let ian = await db.inAppNotification.findFirst({
    where: {
      ...input.key,
      readStatus: 'UNREAD',
      type: input.type,
      userId: input.user.id,
    },
  })

  let subnoteData: Partial<Pick<Prisma.InAppNotificationCreateInput, 'threadCommentNotifications' | 'postCommentNotifications' | 'newFollowerNotifications' | 'postClapNotifications' | 'threadCommentThanksNotifications'>>

  switch (input.type) {
    case 'THREAD_COMMENT': {
      subnoteData = {
        threadCommentNotifications: {
          create: input.subNotification
        }
      }
      break
    }
    case 'THREAD_COMMENT_THANKS': {
      subnoteData = {
        threadCommentThanksNotifications: {
          create: input.subNotification
        }
      }
      break
    }
  }

  if (ian) {
    ian = await db.inAppNotification.update({
      where: { id: ian.id },
      data: {
        ...subnoteData,
        bumpedAt: timestamp,
      }
    })
  } else {
    ian = await db.inAppNotification.create({
      data: {
        ...subnoteData,
        ...input.key,
        bumpedAt: timestamp,
        userId: input.user.id,
        type: input.type,
      }
    })
  }

  return ian
}

export {
  createEmailNotification,
  createInAppNotification
}
