require('dotenv').config()
import jwt from 'jsonwebtoken'
import { ApolloServer, gql } from 'apollo-server-micro'
import { PrismaClient } from '@prisma/client'

import { schema } from '../../nexus'


/*
// Watch https://github.com/graphql-nexus/nexus/issues/524
// and https://github.com/graphql-nexus/nexus/issues/523 for future
// changes to this function
schema.addToContext((request: any) => ({
  request,
  response: request.response,
}))

app.assemble()

function handler(req: any, res: any) {
  const { token } = req.cookies
  req.response = res
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET!) as any
    req.userId = userId
  }
  return app.server.handlers.graphql(req, res)
}
*/

const db = new PrismaClient()

const server = new ApolloServer({
  schema,
  context: () => ({ db })
})

const graphqlHandler = server.createHandler({ path: '/api/graphql' })

export const config = {
  api: {
    bodyParser: false
  }
};

const hz = (...args) => {
  console.log('hey!');
  return graphqlHandler(...args);
}

export default hz;
//export default handler
