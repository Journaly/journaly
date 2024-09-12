import { NextRequest } from 'next/server'
import { Request } from '../context'

const isNextRequest = (req: NextRequest | Request): req is NextRequest => {
  return !!(req as NextRequest).ip
}

export const getPostingIpAddress = (req: NextRequest | Request) => {
  console.log('headers', req?.headers)
  console.log('ip', (req as any)?.ip)

  if (isNextRequest(req)) return req.ip

  const headers = req?.headers['X-Forwarded-For']
  if (typeof headers === 'string') return headers.split(',')?.[0]

  return undefined
}
