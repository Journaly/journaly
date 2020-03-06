import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { server } from 'nexus-future'

require('dotenv').config({ path: '.env ' })

server.custom(({ express }) => {
  express.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    }),
  )

  // console.log(express.request)
  express.use(cookieParser())
  express.use((request, response, next) => {
    const { token } = request.cookies

    if (token) {
      const { userId } = jwt.verify(token, process.env.APP_SECRET)
      request.userId = userId
    }
    next()
  })
})
