import bcrypt from 'bcryptjs'
import { PrismaClient } from '@journaly/j-db-client'
import { LanguageLevel, UILanguage } from '.prisma/client/index'

const db = new PrismaClient()

main().catch((e) => {
  throw e
})

async function main() {
  // Create a generic password for all seed users
  const hashedPassword = await bcrypt.hash('password', 10)

  // Create languages
  const Andalish = await db.language.create({
    data: {
      name: 'The Common Tongue of the Andals',
    },
  })
  const French = await db.language.create({
    data: {
      name: 'French',
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
      dialect: 'Braavosi',
    },
  })

  // Create users with posts and comments
  const jon = await db.user.create({
    data: {
      handle: 'jsno',
      name: 'Jon Snow',
      email: 'j@n.com',
      languages: {
        create: [
          {
            level: LanguageLevel.NATIVE,
            language: {
              connect: {
                id: Andalish.id,
              },
            }
          }, 
          {
            level: LanguageLevel.INTERMEDIATE,
            language: {
              connect: {
                id: French.id,
              },
            }
          },
        ]
      },
      auth: {
        create: {
          password: hashedPassword,
        },
      },
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
            excerpt: "He's not my son",
            language: {
              connect: { id: Andalish.id },
            },
            status: 'PUBLISHED',
          },
        ],
      },
    },
    include: {
      posts: true,
    },
  })

  const tywin = await db.user.create({
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
            body: `
              <p>While I may be a <em>little</em> biased, I think this is a good song.</p>
              
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
            `,
            excerpt:
              'The Rains of Castamere. While I may be a little biased, I think this is a good song. One night...',
            language: {
              connect: { id: Andalish.id },
            },
            status: 'PUBLISHED',
            threads: {
              create: [
                {
                  startIndex: 47,
                  endIndex: 74,
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

  // Create posts
  await db.post.create({
    data: {
      title: 'Beyond The Wall',
      body: 'She is my queen. The end.',
      excerpt: 'She is my queen. The end.',
      language: {
        connect: { id: Andalish.id },
      },
      status: 'PUBLISHED',
      author: {
        connect: { id: jon.id },
      },
    },
  })
  await db.post.create({
    data: {
      title: 'Les Pluies de Castamere',
      body: `
          <p>This One's for you, Tywin.</p>
        
          <p>
            I studied up on my French quite a lot during my days up on the wall. Especially when Sam would fall asleep during the night shift. I thought Lord Tywin might appreciate this, since he loves the French <span>so much</span>.
          </p>
        
          <p>
            Et qui êtes-vous, demanda le seigneur majestueux,
            Pour que je doive m'incliner si bas?
          </p>
          <p>
            Rien qu'un chat à la robe différente,
            Voilà la seule chose dont je sois sûr.
          </p>
          <p>
            Sous une robe dorée ou une robe rouge,
            Un lion a toujours des griffes,
          </p>
          <p>
            Et les miennes sont longues et aiguisées, mon seigneur,
            Aussi longues et aiguisées que les vôtres.
          </p>
        
          <p>
          Ainsi parla-t-il, ainsi parla-t-il,
          Le seigneur de Castamere,
          </p>
        
          <p>
          Mais maintenant, le ciel pleure au-dessus de sa grande salle,
          Et il n'y a personne pour l'entendre.
          </p>
        
          <p>
          Oui, maintenant, le ciel pleure au-dessus de sa grande salle,
          Et il n'y a pas une âme pour l'entendre.
          </p>
      `,
      excerpt:
        'Les Pluies de Castamere. I studied up on my French quite a lot during my days up on the wall. Especially when Sam would fall asleep during the night shift. I thought...',
      language: {
        connect: {
          id: French.id,
        },
      },
      status: 'PUBLISHED',
      author: {
        connect: { id: jon.id },
      },
      threads: {
        create: [
          {
            startIndex: 11,
            endIndex: 36,
            highlightedContent: "This One's for you, Tywin",
            comments: {
              create: [
                {
                  body: 'You bastard!',
                  author: {
                    connect: { id: tywin.id },
                  },
                },
                {
                  body: 'HA HA!',
                  author: {
                    connect: { id: ned.id },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  })

  // Add images and connect to posts
  await db.image.create({
    data: {
      smallSize:
        'https://res.cloudinary.com/journaly/image/upload/v1574187295/journaly/p5dxflsivmpwii9146rw.jpg',
      largeSize:
        'https://res.cloudinary.com/journaly/image/upload/v1574187295/journaly/p5dxflsivmpwii9146rw.jpg',
      imageRole: 'HEADLINE',
      post: {
        connect: {
          id: 1,
        },
      },
    },
  })

  await db.image.create({
    data: {
      smallSize:
        'https://res.cloudinary.com/journaly/image/upload/v1573956654/journaly/uzlkstq7jp4wi0m0mmvy.jpg',
      largeSize:
        'https://res.cloudinary.com/journaly/image/upload/v1573956654/journaly/uzlkstq7jp4wi0m0mmvy.jpg',
      imageRole: 'HEADLINE',
      post: {
        connect: {
          id: 2,
        },
      },
    },
  })

  await db.image.create({
    data: {
      smallSize:
        'https://res.cloudinary.com/journaly/image/upload/v1574186170/journaly/f5kflfytag99wwsflhtj.jpg',
      largeSize:
        'https://res.cloudinary.com/journaly/image/upload/v1574186170/journaly/f5kflfytag99wwsflhtj.jpg',
      imageRole: 'HEADLINE',
      post: {
        connect: {
          id: 3,
        },
      },
    },
  })

  await db.image.create({
    data: {
      smallSize:
        'https://res.cloudinary.com/journaly/image/upload/v1574186437/journaly/gmgxskfkwefzefoxegjx.jpg',
      largeSize:
        'https://res.cloudinary.com/journaly/image/upload/v1574186437/journaly/gmgxskfkwefzefoxegjx.jpg',
      imageRole: 'HEADLINE',
      post: {
        connect: {
          id: 4,
        },
      },
    },
  })

  await Promise.all([
    {
      devName: 'Language Learning',
      topicTranslations: {
        create: [
          { uiLanguage: UILanguage.ENGLISH, name: 'Language Learning' },
          { uiLanguage: UILanguage.GERMAN, name: 'Language Learning (in german)' }
        ]
      }
    },
    {
      devName: 'Heraldry',
      topicTranslations: {
        create: [
          { uiLanguage: UILanguage.ENGLISH, name: 'Heraldry' },
          { uiLanguage: UILanguage.GERMAN, name: 'Heraldry (in german)' }
        ]
      }
    },
    {
      devName: 'Westerosi History',
      topicTranslations: {
        create: [
          { uiLanguage: UILanguage.ENGLISH, name: 'Westerosi History' },
          { uiLanguage: UILanguage.GERMAN, name: 'Westerosi History (in german)' }
        ]
      }
    },
  ].map(data => db.topic.create({ data })))


  console.log('Seeding successful')

  db.$disconnect()
}
