import React, { useRef, useState, useMemo } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { makeReference } from '@apollo/client'

import { withApollo } from '@/lib/apollo'
import DashboardLayout from '@/components/Layouts/DashboardLayout'
import { navConstants } from '@/components/Dashboard/Nav'
import PostEditor, {
  InputPostData,
  OutputPostData,
  validatePostData,
} from '@/components/PostEditor'
import theme from '@/theme'
import Button, { ButtonVariant } from '@/components/Button'
import {
  useNewPostQuery,
  useCreatePostMutation,
  PostStatus as PostStatusType,
} from '@/generated/graphql'
import AuthGate from '@/components/AuthGate'
import { useTranslation } from '@/config/i18n'
import useUILanguage from '@/hooks/useUILanguage'
import useUploadInlineImages from '@/hooks/useUploadInlineImages'

type NewPostPageProps = {
  defaultImage: {
    smallSize: string
    largeSize: string
  }
}

const defaultImages = [
  {
    smallSize:
      'https://d2ieewwzq5w1x7.cloudfront.net/post-image/f24ad1f4-c934-4e5b-b183-19358856e2ce-small',
    largeSize:
      'https://d2ieewwzq5w1x7.cloudfront.net/post-image/f24ad1f4-c934-4e5b-b183-19358856e2ce-large',
  },
  {
    smallSize:
      'https://d2ieewwzq5w1x7.cloudfront.net/post-image/a8949a84-43b3-4dc1-851c-6f089fab32b3-small',
    largeSize:
      'https://d2ieewwzq5w1x7.cloudfront.net/post-image/a8949a84-43b3-4dc1-851c-6f089fab32b3-large',
  },
  {
    smallSize:
      'https://d2ieewwzq5w1x7.cloudfront.net/post-image/b78e06ad-2f8c-42ac-80d7-12315831f1b2-small',
    largeSize:
      'https://d2ieewwzq5w1x7.cloudfront.net/post-image/b78e06ad-2f8c-42ac-80d7-12315831f1b2-large',
  },
  {
    smallSize:
      'https://d2ieewwzq5w1x7.cloudfront.net/post-image/149c24d6-99de-4dc7-972e-cab92ff2d358-small',
    largeSize:
      'https://d2ieewwzq5w1x7.cloudfront.net/post-image/149c24d6-99de-4dc7-972e-cab92ff2d358-large',
  },
  {
    smallSize:
      'https://d2ieewwzq5w1x7.cloudfront.net/post-image/77cc91d6-7b9c-4c02-9233-1bea2dc1f674-small',
    largeSize:
      'https://d2ieewwzq5w1x7.cloudfront.net/post-image/77cc91d6-7b9c-4c02-9233-1bea2dc1f674-large',
  },
]

const selectDefaultImage = () => {
  const index = Math.floor(Math.random() * defaultImages.length)
  return defaultImages[index]
}

const NewPostPage: NextPage<NewPostPageProps> = ({ defaultImage }) => {
  const initialData: InputPostData = useMemo(
    () => ({
      title: '',
      languageId: -1,
      topicIds: [],
      headlineImage: defaultImage,
      body: [
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
      ],
      timestamp: 0,
    }),
    [defaultImage],
  )

  const uiLanguage = useUILanguage()
  const { data: { currentUser, topics } = {} } = useNewPostQuery({
    variables: { uiLanguage },
  })
  const dataRef = useRef<OutputPostData>()
  const router = useRouter()
  const { t } = useTranslation('post')
  const uploadInlineImages = useUploadInlineImages()
  const [saving, setSaving] = React.useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState('')

  // TODO: Address properly handling invalidating the cache on My Feed,
  // Profile, and My Posts page immediately after publishing a new post

  const [createPost] = useCreatePostMutation({
    onCompleted: (mutationResult) => {
      dataRef.current?.clear()
      router.push({ pathname: `/post/${mutationResult.createPost.id}` })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const createNewPost = React.useCallback(
    async (status: PostStatusType) => {
      if (!dataRef.current) {
        return
      }
      setSaving(true)

      const [valid, message] = validatePostData(dataRef.current, t)
      if (!valid) {
        setSaving(false)
        setErrorMessage(message)
        return
      }

      const { title, languageId, topicIds, headlineImage, body } = dataRef.current

      try {
        const modifiedBody = await uploadInlineImages(body)
        createPost({
          variables: {
            title,
            status,
            languageId,
            topicIds,
            headlineImage,
            body: modifiedBody,
          },
          update(cache, { data }) {
            if (data?.createPost && data.createPost.status === PostStatusType.Published) {
              cache.modify({
                id: cache.identify(makeReference('ROOT_QUERY')),
                fields: {
                  posts: () => {
                    // This simply invalidates the cache for the `posts` query
                    return undefined
                  },
                },
              })
            }
          },
        })
      } catch (err) {
        console.error(err)
        setErrorMessage(t('postSaveError'))
        return
      } finally {
        setSaving(false)
      }
    },
    [dataRef, uploadInlineImages, setSaving, createPost],
  )

  const handlePublishClick = React.useCallback(
    (e) => {
      e.preventDefault()
      if (currentUser?.emailAddressVerified) {
        createNewPost(PostStatusType.Published)
      }
      if (!currentUser?.emailAddressVerified) {
        setErrorMessage(t('emailVerificationWarning'))
      }
    },
    [createNewPost],
  )

  const handleSharePrivatelyClick = React.useCallback(
    (e) => {
      e.preventDefault()
      if (currentUser?.emailAddressVerified) {
        createNewPost(PostStatusType.Private)
      }
      if (!currentUser?.emailAddressVerified) {
        setErrorMessage(t('emailVerificationWarning'))
      }
    },
    [createNewPost],
  )

  const handleDraftClick = React.useCallback(
    (e) => {
      e.preventDefault()
      createNewPost(PostStatusType.Draft)
    },
    [createNewPost],
  )

  return (
    <AuthGate>
      <DashboardLayout pad="aboveMobile">
        <form id="new-post">
          <h1>{t('header')}</h1>

          {currentUser && (
            <PostEditor
              disabled={saving}
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
              data-testid="post-submit"
              loading={saving}
              onClick={handlePublishClick}
            >
              {t('publishCTA')}
            </Button>
            <Button
              type="submit"
              variant={ButtonVariant.Secondary}
              data-testid="post-share-privately"
              loading={saving}
              onClick={handleSharePrivatelyClick}
            >
              {t('sharePrivatelyCTA')}
            </Button>
            <Button
              type="submit"
              variant={ButtonVariant.Secondary}
              data-testid="post-draft"
              loading={saving}
              onClick={handleDraftClick}
            >
              {t('saveDraftCTA')}
            </Button>
          </div>

          {errorMessage && (
            <span className="error-message" data-testid="new-post-error">
              {errorMessage}
            </span>
          )}

          <style jsx>{`
            display: flex;
            flex-direction: column;
            margin: 50px 25px;

            @media (${navConstants.mobileNavOnly}) {
              margin: 0;
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
              gap: 10px;
            }

            @media (max-width: ${theme.breakpoints.XS}) {
              .button-container {
                width: 100%;
              }
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
              margin-top: 20px;
            }
          `}</style>
        </form>
      </DashboardLayout>
    </AuthGate>
  )
}

NewPostPage.getInitialProps = async () => ({
  defaultImage: selectDefaultImage(),
  namespacesRequired: ['common', 'post'],
})

export default withApollo(NewPostPage)
