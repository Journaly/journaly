import { NextRequest } from 'next/server'
import { Request } from '../context'

const isNextRequest = (req: NextRequest | Request): req is NextRequest => {
  return !!(req as NextRequest).ip
}

export const getPostingIpAddress = (req: NextRequest | Request) => {
  if (isNextRequest(req)) return req.ip

  const headers =
    req?.headers['x-forwarded-for'] ||
    req?.headers['x-real-ip'] ||
    req?.headers['X-Forwarded-For'] ||
    req?.headers['X-Real-IP']
  if (typeof headers === 'string') return headers.split(',')?.[0]

  return undefined
}
