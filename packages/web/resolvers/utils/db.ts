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

export { getClient }
