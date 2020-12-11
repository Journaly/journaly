import { PrismaClient } from '@journaly/j-db-client'
import { IncomingMessage, ServerResponse } from 'http';

interface Request extends IncomingMessage {
  userId: number,
}


export type Context = {
  db: PrismaClient
  request: Request
  response: ServerResponse
}
