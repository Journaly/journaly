import { diffChars } from 'diff'
import escapeHTML from 'escape-html'
import {
  PrismaClient,
  User,
  Thread,
  Comment,
  Post,
  PostComment,
  PendingNotificationCreateInput,
} from '@journaly/j-db-client'

export const assertUnreachable = (x: never): never => {
  throw new Error(`Didn't expect to get here ${x}`)
}

export type NodeType = {
  text?: string | null
  italic?: boolean | null
  bold?: boolean | null
  underline?: boolean | null
  type?: string | null
  url?: string | null
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
  link: 'a',
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
  const content = (node.children || []).map(htmlifyEditorNode).join('')
  const attributes: string[] = []

  if (node.type === 'link' && node.url) {
    attributes.push(`href="${node.url}" target="_blank" rel="noopener noreferrer"`)
  }

  return `<${tagName} ${attributes.join(' ')}>${content}</${tagName}>`
}

export const htmlifyEditorNodes = (value: NodeType[]): string => {
  return value.map(htmlifyEditorNode).join('')
}

const extractTextFromNode = (node: NodeType, ignoreNodeTypes = emptySet): string => {
  if (!node.type && typeof node.text === 'string') {
    return node.text
  }

  if (!node.type || ignoreNodeTypes.has(node.type)) {
    return ''
  }

  const content: string = (node.children || [])
    .map((node) => extractTextFromNode(node, ignoreNodeTypes))
    .join('')

  return content
}

const removeDoubleSpace = (str: string): string => str.replace(/ +(?= )/g, '')

export const extractText = (
  document: NodeType[],
  ignoreNodeTypes = emptySet,
  separator = ' ',
): string => {
  const text = document.map((node) => extractTextFromNode(node, ignoreNodeTypes)).join(separator)
  return removeDoubleSpace(text)
}

export const generateExcerpt = (document: NodeType[], length = 200, tolerance = 20): string => {
  // `length` is the max number of characters (codepoints) in the excerpt,
  // tolerance is the number of characters we'll back-track looking for a word
  // or sentence break to cut off at
  const bodyText = extractText(document, nonBodyTypes)

  if (bodyText.length <= length) {
    return bodyText
  }

  let end = Math.min(length, bodyText.length) - 1
  let breakFound = false

  while (length - end < tolerance) {
    if (breakCharacters.has(bodyText[end])) {
      breakFound = true
      break // heh!
    }
    end--
  }

  if (!breakFound) {
    end += tolerance
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
  threads: Thread[],
): Thread[] => {
  const oldStr = extractText(oldDoc)
  const newStr = extractText(newDoc)
  const changes = diffChars(oldStr, newStr)
  const threadsRepr = threads.map(
    (t) => [t.startIndex, t.endIndex, t.id] as [number, number, number],
  )

  // Move thread fenceposts according to inserts and deletes. Mark threads that
  // experienced a delete op over either of their fence posts as archived.
  let idx = 0
  for (let ci = 0; ci < changes.length; ci++) {
    const { count = 0, added, removed } = changes[ci]
    const changeEnd = idx + count - 1

    if (added) {
      for (let ti = 0; ti < threadsRepr.length; ti++) {
        const t = threadsRepr[ti]
        if (t[0] > idx) t[0] += count
        if (t[1] > idx) t[1] += count
      }

      idx += count
    } else if (removed) {
      for (let ti = 0; ti < threadsRepr.length; ti++) {
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

  // Now look for threads which, after having been moved, are over illegal
  // thread positions.

  // List of indicies a valid comment may not cross in the new doc
  const breakPoints = new Set<number>()

  idx = 0
  const recur = (tree: NodeType): void => {
    if (tree.type !== undefined) {
      breakPoints.add(idx)
    }

    idx += tree.text?.length || 0

    if (tree.type !== undefined) {
      breakPoints.add(idx)
    }

    ;(tree.children || []).map(recur)
  }

  newDoc.map(recur)

  for (const breakPoint of breakPoints) {
    for (let ti = 0; ti < threadsRepr.length; ti++) {
      const t = threadsRepr[ti]
      if (t[0] < breakPoint && t[1] > breakPoint) {
        t[0] = -1
        t[1] = -1
      }
    }
  }

  return threads.map((thread) => {
    const [startIndex, endIndex] = threadsRepr.find(([, , id]) => id === thread.id) || [0, 0, 0]
    return {
      ...thread,
      startIndex,
      endIndex,
    }
  })
}

export const processEditorDocument = (
  document: NodeType[],
): Pick<Post, 'body' | 'bodySrc' | 'excerpt' | 'readTime'> => {
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
export const hasAuthorPermissions = (original: AuthoredObject, currentUser: User): boolean => {
  const hasPermission =
    original.authorId == currentUser.id ||
    currentUser.userRole === 'MODERATOR' ||
    currentUser.userRole === 'ADMIN'

  if (!hasPermission) throw new Error('You do not have permission to do that')
  return true
}

type NotificationCreationType =
  | { type: 'THREAD_COMMENT'; comment: Comment }
  | { type: 'POST_COMMENT'; postComment: PostComment }

export const createNotification = (
  db: PrismaClient,
  user: User,
  note: NotificationCreationType,
) => {
  const data: PendingNotificationCreateInput = {
    user: { connect: { id: user.id } },
    type: note.type,
  }

  switch (note.type) {
    case 'THREAD_COMMENT': {
      data.comment = { connect: { id: note.comment.id } }
      break
    }
    case 'POST_COMMENT': {
      data.postComment = { connect: { id: note.postComment.id } }
      break
    }
    /*
    default:
      return assertUnreachable(note.type)
    */
  }

  return db.pendingNotification.create({ data })
}

export * from './email'
export * from './aws'
