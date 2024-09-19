require('dotenv').config()
import jwt from 'jsonwebtoken'
import { ApolloServer } from 'apollo-server-micro'
import { getClient } from '@/nexus/utils'
import { readBody } from '@/nexus/utils/request'


import { schema } from '../../resolvers'

const LOG_QUERY_THRESHOLD = 1000

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => { 
    const db = getClient()

    return {
      db,
      prisma: db,
      request: req,
      response: res,
    }
  }
})

const graphqlHandler = server.createHandler({ path: '/api/graphql' })

export const config = {
  api: {
    bodyParser: false
  }
};

const handler = async (req: any, res: any) => {
  const bodyPromise = readBody(req)
  const { token } = req.cookies
  req.response = res
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET!) as any
    req.userId = userId
  }
  const start = Date.now()
  const response = await graphqlHandler(req, res)

  const gqlDuration = Date.now() - start
  console.log(`GraphQL request took ${gqlDuration} ms`)

  if (gqlDuration > LOG_QUERY_THRESHOLD) {
    console.log(
      `Request ran longer than ${LOG_QUERY_THRESHOLD}ms, request body is:`,
      await bodyPromise,
    )
  }
  return response
}

export default handler
