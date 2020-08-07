import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Editor, Node } from 'slate'
import { withApollo } from '../../lib/apollo'

import DashboardLayout from '../../components/Layouts/DashboardLayout'
import PostEditor from '../../components/PostEditor'
import theme from '../../theme'
import Button, { ButtonVariant } from '../../elements/Button'
import {
  useCurrentUserQuery,
  useCreatePostMutation,
  PostStatus as PostStatusType,
  ImageInput,
  ImageRole,
} from '../../generated/graphql'
import AuthGate from '../../components/AuthGate'
import useAutosavedState from '../../hooks/useAutosavedState'
import PostHeader from '../../components/PostHeader'

const initialData = {
  title: '',
  languageId: '',
  image: null,
  body: [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ],
  clear: () => null
}

interface HTMLInputEvent extends React.FormEvent {
  target: HTMLInputElement & EventTarget
}

const NewPostPage: NextPage = () => {
  const { data: { currentUser } = {} } = useCurrentUserQuery()
  const dataRef = React.useRef<PostData>()
  const router = useRouter()

  const [createPost] = useCreatePostMutation()

  const createNewPost = async (status: PostStatusType) => {
    if (!(createPost && dataRef.current)) {
      return
    }

    const { title, languageId, image, body, clear } = dataRef.current
    const images = image ? [image] : []

    const createPostResponse = await createPost({
      variables: { title, body, status, languageId, images },
    })

    clear()
    router.push({ pathname: `/post/${createPostResponse.data.createPost.id}` })
  }

  return (
    <AuthGate>
      <DashboardLayout>
        <form id="new-post">
          <h1>Let's write a post</h1>

          <PostEditor
            currentUser={currentUser}
            autosaveKey="new-post"
            dataRef={dataRef}
            initialData={initialData}
          />

          <div className="button-container">
            <Button
              type="submit"
              variant={ButtonVariant.Primary}
              data-test="post-submit"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                createNewPost(PostStatusType.Published)
              }}
            >
              Publish!
            </Button>
            <Button
              type="submit"
              variant={ButtonVariant.Secondary}
              data-test="post-draft"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                createNewPost(PostStatusType.Draft)
              }}
            >
              Save Draft
            </Button>
          </div>
          <style jsx>{`
            display: flex;
            flex-direction: column;

            h1 {
              margin: 50px auto;
              text-align: center;
              ${theme.typography.headingXL};
            }

            .button-container {
              display: flex;
              flex-direction: row;
              margin: 0 auto;
              width: 200px;
              justify-content: space-between;
            }

            #new-post {
              display: flex;
              flex-direction: column;
              background-color: white;
              padding: 25px;
              box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
            }
            .editor-padding {
              padding: 25px 0;
            }

            .preview-image {
              flex: 0;
              align-self: center;
            }

            .header-preview-container {
              display: grid;
              grid-auto-rows: 350px 1fr;
              margin-top: 24px;
            }

            .image-upload-input {
              display: none;
            }

            .header-preview-options {
              display: flex;
              flex-direction: row;
              align-items: center;
            }

            :global(.post-header .header-preview-options) {
              position: absolute;
              top: 10px;
              right: 10px;
            }

            :global(.post-header .image-upload-btn) {
              margin-right: 5px;
            }

            label {
              margin-top: 10px;
            }

            .title-input {
              margin-top: 0;
            }

            :global(.post-header .cancel-image-icon:hover) {
              cursor: pointer;
            }
          `}</style>
        </form>
      </DashboardLayout>
    </AuthGate>
  )
}

export default withApollo(NewPostPage)
