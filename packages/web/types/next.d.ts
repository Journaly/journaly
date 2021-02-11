import { ApolloClient } from '@apollo/client'
import { ApolloClientCache } from './lib/apollo'

declare module 'next' {
  export interface NextPageContext {
    apolloClient?: ApolloClient<ApolloClientCache>
  }
}
