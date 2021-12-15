import fetch from 'node-fetch'
import { getClient } from '@/nexus/utils/db'

const main = async () => {
  const db = getClient()

  let pageNum = 1
  let updateCount = 0
  let morePages = true

  while (morePages) {
    const url = `https://api.moosend.com/v3/lists/${process.env.MOOSEND_PRODUCT_UPDATES_MAILING_LIST_ID}/subscribers/Subscribed.json?apikey=${process.env.MOOSEND_API_KEY}&Page=${pageNum}&PageSize=100`
    const page = await fetch(url).then((r) => r.json())

    const updatePromises = []
    for (const sub of page.Context.Subscribers) {
      updatePromises.push(
        db.user.updateMany({
          where: { email: sub.Email },
          data: { moosendSubscriberId: sub.ID },
        }),
      )
    }
    await Promise.all(updatePromises)
    updateCount += updatePromises.length
    console.log(`Updated ${updateCount} users so far.`)

    morePages = !!page.Context.Subscribers.length
    ++pageNum
  }

  console.log('Done!')
}

main()
  .catch((e) => {
    throw e
  })
  .then(() => process.exit(0))
