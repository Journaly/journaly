import React from 'react'
// import { Post } from '../../../generated/graphql'

interface Props {
  posts: any[] // TODO: should be Post[]
}

const Feed: React.FC<Props> = ({ posts }) => {
  return (
    <div>
      {posts.map(post => (
        <p key={post.Id}>{post.Title}</p>
      ))}
    </div>
  )
}

export default Feed
