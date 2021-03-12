require('dotenv').config()
import jwt from 'jsonwebtoken'
import { ApolloServer } from 'apollo-server-micro'
import { PrismaClient } from '@journaly/j-db-client'

import { schema } from '../../nexus'

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

let _prisma: PrismaClient | null

const getClient = (): PrismaClient => {
  if (process.env.NODE_ENV === 'development') {
    if (!global.prisma) {
      console.log('Creating new database client [DEV]')
      global.prisma = new PrismaClient()
    }

    return global.prisma
  } else {
    if (!_prisma) {
      console.log('Creating new database client [PROD]')
      _prisma = new PrismaClient()
    }

    return _prisma
  }
}


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
