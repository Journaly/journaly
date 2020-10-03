import AWS from 'aws-sdk'
import { diffChars } from 'diff'
import escapeHTML from 'escape-html'
import { User, Thread, Comment, Post, PostComment } from '.prisma/client'
import { makeEmail } from '../lib/mail'

export type NodeType = {
  text?: string | null
  italic?: boolean | null
  bold?: boolean | null
  underline?: boolean | null
  type?: string | null
  children?: NodeType[] | undefined | null
}

type AuthoredObject = { authorId: number }

const typeToElStrMap: { [key: string]: string } = {
  'heading-one': 'h1',
  'heading-two': 'h2',
  'block-quote': 'blockquote',
  'bulleted-list': 'ul',
  'numbered-list': 'ol',
  'list-item': 'li',
  paragraph: 'p',
}

type textNodeFormatType = 'italic' | 'bold' | 'underline'

// Iterate this array rather than the following object for a consistent order.
const textNodeFormats: textNodeFormatType[] = ['italic', 'bold', 'underline']

const textNodeFormatEls: { [T in textNodeFormatType]: string } = {
  italic: 'em',
  bold: 'strong',
  underline: 'u',
}

const emptySet = new Set<string>([])
const nonBodyTypes = new Set<string>(['heading-one', 'heading-two', 'block-quote'])

const breakCharacters = new Set([
  ' ', // Good ole ASCII space
  '.',
  ';',
  '　', // Full width space (Japanese, Chinese?)
  '。', // Ideographic full stop
])

const getNodeTagName = (node: NodeType): string => {
  if (!node.type) {
    return 'span'
  }

  if (!(node.type in typeToElStrMap)) {
    return 'span'
  }

  return typeToElStrMap[node.type]
}

const isEmptyParagraph = (node: NodeType): boolean => {
  if (node.type !== 'paragraph') return false

  if (node.children && node.children.length > 0) return false

  return true
}

const htmlifyEditorNode = (node: NodeType): string => {
  if (!node.type && typeof node.text === 'string') {
    // Special case for empty p tags. Slate renders these as a para with a br
    // inside, so we follow suit here for consistency between editor and view
    if (isEmptyParagraph(node)) {
      return '<p><br></p>'
    }

    // Wrap text node in each applicable element
    return textNodeFormats.reduce((textNodeMarkup, format) => {
      if (node[format]) {
        const El = textNodeFormatEls[format]
        return `<${El}>${textNodeMarkup}</${El}>`
      } else {
        return textNodeMarkup
      }
    }, escapeHTML(node.text))
  }

  const tagName = getNodeTagName(node)
  const content = (node.children || []).map(htmlifyEditorNode).join('\n')

  return `<${tagName}>${content}</${tagName}>`
}

export const htmlifyEditorNodes = (value: NodeType[]): string => {
  return value.map(htmlifyEditorNode).join('\n')
}

const extractTextFromNode = (node: NodeType, ignoreNodeTypes=emptySet) => {
  if (!node.type && typeof node.text === 'string') {
    return node.text
  }

  if (!node.type || ignoreNodeTypes.has(node.type)) {
    return ''
  }

  const content: string = (node.children || [])
    .map(node => extractTextFromNode(node, ignoreNodeTypes))
    .join('')

  return content
}

export const extractText = (document: NodeType[], ignoreNodeTypes=emptySet) => {
  return document
    .map(node => extractTextFromNode(node, ignoreNodeTypes))
    .join('\n')
}

export const generateExcerpt = (document: NodeType[], length = 200, tolerance = 20) => {
  // `length` is the max number of characters (codepoints) in the excerpt,
  // tolerance is the number of characters we'll back-track looking for a word
  // or sentence break to cut off at
  const bodyText = extractText(document, nonBodyTypes)

  let end = Math.min(length, bodyText.length - 1)
  let breakFound = false

  while (bodyText.length - end < tolerance) {
    if (breakCharacters.has(bodyText[end])) {
      breakFound = true
      break // heh!
    }
    end--
  }

  if (!breakFound) {
    end += tolerance
  } else {
    // Chop off breaking character
    end--
  }

  return bodyText.substr(0, end)
}

export const readTime = (text: string): number => {
  const numWords = text.split(' ').length

  return Math.round(numWords / 200)
}

export const updatedThreadPositions = (
  oldDoc: NodeType[],
  newDoc: NodeType[],
  threads: Thread[]
) => {
  const oldStr = extractText(oldDoc)
  const newStr = extractText(newDoc)
  const changes = diffChars(oldStr, newStr)
  const threadsRepr = threads.map((t: any) => ([t.startIndex, t.endIndex, t.id] as [number, number, number]))

  let idx = 0

  for (let ci = 0; ci<changes.length; ci++) {
    const { count = 0, added, removed } = changes[ci]
    const changeEnd = idx + count - 1

    if (added) {
      for (let ti = 0; ti<threadsRepr.length; ti++) {
        const t = threadsRepr[ti]
        if (t[0] > idx) t[0] += count
        if (t[1] > idx) t[1] += count
      }

      idx += count
    } else if (removed) {
      for (let ti = 0; ti<threadsRepr.length; ti++) {
        const t = threadsRepr[ti]

        if (t[0] > idx && t[0] < changeEnd) {
          t[0] = -1
          t[1] = -1
        } else if (t[1] > idx && t[1] < changeEnd) {
          t[0] = -1
          t[1] = -1
        } else {
          if (t[0] > idx) t[0] -= count
          if (t[1] > idx) t[1] -= count
        }
      }
    } else {
      idx += count
    }
  }

  return threads.map(thread => {
    const [startIndex, endIndex] = threadsRepr.find(([_, __, id]) => id === thread.id) || [0, 0, 0]
    return {
      ...thread,
      startIndex,
      endIndex
    }
  })
}

export const processEditorDocument = (document: NodeType[]) => {
  const bodyText = extractText(document)

  return {
    body: htmlifyEditorNodes(document),
    bodySrc: JSON.stringify(document),
    excerpt: generateExcerpt(document),
    readTime: readTime(bodyText),
  }
}

// Takes in an original Post or Comment and a currently logged in User and checks that
// the currentUser has permission to update or delete that Post/Comment
export const hasAuthorPermissions = (original: AuthoredObject, currentUser: User) => {
  const hasPermission =
    original.authorId == currentUser.id ||
    currentUser.userRole === 'MODERATOR' ||
    currentUser.userRole === 'ADMIN'

  if (!hasPermission) throw new Error('You do not have permission to do that')
  return true
}

/**
 * JMail Email Handler
 * @param post - the post that was commented on
 * @param comment - the comment the was written
 */

AWS.config.credentials = new AWS.Credentials(
  process.env.JAWS_ACCESS_KEY_ID!,
  process.env.JAWS_SECRET_ACCESS_KEY!,
)
const sqs = new AWS.SQS({ region: 'us-east-2' })

type SendCommentNotificationArgs = {
  post: Post
  thread: Thread
  comment: Comment
  commentAuthor: User
  user: User
}

type SendCommentThanksNotificationArgs = {
  post: Post
  thread: Thread
  comment: Comment
  commentAuthor: User
  commentThanksAuthor: User
}

type SendPostCommentNotificationArgs = {
  post: Post
  postAuthor: User
  postComment: PostComment
  postCommentAuthor: User
}

type sendPasswordResetTokenEmailArgs = {
  user: User
  resetToken: string
}

type EmailParams = {
  from: string
  to: string
  subject: string
  html: string
}

type SqsParams = {
  MessageBody: string
  QueueUrl: string
}

export const sendJmail = (emailParams: EmailParams) => {
  const params: SqsParams = {
    MessageBody: JSON.stringify(emailParams),
    QueueUrl: process.env.JMAIL_QUEUE_URL!,
  }

  return new Promise((res, rej) => {
    sqs.sendMessage(params, function (err, data) {
      if (err) {
        rej(err)
      } else {
        res(data)
      }
    })
  })
}

export const sendCommentNotification = ({
  post,
  thread,
  comment,
  commentAuthor,
  user,
}: SendCommentNotificationArgs) => {
  return sendJmail({
    from: 'robin@journaly.com',
    to: user.email,
    subject: `New activity on a thread in ${post.title}`,
    html: makeEmail(`
      <p>Heads up! <strong>@${commentAuthor.handle}</strong> commented on a post you're subscribed to!</p>
      <p><strong>Journal entry:</strong> ${post.title}</p>
      <p><strong>Comment thread:</strong> "${thread.highlightedContent}"</p>
      <p><strong>Comment:</strong> "${comment.body}"</p>
      <p>Click <a href="https://${process.env.SITE_DOMAIN}/post/${post.id}">here</a> to go to your journal entry!</p>
    `),
  })
}

export const sendCommentThanksNotification = ({
  post,
  thread,
  comment,
  commentAuthor,
  commentThanksAuthor,
}: SendCommentThanksNotificationArgs) => {
  const commentThanksAuthorDisplayName = commentThanksAuthor.name || commentThanksAuthor.handle

  return sendJmail({
    from: 'robin@journaly.com',
    to: commentAuthor.email,
    subject: `${commentThanksAuthorDisplayName} said thank you!`,
    html: makeEmail(`
      <p>Heads up! <strong>@${commentThanksAuthorDisplayName}</strong> said thank you for your comment on their post!</p>
      <p><strong>Journal entry:</strong> ${post.title}</p>
      <p><strong>Comment thread:</strong> "${thread.highlightedContent}"</p>
      <p><strong>Comment:</strong> "${comment.body}"</p>
      <p>Click <a href="https://${process.env.SITE_DOMAIN}/post/${post.id}">here</a> to go to your journal entry!</p>
    `),
  })
}

export const sendPostCommentNotification = ({
  post,
  postAuthor,
  postComment,
  postCommentAuthor,
}: SendPostCommentNotificationArgs) => {
  return sendJmail({
    from: 'robin@journaly.com',
    to: postAuthor.email,
    subject: "You've got feedback!",
    html: makeEmail(`
      <p>Great news! <strong>@${postCommentAuthor.handle}</strong> left you some feedback!</p>
      <p><strong>Journal entry:</strong> ${post.title}</p>
      <p><strong>Comment:</strong> "${postComment.body}"</p>
      <p>Click <a href="https://${process.env.SITE_DOMAIN}/post/${post.id}">here</a> to go to your journal entry!</p>
    `),
  })
}

export const sendPasswordResetTokenEmail = ({
  user,
  resetToken,
}: sendPasswordResetTokenEmailArgs) => {
  return sendJmail({
    from: 'robin@journaly.com',
    to: user.email,
    subject: 'Your Password Reset Link',
    html: makeEmail(`
      <p>I heard you were having some trouble logging in.</>
      <p>Click <a href="https://${process.env.SITE_DOMAIN}/dashboard/reset-password?resetToken=${resetToken}">here</a> to reset your password!</p>
      <p>Please note that the link will expire in 1 hour.</p>
      <p>Warmly,</p>
    `),
  })
}
