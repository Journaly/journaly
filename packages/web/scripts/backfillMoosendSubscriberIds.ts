import fetch from 'node-fetch'
import { getClient } from '@/nexus/utils/db'

const main = async () => {
  const db = getClient()

  let pageNum = 1
  let morePages = true

  while (morePages) {
    const url = `https://api.moosend.com/v3/lists/${process.env.MOOSEND_PRODUCT_UPDATES_MAILING_LIST_ID}/subscribers/Subscribed.json?apikey=${process.env.MOOSEND_API_KEY}&Page=${pageNum}&PageSize=3`
    const page = await fetch(url).then(r => r.json())

    morePages = false
    console.log(page)
  }
}

main()
