import React from 'react'
import { Editor, Node } from 'slate'

import FileInput from '../FileInput'
import PostHeader from '../PostHeader'
import JournalyEditor from '../JournalyEditor'
import XIcon from '../Icons/XIcon'
import Select from '../../elements/Select'
import { ButtonVariant } from '../../elements/Button'
import theme from '../../theme'
import useImageUpload from '../../hooks/useImageUpload'
import useAutosavedState from '../../hooks/useAutosavedState'
import {
  UserWithLanguagesFragmentFragment as UserWithLanguagesType,
  PostStatus as PostStatusType,
  ImageInput,
  ImageRole,
} from '../../generated/graphql'
import { languageNameWithDialect } from '../../utils/languages'

type PostData = {
  title: string
  languageId: number
  image?: ImageInput | null
  body: Node[]
  clear: () => void
}

type PostEditorProps = {
  currentUser: UserWithLanguagesType
  autosaveKey: string
  dataRef: React.MutableRefObject<PostData | undefined>
  initialData: PostData
}

type validatePostDataSignature = (data: PostData, t: (arg0: string) => string) => [boolean, string]

const validatePostData: validatePostDataSignature = (data, t) => {
  if (!data.title.length) {
    return [false, t('emptyTitleError')]
  }

  if (data.languageId === -1) {
    return [false, t('noLanguageError')]
  }

  return [true, '']
}

const DEFAULT_IMAGE_URL = '/images/samples/sample-post-img.jpg'

const PostEditor: React.FC<PostEditorProps> = ({
  currentUser,
  autosaveKey,
  initialData,
  dataRef,
}) => {
  const slateRef = React.useRef<Editor>(null)

  const [langId, setLangId, resetLangId] = useAutosavedState<number>(initialData.languageId, {
    key: `${autosaveKey}:langId`,
    debounceTime: 1000,
  })
  const [title, setTitle, resetTitle] = useAutosavedState<string>(initialData.title, {
    key: `${autosaveKey}:title`,
    debounceTime: 1000,
  })
  const [body, setBody, resetBody] = useAutosavedState<Node[]>(initialData.body, {
    key: `${autosaveKey}:body`,
    debounceTime: 1000,
  })

  const { languagesLearning = [], languagesNative = [] } = currentUser || {}
  const userLanguages = [...languagesLearning, ...languagesNative].map(({ language }) => {
    const value = language.id.toString()
    const displayName = languageNameWithDialect(language)

    return { value, displayName }
  })

  const [image, uploadingImage, onFileInputChange, resetImage] = useImageUpload()
  const postImage = image?.secure_url || initialData.image?.largeSize || DEFAULT_IMAGE_URL

  React.useEffect(() => {
    const clear = () => {
      if (!slateRef.current) {
        return
      }

      // Must clear any active selection before clearing content or the editor
      // will violently explode. See https://github.com/ianstormtaylor/slate/issues/3477
      slateRef.current.selection = {
        anchor: { path: [0, 0], offset: 0 },
        focus: { path: [0, 0], offset: 0 },
      }

      resetTitle()
      resetBody()
      resetImage()
      resetLangId()
    }

    const returnImage = !image
      ? null
      : {
          largeSize: image.secure_url,
          smallSize: image.eager[0].secure_url,
          imageRole: ImageRole.Headline,
        }

    dataRef.current = {
      title,
      body,
      clear,
      image: returnImage,
      languageId: langId,
    }
  }, [title, langId, image, body])

  return (
    <div className="post-editor">
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
        dir="auto"
      />

      <label htmlFor="post-language">Language</label>
      <Select
        id="language"
        options={userLanguages}
        value={langId ? langId.toString() : ''}
        onChange={(value) => setLangId(parseInt(value, 10))}
        placeholder="Select language"
      />

      <div className="header-preview-container">
        <PostHeader
          postTitle={title}
          postStatus={PostStatusType.Published}
          publishDate={new Date().toISOString()}
          authorName={currentUser?.name || 'anonymous'}
          postImage={postImage}
        >
          <div className="header-preview-options">
            <FileInput
              variant={ButtonVariant.Primary}
              className="image-upload-btn"
              loading={uploadingImage}
              onChange={onFileInputChange}
            >
              Upload Image
            </FileInput>
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

      <style jsx>{`
        .post-editor {
          display: flex;
          flex-direction: column;
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
    </div>
  )
}

export type { PostData }
export { validatePostData }
export default PostEditor
