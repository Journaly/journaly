import React from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import fetch from 'isomorphic-unfetch'
import { NextPage } from 'next'

export type ApolloClientCache = any

let apolloClient: ApolloClient<ApolloClientCache> | null = null

type JournalySSRContextType = {
  redirectTarget: string | null
}

const JournalySSRContext = React.createContext<JournalySSRContextType>({
  redirectTarget: null,
})
JournalySSRContext.displayName = 'JournalySSRContext'

interface WithApolloInitialProps {
  apolloState?: ApolloClientCache
}

interface WithApolloProps extends WithApolloInitialProps {
  apolloClient?: ApolloClient<ApolloClientCache>
  ssrContext: JournalySSRContextType
}

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo<PageProps extends object, PageInitialProps = PageProps>(
  PageComponent: NextPage<PageProps, PageInitialProps>,
  { ssr = true } = {},
) {
  const WithApollo: NextPage<
    PageProps & WithApolloProps,
    PageInitialProps & WithApolloInitialProps
  > = ({ apolloClient, apolloState, ssrContext, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState)
    return (
      <JournalySSRContext.Provider value={ssrContext}>
        <ApolloProvider client={client}>
          <PageComponent {...(pageProps as PageProps)} />
        </ApolloProvider>
      </JournalySSRContext.Provider>
    )
  }

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName = PageComponent.displayName || PageComponent.name || 'Component'

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.')
    }

    WithApollo.displayName = `withApollo(${displayName})`
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx) => {
      const { AppTree, req } = ctx

      const headers: any = {}
      if (typeof window === 'undefined' && req) {
        // If SSR, copy the request cookies into apollo client so it has the same
        // auth context as the request for the page.
        headers['cookie'] = req.headers.cookie
      }

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = (ctx.apolloClient = initApolloClient({}, headers))

      // Run wrapped getInitialProps methods
      let pageProps = {} as PageInitialProps
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx)
      }

      // Only on the server:
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps
        }

        // Only if ssr is enabled
        if (ssr) {
          const ssrContext = { redirectTarget: null }

          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/client/react/ssr')
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  ssrContext,
                  apolloClient,
                }}
              />,
            )
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error)
          }

          if (ssrContext.redirectTarget && ctx?.res) {
            ;(ctx.res as any).redirect(ssrContext.redirectTarget)
            return pageProps
          }
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract()

      return {
        ...pageProps,
        apolloState,
      }
    }
  }

  return WithApollo
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState?: ApolloClientCache, headers = {}) {
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
