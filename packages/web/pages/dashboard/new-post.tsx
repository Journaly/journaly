import React, { useRef, useState, useCallback } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { withApollo } from '@/lib/apollo'
import { Node, ImageElement } from 'slate'
import cloneDeep from 'lodash/cloneDeep'

import DashboardLayout from '@/components/Layouts/DashboardLayout'
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
  PostsQuery,
  PostsQueryVariables,
  PostsDocument,
  useInitiateInlinePostImageUploadMutation,
} from '@/generated/graphql'
import AuthGate from '@/components/AuthGate'
import { useTranslation } from '@/config/i18n'
import useUILanguage from '@/hooks/useUILanguage'
import {
  uploadFile,
  blobifyDataUrl,
} from '@/utils/images'
import {
  isImageNode,
  ImageNode,
} from '@/utils/slate'

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

const extractImages = (body: Node[]): ImageElement[] => {
  const images: ImageNode[] = []

  const walk = (nodes: Node[]) => {
    for (const node of nodes) {
      if (isImageNode(node)) {
        images.push(node)
      } else if ('children' in node) {
        walk(node.children)
      }
    }
  }

  walk(body)
  return images
}


const useUploadInlineImages = () => {
  const [initiateInlinePostImageUpload] = useInitiateInlinePostImageUploadMutation()

  const getUploadData = async () =>  {
    const resp = await initiateInlinePostImageUpload()

    return resp?.data?.initiateInlinePostImageUpload
  }

  return useCallback(async (body: Node[]) =>  {
    const clonedBody = cloneDeep(body)
    const images = extractImages(clonedBody)
    for (const image of images) {
      if (image.uploaded)
        continue

      const blob = await blobifyDataUrl(image.url)
      const file =  new File([blob], 'upload')
      const result = await uploadFile(getUploadData, file)
      if (result.failed) {
        throw new Error('Error uploading inline post image.')
      }

      image.url = result.value.finalUrl
      image.uploaded = true
    }

    return clonedBody
  },
  [initiateInlinePostImageUpload])
}


const NewPostPage: NextPage = () => {
  const uiLanguage = useUILanguage()
  const { data: { currentUser, topics } = {} } = useNewPostQuery({
    variables: { uiLanguage },
  })
  const dataRef = useRef<OutputPostData>()
  const router = useRouter()
  const { t } = useTranslation('post')
  const uploadInlineImages = useUploadInlineImages()
  const [createPost, createPostOptions] = useCreatePostMutation({
    onCompleted: (mutationResult) => {
      dataRef.current?.clear()
      router.push({ pathname: `/post/${mutationResult.createPost.id}` })
    },
    onError: (error) => {
      toast.error(error.message)
    },
    update: (cache, mutationResult) => {
      if (currentUser?.id && mutationResult.data?.createPost) {
        const data = cache.readQuery<PostsQuery, PostsQueryVariables>({
          query: PostsDocument,
          variables: {
            status: mutationResult.data.createPost.status,
            authorId: currentUser.id,
          },
        })

        if (data?.posts) {
          data.posts.push(mutationResult.data.createPost)
          cache.writeQuery({ query: PostsDocument, data: data.posts })
        }
      }
    },
  })
  const [errorMessage, setErrorMessage] = useState('')

  const createNewPost = async (status: PostStatusType) => {
    if (!(createPost && dataRef.current)) {
      return
    }

    const [valid, message] = validatePostData(dataRef.current, t)
    if (!valid) {
      setErrorMessage(message)
      return
    }

    const { title, languageId, topicIds, image, body } = dataRef.current
    const images = image ? [image] : []

    const modifiedBody = await uploadInlineImages(body)

    createPost({
      variables: {
        title,
        status,
        languageId,
        topicIds,
        images,
        body: modifiedBody
      }
    })
  }

  return (
    <AuthGate>
      <DashboardLayout>
        <form id="new-post">
          <h1>{t('header')}</h1>

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
              loading={createPostOptions.loading}
              onClick={(e) => {
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
              disabled={createPostOptions.loading}
              onClick={(e) => {
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
              width: 250px;
              justify-content: space-around;
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
