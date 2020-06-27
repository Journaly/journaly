import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Node } from 'slate'
import { withApollo } from '../../lib/apollo'

import DashboardLayout from '../../components/Layouts/DashboardLayout'
import JournalyEditor from '../../components/JournalyEditor'
import LanguageSelect from '../../components/LanguageSelect'
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
      <form onSubmit={createNewPost}>
        <h1>Let's write a post</h1>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          name="title"
          placeholder="Title..."
        />
        <LanguageSelect languages={userLanguages} value={langId} onChange={setLangId} />
        <JournalyEditor value={body} setValue={setBody} />
        <input type="submit" value="Submit" />
        <style jsx>{`
          h1 {
            margin: 50px auto;
            text-align: center;
          }
        `}</style>
      </form>
    </DashboardLayout>
  )
}

export default withApollo(NewPostPage)
