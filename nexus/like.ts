import { schema } from 'nexus'

schema.objectType({
  name: 'PostLike',
  definition(t) {
    t.model.id()
  },
})

schema.objectType({
  name: 'CommentLike',
  definition(t) {
    t.model.id()
    t.model.commentId()
    t.model.author()
  },
})
