/* eslint-disable @typescript-eslint/no-namespace */

import { PrismaClient } from '@journaly/j-db-client'

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient
    }
  }
}

// Set to true to log from prisma aggressively. Requires server restart.
const SQL_DEBUG = false

let _prisma: PrismaClient | null

const getClient = (): PrismaClient => {
  if (process.env.NODE_ENV === 'development') {
    if (!global.prisma) {
      console.log('Creating new database client [DEV]')
      global.prisma = new PrismaClient(
        SQL_DEBUG ? { log: ['query', 'info', 'warn', 'error'] } : undefined,
      )
    }

    return global.prisma
  } else {
    if (!_prisma) {
      console.log('Creating new database client [PROD]')
      _prisma = new PrismaClient(
        SQL_DEBUG ? { log: ['query', 'info', 'warn', 'error'] } : undefined,
      )
    }

    return _prisma
  }
}

export { getClient }
