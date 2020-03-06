import cors from 'cors'
import { server } from 'nexus-future'

server.custom(({ express }) => {
  express.use(cors())
})
