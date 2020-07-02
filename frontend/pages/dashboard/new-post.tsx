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

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

const NewPostPage: NextPage = () => {
  const { data: { currentUser } = {} } = useCurrentUserQuery()
  const { languagesLearning = [], languagesNative = [] } = currentUser || {}

  const router = useRouter()
  const [title, setTitle] = React.useState<string>('')
  const [langId, setLangId] = React.useState<number>(-1)
  const [body, setBody] = React.useState<Node[]>(initialValue)

  const [createPost] = useCreatePostMutation({
    onCompleted: ({ createPost }) => {
      if (!createPost) {
        return
      }

      router.push({ pathname: `/post/${createPost.id}` })
    },
  })

  const userLanguages = languagesLearning
    .map((x) => x.language)
    .concat(languagesNative.map((x) => x.language))

  const createNewPost = (status: PostStatusType) => {
    createPost({
      variables: { title, body, status, languageId: langId },
    })
  }

  return (
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
  )
}

export default withApollo(NewPostPage)
