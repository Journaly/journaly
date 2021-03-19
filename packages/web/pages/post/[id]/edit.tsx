import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Node } from 'slate'
import { withApollo } from '@/lib/apollo'
import { useTranslation } from '@/config/i18n'

import DashboardLayout from '@/components/Layouts/DashboardLayout'
import PostEditor, {
  validatePostData,
  InputPostData,
  OutputPostData,
} from '@/components/PostEditor'
import theme from '@/theme'
import Button, { ButtonVariant } from '@/components/Button'
import { ImageRole, useEditPostQuery, useUpdatePostMutation } from '@/generated/graphql'
import AuthGate from '@/components/AuthGate'
import useUILanguage from '@/hooks/useUILanguage'
import useUploadInlineImages from '@/hooks/useUploadInlineImages'

const EditPostPage: NextPage = () => {
  const router = useRouter()
  const idStr = router.query.id as string
  const id = parseInt(idStr, 10)
  const { t } = useTranslation('post')
  const [saving, setSaving] = React.useState<boolean>(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const uiLanguage = useUILanguage()

  const { data: { currentUser, topics, postById } = {} } = useEditPostQuery({
    variables: { uiLanguage, id },
  })
  const dataRef = React.useRef<OutputPostData>()
  const [initialData, setInitialData] = React.useState<InputPostData | null>(null)
  const [updatePost] = useUpdatePostMutation()
  const uploadInlineImages = useUploadInlineImages()

  React.useEffect(() => {
    if (postById) {
      const {
        title,
        bodySrc,
        language: { id: languageId },
        images,
        postTopics,
        updatedAt,
      } = postById

      const image = images.find(({ imageRole }) => imageRole === ImageRole.Headline) || null

      setInitialData({
        body: JSON.parse(bodySrc) as Node[],
        topicIds: postTopics.map((x) => x.topic.id),
        title,
        languageId,
        image,
        timestamp: Date.parse(updatedAt),
      })
    }
  }, [postById])

  const savePost = React.useCallback(async () => {
    if (!dataRef.current) {
      return
    }

    setSaving(true)

    const [valid, message] = validatePostData(dataRef.current, t)
    if (!valid) {
      setErrorMessage(message)
      setSaving(false)
      return
    }

    const { title, languageId, topicIds, image, body, clear } = dataRef.current
    const images = image ? [image] : []

    let postId: number
    try {
      const modifiedBody = await uploadInlineImages(body)

      const { data } = await updatePost({
        variables: {
          postId: id,
          body: modifiedBody,
          title,
          languageId,
          topicIds,
          images,
        },
      })

      if (!data || !data.updatePost) {
        throw new Error('Missing post data after mutation.')
      }

      postId = data.updatePost.id
    } catch (err) {
      console.error(err)
      setErrorMessage(t('postSaveError'))
      setSaving(false)
      return
    }

    clear()
    setSaving(false)
    router.push({ pathname: `/post/${postId}` })
  }, [
    setSaving,
    setErrorMessage,
    dataRef,
    uploadInlineImages,
    updatePost,
    router,
  ])

  const onSaveClick = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    savePost()
  }, [savePost])

  return (
    <AuthGate>
      <DashboardLayout>
        <form id="edit-post">
          <h1>{t('editPost')}</h1>

          {initialData && currentUser && (
            <PostEditor
              disabled={saving}
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
              loading={saving}
              onClick={onSaveClick}
            >
              {t('save')}
            </Button>
          </div>
          {errorMessage && <span className="error-message">{errorMessage}</span>}
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
              width: 250px;
              justify-content: space-around;
            }

            @media (max-width: ${theme.breakpoints.XS}) {
              .button-container {
                width: 100%;
              }
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
