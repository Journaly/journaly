import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

main().catch((e) => {
  throw e
})

async function main() {
  const user1 = await db.user.create({
    data: {
      Name: 'Jon Snow',
      Email: 'j@n.com',
      Password: 'password',
      posts: {
        create: {
          Title: 'Beyond The Wall',
          Body: 'She is my queen. The end.',
          Published: true,
        },
      },
    },
    include: {
      posts: true,
    },
  })
  const user2 = await db.user.create({
    data: {
      Name: 'Ned Stark',
      Email: 'st@rk.com',
      Password: 'password',
      posts: {
        create: {
          Title: 'A Tale of Winter',
          Body: "He's not my son",
          Published: true,
        },
      },
    },
    include: {
      posts: true,
    },
  })

  console.log(
    `Created users ${user1.Name} and ${user2.Name}, each with ${user1.posts.length} post!`,
  )

  db.disconnect()
}
