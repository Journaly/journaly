import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { withApollo } from '../../../lib/apollo'
import Post from '../../../components/Dashboard/Post'
import LoadingWrapper from '../../../components/LoadingWrapper'
import DashboardLayout from '../../../components/Layouts/DashboardLayout'
import {
  useCurrentUserQuery,
  usePostByIdQuery,
  PostWithTopicsFragmentFragment as PostType,
} from '../../../generated/graphql'
import PostAuthorCard from '../../../components/Dashboard/Post/PostAuthorCard'
import PostComments from '../../../components/Dashboard/Post/PostComments'
import useUILanguage from '../../../hooks/useUILanguage'
import theme from '../../../theme'

const PostPage: NextPage = () => {
  const idStr = useRouter().query.id as string
  const id = parseInt(idStr, 10)
  const uiLanguage = useUILanguage()
  const { refetch, loading: postLoading, error: postError, data: postData } = usePostByIdQuery({
    variables: { id, uiLanguage, },
  })
  const { loading: userLoading, error: userError, data: userData } = useCurrentUserQuery()

  const post: PostType | undefined | null = postData?.postById

  return (
    <LoadingWrapper loading={postLoading || userLoading} error={postError || userError}>
      <DashboardLayout>
        <div className="post-page-wrapper">
          {post && post.postComments && (
            <>
              <Post post={post} currentUser={userData?.currentUser} refetch={refetch} />
              <div className="post-lower-section">
                <PostComments
                  postId={post.id}
                  comments={post.postComments}
                  currentUser={userData?.currentUser || null}
                  onNewComment={refetch}
                  onUpdateComment={refetch}
                  onDeleteComment={refetch}
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
