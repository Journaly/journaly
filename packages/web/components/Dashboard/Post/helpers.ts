import { PostClap, User } from '@/generated/graphql'
import { useTranslation } from '@/config/i18n'

/**
 * Get an element’s position relative to the document
 * @see https://stackoverflow.com/a/26230989/3610495
 */
export const getCoords = (htmlElement: HTMLElement) => {
  const box = htmlElement.getBoundingClientRect()

  const body = document.body
  const docEl = document.documentElement

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft

  const clientTop = docEl.clientTop || body.clientTop || 0
  const clientLeft = docEl.clientLeft || body.clientLeft || 0

  const top = box.top + scrollTop - clientTop
  const left = box.left + scrollLeft - clientLeft

  return { y: Math.round(top), x: Math.round(left) }
}

export const getUsersClappedText = (claps: Array<
  { __typename?: 'PostClap' } & Pick<PostClap, 'id'> & {
    author: { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'handle'>
  }
>, currentUserId: number | undefined) => {
  // JonSnow clapped for this post.
  // JonSnow and Arya Stark clapped for this post.
  // JonSnow, Arya Stark, and 1 others clapped for this post.
  // current user -> You && move to front
  const { t } = useTranslation('post')

  const containsCurrentUser = claps.some((clap) => {
    return clap.author.id === currentUserId
  })

  console.log(claps)

  let usersClapped = claps
    .filter((clap) => clap.author.id !== currentUserId)
    .map((clap) => {
      return clap.author.name ? clap.author.name : clap.author.handle
    })

  console.log(usersClapped)

  if (containsCurrentUser) {
    usersClapped = [t('You'), ...usersClapped]
  }

  if (usersClapped.length == 0) {
    return t('0 users clapped for this post.')
  }
  else if (usersClapped.length == 1) {
    return t(`${usersClapped[0]} clapped for this post.`)
  }
  else if (usersClapped.length == 2) {
    return t(`${usersClapped[0]} and ${usersClapped[1]} clapped for this post.`)
  }
  else /* usersClapped.length > 2 */ {
    const numOthersClapped = usersClapped.length - 2
    return t(`${usersClapped[0]}, ${usersClapped[1]}, and ${numOthersClapped} others clapped for this post.`)
  }
}