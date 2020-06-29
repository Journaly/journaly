import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Node } from 'slate'
import { withApollo } from '../../lib/apollo'

import DashboardLayout from '../../components/Layouts/DashboardLayout'
import JournalyEditor from '../../components/JournalyEditor'
import { useCreatePostMutation } from '../../generated/graphql'
import theme from '../../theme'
import Button, { ButtonVariant } from '../../elements/Button'

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

const NewPostPage: NextPage = () => {
  const [title, setTitle] = React.useState<string>('')
  const [body, setBody] = React.useState<Node[]>(initialValue)

  const router = useRouter()
  const [createPost] = useCreatePostMutation({
    onCompleted: ({ createPost }) => {
      router.push({ pathname: `/post/${createPost.id}` })
    },
  })

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
          className="title-input"
        />
        <JournalyEditor value={body} setValue={setBody} />
        <div className="button-container">
          <Button type="submit" variant={ButtonVariant.Primary}>
            Publish!
          </Button>
          <Button type="submit" variant={ButtonVariant.Secondary}>
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

          .title-input {
            width: 100%;
            max-width: 630px;
            margin: 0 auto;
            padding: 10px;
            border-radius: 5px;
          }

          .button-container {
            display: flex;
            flex-direction: row;
            margin: 0 auto;
            width: 200px;
            justify-content: space-between;
          }
        `}</style>
      </form>
    </DashboardLayout>
  )
}

export default withApollo(NewPostPage)
