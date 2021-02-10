import { readFile } from 'fs'
import csv from 'csv'
import jdbClient from '@journaly/j-db-client'
const { PrismaClient } = jdbClient


const main = async () => {
  const db = new PrismaClient()
  const uiLangs = ['GERMAN']

  for (let lang of uiLangs) {
    const mat = await (new Promise((res, rej) => {
      readFile(`translations/topics/${lang}.csv`, 'utf-8', (err, data) => {
        if (err) {
          rej(err)
          return
        }

        csv.parse(data, {}, (err, out) => err ? rej(err) : res(out))
      })
    }))

    for (let row of mat) {
      const [idStr, devName, targetName] = row
      await db.topicTranslation.upsert({
        where: {
          uiLanguage_topicId: {
            uiLanguage: lang,
            topicId: parseInt(idStr),
          },
        },
        update: {
          name: targetName,
        },
        create: {
          name: targetName,
          uiLanguage: lang,
          topic: {
            connect: {
              id: parseInt(idStr)
            }
          }
        }
      })
    }
  }
}

main()
  .catch((e) => { process.exit(1) })
  .then(() => process.exit(0))
