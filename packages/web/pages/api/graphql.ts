require('dotenv').config()
import jwt from 'jsonwebtoken'
import { ApolloServer } from 'apollo-server-micro'
import { getClient } from '../../nexus/utils'

import { schema } from '../../nexus'

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

const handler = (req: any, res: any) => {
  const { token } = req.cookies
  req.response = res
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET!) as any
    req.userId = userId
  }
  return graphqlHandler(req, res)
}

export default handler
