import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Post from '@/components/Dashboard/Post'
import LoadingWrapper from '@/components/LoadingWrapper'
import DashboardLayout from '@/components/Layouts/DashboardLayout'
import { PostPageDocument, PostStatus, usePostPageQuery } from '@/generated/graphql'
import PostAuthorCard from '@/components/Dashboard/Post/PostAuthorCard'
import PostComments from '@/components/Dashboard/Post/PostComments'
import useUILanguage from '@/hooks/useUILanguage'
import theme from '@/theme'
import PrivateShareLink from '@/components/PrivateShareLink'
import { journalyMiddleware } from '@/lib/journalyMiddleware'
import { getUiLanguage } from '@/utils/getUiLanguage'

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
