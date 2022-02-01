import { objectType } from 'nexus'
import { HeadlineImage } from 'nexus-prisma'

const HeadlineImageType = objectType({
  name: HeadlineImage.$name,
  description: HeadlineImage.$description,
  definition(t) {
    t.field(HeadlineImage.id)
    t.field(HeadlineImage.smallSize)
    t.field(HeadlineImage.largeSize)
  },
})

export default [HeadlineImageType]
