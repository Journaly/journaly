import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Node } from 'slate'
import { withApollo } from '../../lib/apollo'

import DashboardLayout from '../../components/Layouts/DashboardLayout'
import JournalyEditor from '../../components/JournalyEditor'
import LanguageSelect from '../../components/LanguageSelect'
import Button from '../../elements/Button'
import { useCurrentUserQuery, useCreatePostMutation } from '../../generated/graphql'

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
      router.push({ pathname: `/post/${createPost.id}` })
    },
  })

  const userLanguages = languagesLearning.concat(languagesNative).map((x) => x.language)

  const createNewPost = (e) => {
    e.preventDefault()
    createPost({
      variables: { title, body },
    })
  }

  return (
    <DashboardLayout>
      <form id="new-post" onSubmit={createNewPost}>
        <h1>Let's write a post</h1>

        <label htmlFor="post-title">Title</label>
        <input
          className="j-field"
          id="post-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          name="title"
          placeholder="Title..."
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

        <Button onClick={createNewPost} disabled={!title || langId === -1}>
          Submit
        </Button>

        <style jsx>{`
          h1 {
            margin: 50px auto;
            text-align: center;
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
