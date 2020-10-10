import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { withApollo } from '../../lib/apollo'

import DashboardLayout from '../../components/Layouts/DashboardLayout'
import PostEditor, {
  InputPostData,
  OutputPostData,
  validatePostData,
} from '../../components/PostEditor'
import theme from '../../theme'
import Button, { ButtonVariant } from '../../elements/Button'
import {
  useNewPostQuery,
  useCreatePostMutation,
  PostStatus as PostStatusType,
} from '../../generated/graphql'
import AuthGate from '../../components/AuthGate'
import { useTranslation } from '../../config/i18n'
import useUILanguage from '../../hooks/useUILanguage'

const initialData: InputPostData = {
  title: '',
  languageId: -1,
  topicIds: [],
  image: null,
  body: [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ],
  timestamp: 0,
}

const NewPostPage: NextPage = () => {
  const uiLanguage = useUILanguage()
  const { data: { currentUser, topics } = {} } = useNewPostQuery({
    variables: { uiLanguage },
  })
  const dataRef = React.useRef<OutputPostData>()
  const router = useRouter()
  const { t } = useTranslation('post')
  const [createPost] = useCreatePostMutation()
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const createNewPost = async (status: PostStatusType) => {
    if (!(createPost && dataRef.current)) {
      return
    }

    const [valid, message] = validatePostData(dataRef.current, t)
    if (!valid) {
      setErrorMessage(message)
      return
    }

    const { title, languageId, topicIds, image, body, clear } = dataRef.current
    const images = image ? [image] : []

    const createPostResponse = await createPost({
      variables: { title, body, status, languageId, topicIds, images },
    })

    if (!createPostResponse?.data?.createPost) {
      console.error('Got empty response when attempting to create post.')
      return
    }

    clear()
    router.push({ pathname: `/post/${createPostResponse.data.createPost.id}` })
  }

  return (
    <AuthGate>
      <DashboardLayout>
        <form id="new-post">
          <h1>Let's write a post</h1>

          {currentUser && (
            <PostEditor
              currentUser={currentUser}
              topics={topics || []}
              autosaveKey="new-post"
              dataRef={dataRef}
              initialData={initialData}
            />
          )}

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
              {t('publishCTA')}
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
              {t('saveDraftCTA')}
            </Button>
          </div>
          {errorMessage && <span className="error-message">{errorMessage}</span>}
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

            :global(.post-header .cancel-image-icon:hover) {
              cursor: pointer;
            }

            .error-message {
              ${theme.typography.error}
              text-align: center;
            }
          `}</style>
        </form>
      </DashboardLayout>
    </AuthGate>
  )
}

NewPostPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'post'],
})

export default withApollo(NewPostPage)
