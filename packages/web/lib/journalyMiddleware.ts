import { ApolloClient } from '@apollo/client'
import { GetServerSidePropsContext } from 'next'
import { initApolloClient } from './apollo'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// TODO update '@/nexus/' alias to '@/resolvers/'
import pick from '@/nexus/utils/pickLanguage'
import { langCodeToUILangMap } from '@/hooks/useUILanguage'

const supportedLanguages = Object.keys(langCodeToUILangMap).map((lang) => lang.replaceAll('_', '-'))

const detectLanguage = (req: GetServerSidePropsContext['req']) => {
  const acceptStr = req.cookies['j-lang'] || req.headers['accept-language'] || 'en'

  const lang = pick(supportedLanguages, acceptStr) || 'en'
  return lang.replaceAll('-', '_')
}

// TOOD: Add documentation
export const journalyMiddleware = async (
  ctx: GetServerSidePropsContext,
  namespacesRequired: string[],
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
    ...(await serverSideTranslations(detectLanguage(ctx.req), namespacesRequired)),
  }
}
