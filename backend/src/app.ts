import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { server, schema } from 'nexus'

require('dotenv').config({ path: '../.env ' })

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
