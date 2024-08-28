import { NextRequest } from 'next/server'

export const getPostingIpAddress = (req: NextRequest) => {
  return req?.ip ?? req?.headers.get('X-Forwarded-For')?.split(',')?.[0]
}
