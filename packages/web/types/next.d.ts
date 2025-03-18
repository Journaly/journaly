import { ApolloClient } from '@apollo/client'
import { ApolloClientCache } from './lib/apollo'
import { IncomingMessage } from 'http'
import { NextI18NextRequest } from 'next-i18next'

declare module 'next' {
  export interface NextPageContext {
    apolloClient?: ApolloClient<ApolloClientCache>
  }
}

declare module 'http' {
  export interface IncomingMessage {
    i18n: NextI18NextRequest['i18n']
  }
}
