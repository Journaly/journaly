import { schema } from 'nexus-future'

schema.objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.author()
  },
})

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.name()
    t.model.email()
  },
})
