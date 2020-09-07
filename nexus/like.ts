import { schema } from 'nexus'

schema.objectType({
  name: 'PostLike',
  definition(t) {
    t.model.id()
  },
})
