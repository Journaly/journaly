import escapeHTML from 'escape-html'
import { User } from '.prisma/client'
import AWS from 'aws-sdk'

type NodeType = {
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

const nonBodyTypes = new Set(['heading-one', 'heading-two', 'block-quote'])

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

const extractBodyTextFromNode = (node: NodeType) => {
  if (!node.type && typeof node.text === 'string') {
    return node.text
  }

  if (!node.type || nonBodyTypes.has(node.type)) {
    return ''
  }

  const content: string = (node.children || []).map(extractBodyTextFromNode).join(' ')

  return content
}

const extractBodyText = (document: NodeType[]) => {
  return document.map(extractBodyTextFromNode).join(' ')
}

export const generateExcerpt = (document: NodeType[], length = 200, tolerance = 20) => {
  // `length` is the max number of characters (codepoints) in the excerpt,
  // tolerance is the number of characters we'll back-track looking for a word
  // or sentence break to cut off at
  const bodyText = extractBodyText(document)

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

export const processEditorDocument = (document: NodeType[]) => {
  const bodyText = extractBodyText(document)

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

const sqs = new AWS.SQS({ region: 'us-west-1' })
const QUEUE_URL = `https://sqs.us-west-1.amazonaws.com/${process.env.AWS_ACCOUNT_ID}/JMailQueue`

export const sendJmail = (post, comment) => {
  // Do the thang!
}
