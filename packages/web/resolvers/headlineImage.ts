import { objectType } from 'nexus'

const HeadlineImage = objectType({
  name: 'HeadlineImage',
  definition(t) {
    t.model.id()
    t.model.smallSize()
    t.model.largeSize()
  },
})

export default [HeadlineImage]
