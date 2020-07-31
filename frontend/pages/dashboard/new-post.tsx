import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Node } from 'slate'
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
} from '../../generated/graphql'
import AuthGate from '../../components/AuthGate'
import useAutosavedState from '../../hooks/useAutosavedState'

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

type Image = {
  smallSize: string
  largeSize: string
  imageRole: string
}

interface HTMLInputEvent extends React.FormEvent {
  target: HTMLInputElement & EventTarget
}

const NewPostPage: NextPage = () => {
  const { data: { currentUser } = {} } = useCurrentUserQuery()
  const { languagesLearning = [], languagesNative = [] } = currentUser || {}

  const router = useRouter()
  const [langId, setLangId] = React.useState<number>(-1)
  const [title, setTitle, resetTitle] = useAutosavedState<string>('', {
    key: 'new-post:title',
    debounceTime: 1000,
  })
  const [body, setBody, resetBody] = useAutosavedState<Node[]>(initialValue, {
    key: 'new-post:body',
    debounceTime: 1000,
  })
  const [images, setImages, resetImages] = useAutosavedState<Image[]>([])

  const uploadFile = async (e: HTMLInputEvent) => {
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
    setImages([
      {
        smallSize: file.secure_url,
        largeSize: file.eager[0].secure_url,
        imageRole: 'HEADLINE',
      },
    ])
  }

  const [createPost] = useCreatePostMutation({
    onCompleted: ({ createPost }) => {
      if (!createPost) {
        return
      }

      resetTitle()
      resetBody()
      resetImages()
      router.push({ pathname: `/post/${createPost.id}` })
    },
  })

  const userLanguages = languagesLearning
    .map((x) => x.language)
    .concat(languagesNative.map((x) => x.language))

  const createNewPost = (status: PostStatusType) => {
    createPost({
      variables: { title, body, status, languageId: langId, images },
    })
  }

  return (
    <AuthGate>
      <DashboardLayout>
        <form id="new-post">
          <h1>Let's write a post</h1>

          <label htmlFor="post-title">Title</label>
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

          <label htmlFor="post-image">Post Image</label>
          <input
            className="j-field"
            id="post-image"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="file"
            name="post-image"
            placeholder="The headline image for your post"
          />
          {images.length && <img src={images[0].smallSize} alt="Upload preview" />}

          <label htmlFor="post-language">Language</label>
          <LanguageSelect
            id="language"
            languages={userLanguages}
            value={langId}
            onChange={setLangId}
          />

          <div className="editor-padding">
            <JournalyEditor value={body} setValue={setBody} />
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
          `}</style>
        </form>
      </DashboardLayout>
    </AuthGate>
  )
}

export default withApollo(NewPostPage)
