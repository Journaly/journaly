import {
  objectType,
} from '@nexus/schema'

const PostLike = objectType({
  name: 'PostLike',
  definition(t) {
    t.model.id()
  },
})

export default [
  PostLike
]
