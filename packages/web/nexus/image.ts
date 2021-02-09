import { objectType } from '@nexus/schema'

const Image = objectType({
  name: 'Image',
  definition(t) {
    t.model.id()
    t.model.imageRole()
    t.model.smallSize()
    t.model.largeSize()
  },
})

export default [Image]
