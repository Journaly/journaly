import { sanitize } from '../../../utils'
import { User, PostStatus } from '../../../generated/graphql'

// TODO: this will be unnecessary once we use types from generated graphql
export type Post = {
  id: number
  title: string
  body: string
  readTime: number
  excerpt: string
  images?: string[]
  author: User
  status: PostStatus
  likes?: number
}

export const processPost = (post: Post) => {
  const { id, title, readTime, images = [], author } = post
  const displayImage = images[0] || '/images/samples/sample-post-img.jpg'
  const authorDisplayName = author.name || author.handle

  return {
    id,
    title,
    readTime,
    excerpt: sanitize(post.excerpt),
    displayImage,
    profileImage: author.profileImage,
    authorName: authorDisplayName,
  }
}
