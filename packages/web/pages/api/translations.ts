import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const handler = async (req: any, res: any) => {
  const { locale = 'en', namespacesRequired } = req.query || {}
  res.json(await serverSideTranslations(locale, namespacesRequired?.split(',')))
}

export default handler
