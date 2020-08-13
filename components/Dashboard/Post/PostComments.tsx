import React from 'react'
import theme from '../../../theme'
import { useCreatePostCommentMutation } from '../../../generated/graphql'

const PostComments: React.FC = ({ post, onNewPostComment, onUpdateComment, currentUser }) => {
  const [postCommentBody, setPostCommentBody] = React.useState<string>('')
  const [createPostComment, { loading }] = useCreatePostCommentMutation({
    onCompleted: () => {
      onNewPostComment()
      setPostCommentBody('')
    },
  })

  const createNewPostComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    createPostComment({
      variables: {
        postId: post.id,
        body: postCommentBody,
      },
    })
  }

  return (
    <div className="container">
      <h1>Comments</h1>
      <div className="post-comments">
        <p>No comments, yet...</p>
      </div>
      <style jsx>{`
        .container {
          background-color: ${theme.colors.white};
          box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
          width: 100%;
          padding: 20px;
          text-align: center;
        }

        @media (min-width: ${theme.breakpoints.XS}) {
          .container {
            width: 58%;
          }
        }

        h1 {
          ${theme.typography.headingLG};
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  )
}

export default PostComments
