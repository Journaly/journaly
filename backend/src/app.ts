import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { server } from 'nexus-future'

server.custom(({ express }) => {
  express.use(cookieParser())
  express.use((request, response, next) => {
    const { token } = request.cookies

    if (token) {
      const { userId } = jwt.verify(token, process.env.APP_SECRET)
      request.userId = userId
    }
    next()
  })
  // express.use(cors())
})
