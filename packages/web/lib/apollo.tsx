import React from 'react'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import fetch from 'isomorphic-unfetch'

export type ApolloClientCache = any

let apolloClient: ApolloClient<ApolloClientCache> | null = null

type JournalySSRContextType = {
  redirectTarget: string | null
}

const JournalySSRContext = React.createContext<JournalySSRContextType>({
  redirectTarget: null,
})
JournalySSRContext.displayName = 'JournalySSRContext'

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
export function initApolloClient(initialState?: ApolloClientCache, headers = {}) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState, headers)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState, headers)
  }

  return apolloClient
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState: ApolloClientCache = {}, headers = {}) {
  let graphqlUri = '/api/graphql'

  if (typeof window === 'undefined') {
    // If doing SSR, we have to absolutize this URL. On client domain can be
    // inferred from document location.
    const deploymentHost = process.env.DEPLOYMENT_URL || process.env.VERCEL_URL

    if (process.env.NODE_ENV === 'production') {
      if (!deploymentHost) {
        throw new Error('In production, one of `DEPLOYMENT_URL` or `VERCEL_URL` must be set.')
      }

      graphqlUri = `https://${deploymentHost}/api/graphql`
    } else {
      graphqlUri = `http://${deploymentHost || 'localhost:3000'}/api/graphql`
    }
  } else {
    graphqlUri = `${document.location.origin}/api/graphql`
  }

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: graphqlUri,
      credentials: 'include', // Additional fetch() options like `credentials` or `headers`
      headers,
      fetch,
    }),
    cache: new InMemoryCache().restore(initialState),
    connectToDevTools: true,
  })
}

export { JournalySSRContext }
