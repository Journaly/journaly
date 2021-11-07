import { objectType } from 'nexus'

const InAppNotification = objectType({
  name: 'InAppNotification',
  definition(t) {
    t.model.id()
    t.model.type()
    t.model.bumpedAt()
    t.model.post()
    t.model.triggeringUser()
    t.model.threadCommentNotifications({ pagination: false })
    t.model.postCommentNotifications({ pagination: false })
    t.model.newFollowerNotifications({ pagination: false })
    t.model.postClapNotifications({ pagination: false })
    t.model.threadCommentThanksNotifications({ pagination: false })
  },
})

const ThreadCommentNotification = objectType({
  name: 'ThreadCommentNotification',
  definition(t) {
    t.model.id()
    t.model.comment()
  }
})

const PostCommentNotification = objectType({
  name: 'PostCommentNotification',
  definition(t) {
    t.model.id()
  }
})

const NewFollowerNotification = objectType({
  name: 'NewFollowerNotification',
  definition(t) {
    t.model.id()
  }
})

const PostClapNotification = objectType({
  name: 'PostClapNotification',
  definition(t) {
    t.model.id()
    t.model.postClap()
  }
})

const ThreadCommentThanksNotification = objectType({
  name: 'ThreadCommentThanksNotification',
  definition(t) {
    t.model.id()
    t.model.thanks()
  }
})

export default [
  InAppNotification,
  ThreadCommentNotification,
  PostCommentNotification,
  NewFollowerNotification,
  PostClapNotification,
  ThreadCommentThanksNotification,
]
