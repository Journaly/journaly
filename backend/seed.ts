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
  One night, I hold on you
  Ooh, ooh, ooh, ooh, ooh, you
  Castamere, Castamere, Castamere, Castamere
</p>

<h2>Verse Two</h2>
<p>
  A coat of gold, a coat of red
  A lion still has claws
  And mine are long and sharp, my Lord
  As long and sharp as yours
</p>

<h2>Verse Three</h2>
<p>
  And so he spoke, and so he spoke
  That Lord of Castamere
  And now the rains weep o'er his halls
  With no one there to hear
</p>

<h2>Verse Four</h2>
<p>
  Yes, now the rains weep o'er his halls
  And not a soul to hear
  Ooh, ooh, ooh, ooh, ooh
</p>
`

async function main() {
  const Andalish = await db.language.create({
    data: {
      name: 'The Common Tongue of the Andals',
    },
  })

  await db.user.create({
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

  await db.user.create({
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

  await db.user.create({
    data: {
      handle: 'TheLannyster',
      name: 'Tywin Lannister',
      email: 'tywin@lannysport.net',
      posts: {
        create: [
          {
            title: 'The Rains of Castamere',
            body: longPost,
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

  console.log('Seeding successful')

  db.disconnect()
}
