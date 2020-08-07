import React from 'react'

import {
  User as UserType
} from '../../generated/graphql'
import useAutosavedState from '../../hooks/useAutosavedState'

type PostData = {
  title: string
  languageId: number
  image: ImageInput
  body: Node[]
}

type PostEditorProps = {
  currentUser: User
  autosaveKey: string
  React.RefObject
}

const PostEditor: React.FC<PostEditorProps> = ({
  currentUser,
  autosaveKey
}) => {
  const slateRef = useRef<Editor>(null)

  const [langId, setLangId] = useState<number>(-1)
  const [title, setTitle, resetTitle] = useAutosavedState<string>('', {
    key: `${autosaveKey}:title`,
    debounceTime: 1000,
  })
  const [body, setBody, resetBody] = useAutosavedState<Node[]>(initialValue, {
    key: `${autosaveKey}:body`,
    debounceTime: 1000,
  })
  const [image, setImage, resetImage] = useAutosavedState<ImageInput>({
    smallSize: '/images/samples/sample-post-img.jpg',
    largeSize: '/images/samples/sample-post-img.jpg',
    imageRole: ImageRole.Headline,
  }, { key: `${autosaveKey}:image` })


  const { languagesLearning = [], languagesNative = [] } = currentUser || {}
  const userLanguages = languagesLearning
    .map((x) => x.language)
    .concat(languagesNative.map((x) => x.language))

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

      <style jsx>{`
        .post-editor {
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
    </div>
  )
}

export default PostEditor
