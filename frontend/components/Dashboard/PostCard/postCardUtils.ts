import { format, parseISO } from 'date-fns'
import { User, PostStatus, Thread } from '../../../generated/graphql'

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
  threads?: Thread[]
  createdAt: string
}

export const postBorderRadius = '5px'

export const processPost = (post: Post) => {
  const {
    id,
    title,
    excerpt,
    readTime,
    images = [],
    likes = 0,
    threads = [],
    author,
    createdAt,
  } = post
  const displayImage = images[0] || '/images/samples/sample-post-img.jpg'
  const authorDisplayName = author.name || author.handle

  return {
    id,
    title,
    readTime,
    likes,
    numThreads: threads.length,
    excerpt,
    displayImage,
    profileImage: author.profileImage,
    authorName: authorDisplayName,
    createdAt,
  }
}

export const formatPostDate = (date: string): string => {
  return format(parseISO(date), 'MMM d')
}
