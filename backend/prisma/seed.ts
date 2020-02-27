import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

main().catch(e => {
  throw e
})

async function main() {
  // const results = await Promise.all(
  //   [
  //     {
  //       name: 'Earth',
  //       population: 6_000_000_000,
  //     },
  //     {
  //       name: 'Mars',
  //       population: 0,
  //     },
  //   ].map(data => db.world.create({ data })),
  // )

  // console.log('Seeded: %j', results)

  console.log('querying...')

  const result = await db.post.findMany()

  console.log({ result })

  db.disconnect()
}
