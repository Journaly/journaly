import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Node } from 'slate'
import { withApollo } from '../../../lib/apollo'
import { useTranslation } from '../../../config/i18n'

import DashboardLayout from '../../../components/Layouts/DashboardLayout'
import PostEditor, { validatePostData, PostData } from '../../../components/PostEditor'
import theme from '../../../theme'
import Button, { ButtonVariant } from '../../../elements/Button'
import {
  ImageRole,
  useEditPostQuery,
  useUpdatePostMutation,
} from '../../../generated/graphql'
import AuthGate from '../../../components/AuthGate'
import useUILanguage from '../../../hooks/useUILanguage'

const EditPostPage: NextPage = () => {
  const router = useRouter()
  const idStr = router.query.id as string
  const id = parseInt(idStr, 10)
  const { t } = useTranslation('post')
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const uiLanguage = useUILanguage()

  const { data: { currentUser, topics, postById } = {} } = useEditPostQuery({
    variables: { uiLanguage, id }
  })
  const dataRef = React.useRef<PostData>()
  const [initialData, setInitialData] = React.useState<PostData | null>(null)
  const [updatePost] = useUpdatePostMutation()

  React.useEffect(() => {
    if (postById) {
      const {
        title,
        bodySrc,
        language: { id: languageId },
        images,
        postTopics,
      } = postById

      const image = images.find(
        ({ imageRole }) => imageRole === ImageRole.Headline
      ) || null

      setInitialData({
        body: JSON.parse(bodySrc) as Node[],
        topicIds: postTopics.map(x => x.topic.id),
        clear: () => null,
        title,
        languageId,
        image,
      })
    }
  }, [postById])

  const savePost = async () => {
    if (!dataRef.current) {
      return
    }

    const [valid, message] = validatePostData(dataRef.current, t)
    if (!valid) {
      setErrorMessage(message)
      return
    }

    const { title, languageId, topicIds, image, body, clear } = dataRef.current
    const images = image ? [image] : []

    const { data } = await updatePost({
      variables: {
        postId: id,
        title,
        languageId,
        topicIds,
        body,
        images,
      },
    })

    if (!data || !data.updatePost) {
      return
    }

    clear()
    router.push({ pathname: `/post/${data.updatePost.id}` })
  }

  return (
    <AuthGate>
      <DashboardLayout>
        <form id="edit-post">
          <h1>{t('editPost')}</h1>

          { initialData && currentUser && (
            <PostEditor
              currentUser={currentUser}
              topics={topics || []}
              autosaveKey={`edit-post:${id}`}
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
                savePost()
              }}
            >
              {t('save')}
            </Button>
          </div>
          { errorMessage && (
            <span className="error-message">
              {errorMessage}
            </span>
          )}
          <style jsx>{`
            #edit-post {
              display: flex;
              flex-direction: column;
              background-color: white;
              padding: 25px;
              box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
            }

            h1 {
              margin: 50px auto;
              text-align: center;
              ${theme.typography.headingXL};
            }

            .button-container {
              display: flex;
              flex-direction: row;
              margin: 0 auto;
              justify-content: space-between;
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

EditPostPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'post'],
})

export default withApollo(EditPostPage)
