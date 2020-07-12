require('dotenv').config({ path: '../../.env ' })
import jwt from 'jsonwebtoken'
import { schema } from 'nexus'

if (process.env.NODE_ENV === 'development') require('nexus').default.reset()

const app = require('nexus').default

require('../../nexus')

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

export default handler
