import { NextPageContext } from 'next'
import cookie from 'cookie'
import { jwtDecode } from 'jwt-decode'

export const getCurrentUserId = (ctx: NextPageContext): number | null => {
  try {
    let jwt

    if (ctx.req) {
      if (ctx.req.headers.cookie) {
        jwt = cookie.parse(ctx.req.headers.cookie).token
      } else {
        return null
      }
    } else {
      jwt = cookie.parse(document.cookie).token
    }

    const tokenContent = jwtDecode<{ userId: number }>(jwt)

    return tokenContent.userId
  } catch {
    return null
  }
}
