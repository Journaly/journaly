import {
  Prisma,
  PrismaClient,
  BadgeType,
} from '@journaly/j-db-client'

const unionSqlFragments = (
  parts: Prisma.Sql[],
) => {
  let joinedFragment = parts[0] || Prisma.empty
  for (let i = 1; i < parts.length; i++) {
    joinedFragment = Prisma.sql`${joinedFragment} UNION ${parts[i]}`
  }
  return joinedFragment
}

const assignCountBadges = (
  db: PrismaClient,
  userId: number,
  countQuery: Prisma.Sql,
  tiers: { [key: number]: BadgeType }
): Promise<number> => {
  const query = Prisma.sql`
    WITH count_query AS (${countQuery})
    INSERT INTO "UserBadge" ("type", "userId") (
      ${unionSqlFragments(
        Object.entries(tiers)
          .map(([threshold, badge]) => Prisma.sql`
            (
              SELECT
                ${badge}::"BadgeType" AS "type",
                ${userId}::integer AS "userId"
              FROM count_query WHERE count_query.count >= ${+threshold}
            )
          `)
        )
      }
    )
    ON CONFLICT DO NOTHING;
  `

  return db.$executeRaw(query)
}

export const assignBadge = async (
  db: PrismaClient,
  userId: number,
  badge: BadgeType,
): Promise<void> => {
  await db.userBadge.createMany({
    data: [{ type: badge, userId }],
    skipDuplicates: true,
  })

  return
}

export { assignCountBadges }
