import {
  PrismaClient,
} from '@journaly/j-db-client'

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

// Set to true to log from prisma aggressively. Requires server restart.
const SQL_DEBUG = false
const PRISMA_OPTIONS = SQL_DEBUG
  ? { log: ['query', 'info', 'warn', 'error'] }
  : {}

let _prisma: PrismaClient | null

const getClient = (): PrismaClient => {
  if (process.env.NODE_ENV === 'development') {
    if (!global.prisma) {
      console.log('Creating new database client [DEV]')
      global.prisma = new PrismaClient(PRISMA_OPTIONS)
    }

    return global.prisma
  } else {
    if (!_prisma) {
      console.log('Creating new database client [PROD]')
      _prisma = new PrismaClient(PRISMA_OPTIONS)
    }

    return _prisma
  }
}

export { getClient }
