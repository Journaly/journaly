import { ApolloClient } from '@apollo/client'
import { GetServerSidePropsContext } from 'next'
import { initApolloClient } from './apollo'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// TODO update '@/nexus/' alias to '@/resolvers/'
import pick from '@/nexus/utils/pickLanguage'
import { langCodeToUILangMap } from '@/hooks/useUILanguage'
import { UiLanguage as UILanguage } from '@/generated/graphql'

const supportedLanguages = Object.keys(langCodeToUILangMap).map((lang) => lang.replaceAll('_', '-'))

const detectLanguage = (req: GetServerSidePropsContext['req']): UILanguage => {
  const acceptStr = req.cookies['j-lang'] || req.headers['accept-language'] || 'en'
  const lang = pick(supportedLanguages, acceptStr) || 'en'
  console.log(lang, 'LAAAAANG!')
  return lang.replaceAll('-', '_')
}

// TOOD: Add documentation
export const journalyMiddleware = async (
  ctx: GetServerSidePropsContext,
  namespacesRequired: string[],
  callback?: (apolloClient: ApolloClient<any>, lang: UILanguage) => Promise<unknown>,
) => {
  const headers: any = {}
  if (typeof window === 'undefined' && ctx.req) {
    // If SSR, copy the request cookies into apollo client so it has the same
    // auth context as the request for the page.
    headers['cookie'] = ctx.req.headers.cookie
  }
  const apolloClient = initApolloClient({}, headers)
  const lang = detectLanguage(ctx.req)
  await callback?.(apolloClient, lang)
  return {
    apolloState: apolloClient.cache.extract(),
    ...(await serverSideTranslations(lang, namespacesRequired)),
  }
}
