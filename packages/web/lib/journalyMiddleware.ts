import { ApolloClient } from '@apollo/client'
import { NextPageContext } from 'next'
import { initApolloClient } from './apollo'

export const journalyMiddleware = async (
  ctx: NextPageContext,
  callback: (apolloClient: ApolloClient<any>) => Promise<unknown>,
) => {
  const headers: any = {}
  if (typeof window === 'undefined' && ctx.req) {
    // If SSR, copy the request cookies into apollo client so it has the same
    // auth context as the request for the page.
    headers['cookie'] = ctx.req.headers.cookie
  }
  const apolloClient = initApolloClient({}, headers)
  await callback(apolloClient)
  return {
    apolloState: apolloClient.cache.extract(),
  }
}
