import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Descendant } from 'slate'
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
import { useEditPostQuery, useUpdatePostMutation } from '@/generated/graphql'
import AuthGate from '@/components/AuthGate'
import ConfirmationModal from '@/components/Modals/ConfirmationModal'
import useUILanguage from '@/hooks/useUILanguage'
import useAuthCheck from '@/hooks/useAuthCheck'
import useUploadInlineImages from '@/hooks/useUploadInlineImages'

const EditPostPage: NextPage = () => {
  const router = useRouter()
  const idStr = router.query.id as string
  const id = parseInt(idStr, 10)
  const { t } = useTranslation('post')
  const [saving, setSaving] = React.useState<boolean>(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [displayCancelModal, setDisplayCancelModal] = React.useState<boolean>(false)
  const uiLanguage = useUILanguage()

  const { data: { currentUser, topics, postById } = {} } = useEditPostQuery({
    variables: { uiLanguage, id },
  })
  const dataRef = React.useRef<OutputPostData>()
  const [initialData, setInitialData] = React.useState<InputPostData | null>(null)
  const [updatePost] = useUpdatePostMutation()
  const uploadInlineImages = useUploadInlineImages()

  useAuthCheck(() => {
    return currentUser!.id === postById!.author.id
  }, !!(currentUser && postById))

  const handleCancelConfirm = () => {
    if (!dataRef.current) {
      return
    }

    const { clear, resetIntialPostValues } = dataRef.current

    clear()
    resetIntialPostValues()
    setDisplayCancelModal(false)
  }

  React.useEffect(() => {
    if (postById) {
      const {
        title,
        bodySrc,
        language: { id: languageId },
        headlineImage,
        postTopics,
        updatedAt,
      } = postById

      setInitialData({
        body: JSON.parse(bodySrc) as Descendant[],
        topicIds: postTopics.map((x) => x.topic.id),
        title,
        languageId,
        headlineImage,
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

    const { title, languageId, topicIds, headlineImage, body, clear } = dataRef.current

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
          headlineImage,
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
      <DashboardLayout pad="aboveMobile">
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
            <Button
              type="button"
              variant={ButtonVariant.Secondary}
              data-test="post-cancel"
              onClick={(): void => {
                setDisplayCancelModal(true)
              }}
            >
              {t('cancel')}
            </Button>
          </div>
          {errorMessage && <span className="error-message">{errorMessage}</span>}
          <ConfirmationModal
            onConfirm={handleCancelConfirm}
            onCancel={(): void => {
              setDisplayCancelModal(false)
            }}
            title={t('cancelModal.title')}
            body={t('cancelModal.body')}
            show={displayCancelModal}
          />
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
