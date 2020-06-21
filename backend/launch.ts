import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

main().catch((e) => {
  throw e
})

async function main() {
  // Create base set of languages

  await db.language.create({
    data: {
      name: 'Mandarin Chinese',
    },
  })
  await db.language.create({
    data: {
      name: 'Spanish',
    },
  })
  await db.language.create({
    data: {
      name: 'English',
    },
  })
  await db.language.create({
    data: {
      name: 'Hindi',
    },
  })
  await db.language.create({
    data: {
      name: 'Bengali',
    },
  })
  await db.language.create({
    data: {
      name: 'Portuguese',
      dialect: 'European',
    },
  })
  await db.language.create({
    data: {
      name: 'Portuguese',
      dialect: 'Brazilian',
    },
  })
  await db.language.create({
    data: {
      name: 'Russian',
    },
  })
  await db.language.create({
    data: {
      name: 'Japanese',
    },
  })
  await db.language.create({
    data: {
      name: 'Western Punjabi',
    },
  })
  await db.language.create({
    data: {
      name: 'Marathi',
    },
  })
  await db.language.create({
    data: {
      name: 'Telugu',
    },
  })
  await db.language.create({
    data: {
      name: 'Turkish',
    },
  })
  await db.language.create({
    data: {
      name: 'Korean',
    },
  })
  await db.language.create({
    data: {
      name: 'French',
    },
  })
  await db.language.create({
    data: {
      name: 'German',
    },
  })
  await db.language.create({
    data: {
      name: 'Vietnamese',
    },
  })
  await db.language.create({
    data: {
      name: 'Tamil',
    },
  })
  await db.language.create({
    data: {
      name: 'Urdu',
    },
  })
  await db.language.create({
    data: {
      name: 'Javanese',
    },
  })
  await db.language.create({
    data: {
      name: 'Italian',
    },
  })
  await db.language.create({
    data: {
      name: 'Arabic',
      dialect: 'Egyptian',
    },
  })
  await db.language.create({
    data: {
      name: 'Gujarati',
    },
  })
  await db.language.create({
    data: {
      name: 'Farsi',
    },
  })
  await db.language.create({
    data: {
      name: 'Hakka Chinese',
    },
  })
  await db.language.create({
    data: {
      name: 'Indonesian',
    },
  })
  await db.language.create({
    data: {
      name: 'Malay',
    },
  })
  await db.language.create({
    data: {
      name: 'Ukranian',
    },
  })
  await db.language.create({
    data: {
      name: 'Romanian',
    },
  })
  await db.language.create({
    data: {
      name: 'Dutch',
    },
  })
  await db.language.create({
    data: {
      name: 'Thai',
    },
  })
  await db.language.create({
    data: {
      name: 'Greek',
    },
  })
  await db.language.create({
    data: {
      name: 'Czech',
    },
  })

  // Create topics
  await db.topic.create({
    data: {
      name: 'Cooking',
    },
  })
  await db.topic.create({
    data: {
      name: 'Rock Climbing',
    },
  })
  await db.topic.create({
    data: {
      name: 'Mathematics',
    },
  })
  await db.topic.create({
    data: {
      name: 'Acting',
    },
  })
  await db.topic.create({
    data: {
      name: 'Animation',
    },
  })
  await db.topic.create({
    data: {
      name: 'Anime',
    },
  })
  await db.topic.create({
    data: {
      name: 'Baking',
    },
  })
  await db.topic.create({
    data: {
      name: 'Writing',
    },
  })
  await db.topic.create({
    data: {
      name: 'Martial Arts',
    },
  })
  await db.topic.create({
    data: {
      name: 'Breadmaking',
    },
  })
  await db.topic.create({
    data: {
      name: 'Sewing',
    },
  })
  await db.topic.create({
    data: {
      name: 'Woodworking',
    },
  })
  await db.topic.create({
    data: {
      name: 'Metalworking',
    },
  })
  await db.topic.create({
    data: {
      name: 'Photography',
    },
  })
  await db.topic.create({
    data: {
      name: 'Creative Writing',
    },
  })
  await db.topic.create({
    data: {
      name: 'Music',
    },
  })
  await db.topic.create({
    data: {
      name: 'Songwriting',
    },
  })
  await db.topic.create({
    data: {
      name: 'Dancing',
    },
  })
  await db.topic.create({
    data: {
      name: 'Traveling',
    },
  })
  await db.topic.create({
    data: {
      name: 'Yoga',
    },
  })
  await db.topic.create({
    data: {
      name: 'Meditation',
    },
  })
  await db.topic.create({
    data: {
      name: 'Origami',
    },
  })
  await db.topic.create({
    data: {
      name: 'Pottery',
    },
  })
  await db.topic.create({
    data: {
      name: 'Programming',
    },
  })
  await db.topic.create({
    data: {
      name: 'Graphic design',
    },
  })
  await db.topic.create({
    data: {
      name: 'Glassblowing',
    },
  })

  console.log('Launch database seeding successful!')

  db.disconnect()
}
