import {
  objectType,
} from 'nexus'

const PostLike = objectType({
  name: 'PostLike',
  definition(t) {
    t.model.id()
  },
})

export default [
  PostLike
]
