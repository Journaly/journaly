import React from 'react'
import theme from '@/theme'
import {
  PostCardFragmentFragment as PostType,
  usePostsQuery,
  PostStatus,
  useUserByIdQuery,
} from '@/generated/graphql'
import Button, { ButtonVariant } from '@/components/Button'
import { useRouter } from 'next/router'

type PostInfoProps = {
  post: PostType
}

const PostInfo: React.FC<PostInfoProps> = ({ post }) => {
  return (
    <tr>
      <td className="id-col">{post.id}</td>
      <td>{post.title}</td>
      <td>{post.createdAt}</td>
      <td>
        <Button className="user-action-btn" variant={ButtonVariant.Link}>
          Update
        </Button>
      </td>
      <style jsx>{`
        td {
          border-bottom: 1px solid #ededed;
          border-right: 1px solid #ededed;
          position: relative;
          padding: 4px 12px;
        }

        td:last-child {
          border-right: none;
          width: 150px;
        }

        td:last-child :global(.user-action-btn) {
          width: 100%;
        }

        .id-col {
          text-align: center;
        }
      `}</style>
    </tr>
  )
}

const JAdminPosts = () => {
  const router = useRouter()
  const authorIdParam = router.query.id as string
  const authorId = parseInt(authorIdParam, 10)

  const { data: authorData } = useUserByIdQuery({
    variables: {
      id: authorId,
    },
  })

  const { data } = usePostsQuery({
    variables: {
      first: 10,
      skip: 0,
      authorId,
      status: PostStatus.Published,
    },
  })

  return (
    <div>
      <div>
        <h2>Manage Posts By: {authorData?.userById.handle}</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Created At</th>
              <th>⬇︎</th>
            </tr>
          </thead>
          <tbody>
            {data?.posts && data.posts.posts.map((post) => <PostInfo post={post} key={post.id} />)}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        h2 {
          font-size: 32px;
          lint-height: 40px;
          margin-bottom: 40px;
        }

        table {
          background-color: ${theme.colors.white};
          border-spacing: 0;
          width: 100%;
          border: 1px solid #ededed;
        }

        thead {
          font-size: 10px;
          font-weight: 700;
        }

        th {
          border-bottom: 1px solid #ededed;
          border-right: 1px solid #ededed;
          position: relative;
          padding: 5px;
          text-transform: uppercase;
        }

        th:last-child {
          border-right: none;
          width: 150px;
        }

        tr:hover {
          background-color: #e8f4f8;
        }
      `}</style>
    </div>
  )
}

export default JAdminPosts
