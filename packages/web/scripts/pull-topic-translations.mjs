import { writeFile } from 'fs'
import csv from 'csv'
import jdbClient from '@journaly/j-db-client'

const { PrismaClient } = jdbClient

const sourceSequence = `food
reading
business
travel
memories
exercise
creativity
relationships
education
cooking
mystery
diet
romance
health
fiction
nutrition
non-fiction
fantasy
sports
art
running
design
photography
adventure
filmmaking
painting
drawing
video games
horror
love
culture
lifestyle
daily life
music
nature
language learning
politics
podcasts
animals
veganism
history
habits
productivity
time management
recommendations
tv series
movies
intercultural communication
introduction
literature
weather
cinema
interior design
architecture
fashion
research
science
biology
physics
chemistry
psychology
cognitive science
sleep
memory
friendship
language exchanges
linguistics
yoga
mindfulness
meditation
comedy
philosophy
tv shows
multilingual book club 01
family
parenting
programming
pets
wildlife
hobbies
board games
games`.split('\n')

const priority = ({ id, devName }) => {
  const pos = sourceSequence.indexOf(devName)
  return (pos === -1) ? (id + 9999) : pos
}

const main = async () => {
  const db = new PrismaClient()
  const uiLangs = ['GERMAN']

  const topics = (await db.topic.findMany({})).sort((a, b) => priority(a) - priority(b))

  for (let lang of uiLangs) {
    const table = []

    for (let topic of topics) {
      const translation = await db.topicTranslation.findUnique({
        where: {
          uiLanguage_topicId: {
            topicId: topic.id,
            uiLanguage: lang
          }
        }
      })

      table.push([topic.id, topic.devName, translation?.name || ''])
    }

    const repr = await (new Promise(
      (res, rej) => csv.stringify(table, (err, out) => err ? rej(err) : res(out))
    ))

    await (new Promise((res, rej) => {
      writeFile(`translations/topics/${lang}.csv`, repr, res)
    }))
  }
}

main()
  .catch((e) => { throw e })
  .then(() => process.exit(0))

export {}
