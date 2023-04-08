import {
  Prisma,
  PrismaClient,
  User,
  Comment,
  PostComment,
  CommentThanks,
  PostClap,
  DigestEmailConfiguration,
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
  digestEmailConfiguration: DigestEmailConfiguration,
) => {
  if (digestEmailConfiguration === DigestEmailConfiguration.OFF) return

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
    subNotification: Prisma.ThreadCommentNotificationUncheckedCreateWithoutNotificationInput
  }
  ThreadCommentThanks: {
    type: 'THREAD_COMMENT_THANKS'
    subNotification: Prisma.ThreadCommentThanksNotificationUncheckedCreateWithoutNotificationInput
  }
  PostClap: {
    type: 'POST_CLAP'
    subNotification: Prisma.PostClapNotificationUncheckedCreateWithoutNotificationInput
  }
  PostComment: {
    type: 'POST_COMMENT'
    subNotification: Prisma.PostCommentNotificationUncheckedCreateWithoutNotificationInput
  }
  NewFollower: {
    type: 'NEW_FOLLOWER'
    subNotification: Prisma.NewFollowerNotificationUncheckedCreateWithoutNotificationInput
  }
  NewPost: {
    type: 'NEW_POST'
    subNotification: Prisma.NewPostNotificationUncheckedCreateWithoutNotificationInput
  }
}

type BaseInAppNotificationCreationInput = {
  userId: number,
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
      userId: input.userId,
    },
  })

  let subnoteData: Partial<Pick<Prisma.InAppNotificationCreateInput, 'threadCommentNotifications' | 'postCommentNotifications' | 'newFollowerNotifications' | 'postClapNotifications' | 'threadCommentThanksNotifications' | 'newPostNotifications' | 'newFollowerNotifications'>>

  switch (input.type) {
    case 'THREAD_COMMENT': {
      subnoteData = {
        threadCommentNotifications: {
          create: [input.subNotification]
        }
      }
      break
    }
    case 'THREAD_COMMENT_THANKS': {
      subnoteData = {
        threadCommentThanksNotifications: {
          create: [input.subNotification]
        }
      }
      break
    }
    case 'POST_CLAP': {
      subnoteData = {
        postClapNotifications: {
          create: [input.subNotification]
        }
      }
      break
    }
    case 'POST_COMMENT': {
      subnoteData = {
        postCommentNotifications: {
          create: [input.subNotification]
        }
      }
      break
    }
    case 'NEW_POST': {
      subnoteData = {
        newPostNotifications: {
          create: [input.subNotification]
        }
      }
      break
    }
    case 'NEW_FOLLOWER': {
      subnoteData = {
        newFollowerNotifications: {
          create: [input.subNotification]
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
        userId: input.userId,
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
