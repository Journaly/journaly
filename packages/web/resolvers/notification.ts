import { objectType } from 'nexus'

const Notification = objectType({
  name: 'Notification',
  definition(t) {
    t.model.id()
  },
})

const ThreadNotification = objectType({
  name: 'Notification',
  definition(t) {
    t.model.id()
  },
})

const PostCommentNotification = objectType({
  name: 'Notification',
  definition(t) {
    t.model.id()
  },
})

const NewFollowerNotification = objectType({
  name: 'Notification',
  definition(t) {
    t.model.id()
  },
})

const PostClapNotification = objectType({
  name: 'Notification',
  definition(t) {
    t.model.id()
  },
})

export default [
  Notification,
  ThreadNotification,
  PostCommentNotification,
  NewFollowerNotification,
  PostClapNotification,
]
