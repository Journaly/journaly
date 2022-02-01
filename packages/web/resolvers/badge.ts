import { enumType } from 'nexus'
import { BadgeType } from 'nexus-prisma'

const BadgeTypeEnum = enumType({
  name: BadgeType.name,
  description: BadgeType.description,
  members: BadgeType.members,
})

export default [BadgeTypeEnum]
