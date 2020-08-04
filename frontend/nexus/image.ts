import { schema } from 'nexus'

schema.objectType({
  name: 'Image',
  definition(t) {
    t.model.id()
    t.model.imageRole()
    t.model.smallSize()
    t.model.largeSize()
  },
})
