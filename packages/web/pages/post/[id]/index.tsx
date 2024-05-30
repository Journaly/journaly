import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'

import Post from '@/components/Dashboard/Post'
import LoadingWrapper from '@/components/LoadingWrapper'
import DashboardLayout from '@/components/Layouts/DashboardLayout'
import { PostPageDocument, PostStatus, UiLanguage, usePostPageQuery } from '@/generated/graphql'
import PostAuthorCard from '@/components/Dashboard/Post/PostAuthorCard'
import PostComments from '@/components/Dashboard/Post/PostComments'
import useUILanguage, { langCodeToUILangMap } from '@/hooks/useUILanguage'
import theme from '@/theme'
import PrivateShareLink from '@/components/PrivateShareLink'
import { journalyMiddleware } from '@/lib/journalyMiddleware'
import i18nConfig from '@/config/i18n'

const PostPage: NextPage = () => {
  const idStr = useRouter().query.id as string
  const id = parseInt(idStr, 10)
  const uiLanguage = useUILanguage()
  const { refetch, loading, error, data } = usePostPageQuery({
    variables: { id, uiLanguage },
  })

  const { postById: post, currentUser } = data || {}
  const outdatedThreads = post ? post.threads.filter((post) => post.archived) : []

  return (
    <DashboardLayout pad="aboveMobile">
      <LoadingWrapper loading={loading} error={error}>
        <div className="post-page-wrapper">
          {post && post.postComments && (
            <>
              <Post post={post} currentUser={currentUser} refetch={refetch} />
              {post.status === PostStatus.Private && post.privateShareId && (
                <PrivateShareLink privateShareId={post.privateShareId} />
              )}
              <div className="post-lower-section">
                <PostComments
                  postId={post.id}
                  postAuthorId={post.author.id}
                  comments={post.postComments}
                  outdatedThreads={outdatedThreads}
                  currentUser={currentUser || null}
                  onUpdateComment={refetch}
                  onDeleteComment={refetch}
                />
                <PostAuthorCard author={post.author} />
              </div>
            </>
          )}
          <style jsx>{`
            .post-page-wrapper {
              max-width: 1200px;
              margin: 0 auto;
            }

            .post-lower-section {
              display: flex;
              flex-direction: column-reverse;
              justify-content: space-between;
            }

            @media (min-width: ${theme.breakpoints.XS}) {
              .post-lower-section {
                flex-direction: row;
              }
            }
          `}</style>
        </div>
      </LoadingWrapper>
    </DashboardLayout>
  )
}

const getUiLanguage = (ctx: NextPageContext): UiLanguage => {
  let langCode
  if (ctx.req) {
    const i18n = ctx.req.i18n as any
    if (!i18n) {
      langCode = 'en'
    } else {
      const { allLanguages, defaultLanguage, fallbackLng } = i18n.options
      const fallback = fallbackLng || defaultLanguage

      if (!i18n.languages) {
        langCode = typeof fallback === 'string' ? fallback : null
      } else {
        langCode = i18n.languages.find((lang: string) => allLanguages.includes(lang)) || fallback
      }
    }
  } else {
    langCode = i18nConfig.i18n.language
  }

  return langCodeToUILangMap[langCode] || UiLanguage.English
}

PostPage.getInitialProps = async (ctx) => {
  const props = await journalyMiddleware(ctx, async (apolloClient) => {
    const idStr = ctx.query.id as string
    const id = parseInt(idStr, 10)

    // const uiLanguage = useUILanguage()

    // const { i18n: { language } } = React.useContext(I18nContext)

    // return langCodeToUILangMap[language] || UILanguage.English

    await apolloClient.query({
      query: PostPageDocument,
      variables: {
        id,
        uiLanguage: getUiLanguage(ctx),
      },
    })
  })

  return {
    ...props,
    namespacesRequired: ['common', 'post', 'comment', 'post-author-card'],
  }
}

export default PostPage
