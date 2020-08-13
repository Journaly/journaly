import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { withApollo } from '../../../lib/apollo'
import Post from '../../../components/Dashboard/Post'
import LoadingWrapper from '../../../components/LoadingWrapper'
import DashboardLayout from '../../../components/Layouts/DashboardLayout'
import { useCurrentUserQuery, usePostByIdQuery } from '../../../generated/graphql'
import PostAuthorCard from '../../../components/Dashboard/Post/PostAuthorCard'
import PostComments from '../../../components/Dashboard/Post/PostComments'
import theme from '../../../theme'

const PostPage: NextPage = () => {
  const idStr = useRouter().query.id as string
  const id = parseInt(idStr, 10)
  const { refetch, loading: postLoading, error: postError, data: postData } = usePostByIdQuery({
    variables: { id },
  })
  const { loading: userLoading, error: userError, data: userData } = useCurrentUserQuery()
  const post = postData?.postById
  const postComments = post?.postComments
  const hasPostData = post && postComments.length >= 0

  return (
    <LoadingWrapper loading={postLoading || userLoading} error={postError || userError}>
      <DashboardLayout>
        <div className="post-page-wrapper">
          {hasPostData && (
            <>
              <Post post={post} currentUser={userData?.currentUser} refetch={refetch} />
              <div className="post-lower-section">
                <PostComments
                  comments={postComments}
                  currentUser={userData?.currentUser || null}
                  onNewPostComment={refetch}
                  onUpdatePostComment={refetch}
                />
                <PostAuthorCard author={postData?.postById?.author} />
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
      </DashboardLayout>
    </LoadingWrapper>
  )
}

PostPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'post'],
})

export default withApollo(PostPage)
