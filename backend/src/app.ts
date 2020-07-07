import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { server, schema } from 'nexus'
import './serverless_functions/graphql'

require('dotenv').config({ path: '../.env ' })

// Watch https://github.com/graphql-nexus/nexus/issues/524
// and https://github.com/graphql-nexus/nexus/issues/523 for future
// changes to this function
schema.addToContext((request: any) => ({
  request,
  response: request.response,
}))

server.express.use(
  cors({
    origin: process.env.FRONTEND_URL!,
    credentials: true,
  }),
)

server.express.use(cookieParser())

// decode JWT to be used on each request
server.express.use((request: any, response, next) => {
  const { token } = request.cookies
  request.response = response
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET!) as any
    request.userId = userId
  }
  next()
})

export default server
