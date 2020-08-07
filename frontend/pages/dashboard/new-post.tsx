import React, { useState, useRef } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Editor, Node } from 'slate'
import { withApollo } from '../../lib/apollo'

import DashboardLayout from '../../components/Layouts/DashboardLayout'
import JournalyEditor from '../../components/JournalyEditor'
import LanguageSelect from '../../components/LanguageSelect'
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
import XIcon from '../../components/Icons/XIcon'

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

interface HTMLInputEvent extends React.FormEvent {
  target: HTMLInputElement & EventTarget
}

const NewPostPage: NextPage = () => {
  const { data: { currentUser } = {} } = useCurrentUserQuery()
  const { languagesLearning = [], languagesNative = [] } = currentUser || {}
  const slateRef = useRef<Editor>(null)

  const router = useRouter()
  const [langId, setLangId] = useState<number>(-1)
  const [title, setTitle, resetTitle] = useAutosavedState<string>('', {
    key: 'new-post:title',
    debounceTime: 1000,
  })
  const [body, setBody, resetBody] = useAutosavedState<Node[]>(initialValue, {
    key: 'new-post:body',
    debounceTime: 1000,
  })
  const [image, setImage, resetImage] = useAutosavedState<ImageInput>({
    smallSize: '/images/samples/sample-post-img.jpg',
    largeSize: '/images/samples/sample-post-img.jpg',
    imageRole: ImageRole.Headline,
  })

  const [uploadingImage, setUploadingImage] = useState(false)

  const uploadFile = async (e: HTMLInputEvent) => {
    setUploadingImage(true)
    const files = e.target.files
    const data = new FormData()

    if (files) {
      data.append('file', files[0])
      data.append('upload_preset', 'journaly')
    }

    const response = await fetch('https://api.cloudinary.com/v1_1/journaly/image/upload', {
      method: 'POST',
      body: data,
    })

    const file = await response.json()
    setImage({
      smallSize: file.secure_url,
      largeSize: file.eager[0].secure_url,
      imageRole: ImageRole.Headline,
    })
    setUploadingImage(false)
  }

  const fileInput = useRef<HTMLInputElement>(null)

  const [createPost] = useCreatePostMutation({
    onCompleted: ({ createPost }) => {
      if (!(createPost && slateRef.current)) {
        return
      }

      // Must clear any active selection before clearing content or the editor
      // will violently explode. See https://github.com/ianstormtaylor/slate/issues/3477
      slateRef.current.selection = {
        anchor: { path: [0,0], offset:0 },
        focus: { path: [0,0], offset: 0 },
      }

      resetTitle()
      resetBody()
      resetImage()
      router.push({ pathname: `/post/${createPost.id}` })
    },
  })

  const userLanguages = languagesLearning
    .map((x) => x.language)
    .concat(languagesNative.map((x) => x.language))

  const createNewPost = (status: PostStatusType) => {
    createPost({
      variables: { title, body, status, languageId: langId, images: [image] },
    })
  }

  return (
    <AuthGate>
      <DashboardLayout>
        <form id="new-post">
          <h1>Let's write a post</h1>

          <label htmlFor="post-title" className="title-input">
            Title
          </label>
          <input
            className="j-field"
            id="post-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="title"
            placeholder="The Greatest Story Never Told..."
            autoComplete="off"
          />

          <input
            className="j-field image-upload-input"
            id="post-image"
            onChange={uploadFile}
            type="file"
            name="post-image"
            placeholder="The headline image for your post"
            ref={fileInput}
          />

          <label htmlFor="post-language">Language</label>
          <LanguageSelect
            id="language"
            languages={userLanguages}
            value={langId}
            onChange={setLangId}
          />

          <div className="header-preview-container">
            <PostHeader
              postTitle={title}
              postStatus={PostStatusType.Published}
              publishDate={new Date().toISOString()}
              authorName={currentUser?.name || 'anonymous'}
              postImage={image.largeSize || '/images/samples/sample-post-img.jpg'}
            >
              <div className="header-preview-options">
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    if (fileInput && fileInput.current) {
                      fileInput.current.click()
                    }
                  }}
                  className="image-upload-btn"
                  loading={uploadingImage}
                >
                  Upload Image
                </Button>
                <XIcon
                  className="cancel-image-icon"
                  color={theme.colors.white}
                  onClick={() => resetImage()}
                />
              </div>
            </PostHeader>
          </div>

          <div className="editor-padding">
            <JournalyEditor value={body} setValue={setBody} slateRef={slateRef} />
          </div>

          <div className="button-container">
            <Button
              type="submit"
              disabled={!title || langId === -1}
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
              disabled={!title || langId === -1}
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
