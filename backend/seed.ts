import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

main().catch((e) => {
  throw e
})

const longPost = `
<h1>The Rains of Castamere</h1>

While I may be a <em>little</em> biased, I think this is a good song.

<h2>Verse One</h2>
<p>
  One night, I hold on you <br>
  Ooh, ooh, ooh, ooh, ooh, you <br>
  Castamere, Castamere, Castamere, Castamere<br>
</p>

<h2>Verse Two</h2>
<p>
  A coat of gold, a coat of red<br>
  A lion still has claws<br>
  And mine are long and sharp, my Lord<br>
  As long and sharp as yours<br>
</p>

<h2>Verse Three</h2>
<p>
  And so he spoke, and so he spoke<br>
  That Lord of Castamere<br>
  And now the rains weep o'er his halls<br>
  With no one there to hear<br>
</p>

<h2>Verse Four</h2>
<p>
  Yes, now the rains weep o'er his halls<br>
  And not a soul to hear<br>
  Ooh, ooh, ooh, ooh, ooh<br>
</p>
`

async function main() {
  const hashedPassword = await bcrypt.hash('password', 10)

  const Andalish = await db.language.create({
    data: {
      name: 'The Common Tongue of the Andals',
    },
  })

  await db.language.create({
    data: {
      name: 'Dothraki',
    },
  })

  await db.language.create({
    data: {
      name: 'Valyrian',
      dialect: 'High',
    },
  })

  await db.language.create({
    data: {
      name: 'Valyrian',
      dialect: 'Baavosi',
    },
  })

  const jon = await db.user.create({
    data: {
      handle: 'jsno',
      name: 'Jon Snow',
      email: 'j@n.com',
      auth: {
        create: {
          password: hashedPassword,
        },
      },
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

  const ned = await db.user.create({
    data: {
      handle: 'TheWardenOfTheNorth420',
      name: 'Ned Stark',
      email: 'st@rk.com',
      auth: {
        create: {
          password: hashedPassword,
        },
      },
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

  await db.user.create({
    data: {
      handle: 'TheLannyster',
      name: 'Tywin Lannister',
      email: 'tywin@lannysport.net',
      auth: {
        create: {
          password: hashedPassword,
        },
      },
      posts: {
        create: [
          {
            title: 'The Rains of Castamere',
            body: longPost,
            language: {
              connect: { id: Andalish.id },
            },
            threads: {
              create: [
                {
                  startIndex: 57,
                  endIndex: 84,
                  highlightedContent: 'I think this is a good song',
                  comments: {
                    create: [
                      {
                        body: 'Get over yourself Tywin.',
                        author: {
                          connect: { id: ned.id },
                        },
                      },
                      {
                        body: 'You tell em dad!',
                        author: {
                          connect: { id: jon.id },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    include: {
      posts: true,
    },
  })

  console.log('Seeding successful')

  db.disconnect()
}
