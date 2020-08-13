import { schema } from 'nexus'

schema.objectType({
  name: 'Location',
  definition(t) {
    t.model.id()
    t.model.country()
    t.model.city()
  },
})

schema.objectType({
  name: 'PostLike',
  definition(t) {
    t.model.id()
  },
})
