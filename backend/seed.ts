import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

main().catch((e) => {
  throw e
})

async function main() {
  const Andalish = await db.language.create({
    data: {
      name: 'The Common Tongue of the Andals',
    },
  })

  const user1 = await db.user.create({
    data: {
      handle: 'jsno',
      name: 'Jon Snow',
      email: 'j@n.com',
      posts: {
        create: [
          {
            title: 'Beyond The Wall',
            body: 'She is my queen. The end.',
            language: {
              connect: { id: Andalish.id },
            },
          },
        ],
      },
    },
    include: {
      posts: true,
    },
  })
  const user2 = await db.user.create({
    data: {
      handle: 'TheWardenOfTheNorth420',
      name: 'Ned Stark',
      email: 'st@rk.com',
      posts: {
        create: [
          {
            title: 'A Tale of Winter',
            body: "He's not my son",
            language: {
              connect: { id: Andalish.id },
            },
          },
        ],
      },
    },
    include: {
      posts: true,
    },
  })

  console.log(
    `Created users ${user1.name} and ${user2.name}, each with ${user1.posts.length} post!`,
  )

  db.disconnect()
}
