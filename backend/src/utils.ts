import escapeHTML from 'escape-html'
import { User, Post, Comment } from '.prisma/client'

type TextNode = {
  text: string
  italic: ?boolean
  bold: ?boolean
  underline: ?boolean
}

type BlockNode = {
  type: string
  children: NodeType[]
}

type NodeType = BlockNode | TextNode

const typeToElStrMap = {
  'heading-one': 'h1',
  'heading-two': 'h2',
  'block-quote': 'blockquote',
  'bulleted-list': 'ul',
  'numbered-list': 'ol',
  paragraph: 'p',
}

// Iterate this array rather than the following object for a consistent order.
const textNodeFormats = ['italic', 'bold', 'underline']

const textNodeFormatEls = {
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

const htmlifyEditorNode = (node: NodeType): string => {
  if (!node.type && typeof node.text === 'string') {
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

  const tagName = typeToElStrMap[node.type] || 'span'
  const content = (node.children || []).map(htmlifyEditorNode).join('\n')

  return `<${tagName}>${content}</${tagName}>`
}

export const htmlifyEditorNodes = (value: NodeType[]): string => {
  return value.map(htmlifyEditorNode).join('\n')
}

const extractBodyTextFromNode = (node: NodeType[]) => {
  if (!node.type && typeof node.text === 'string') {
    return node.text
  }

  const content = (node.children || [])
    .filter(({ type }) => !nonBodyTypes.has(type))
    .map(extractBodyTextFromNode)
    .join(' ')

  return content
}

const extractBodyText = (document: NodeType[]) => {
  return document.map(extractBodyTextFromNode).join(' ')
}

export const generateExcerpt = (
  document: NodeType[],
  length = 200,
  tolerance = 20,
) => {
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

export const processEditorDocument = (document: NodeType[]) => {
  return {
    body: htmlifyEditorNodes(document),
    bodySrc: JSON.stringify(document),
    excerpt: generateExcerpt(document),
  }
}

// Takes in an original Post or Comment and a currently logged in User and checks that
// the currentUser has permission to update or delete that Post/Comment
export const hasPostPermissions = (
  original: Post | Comment,
  currentUser: User,
) => {
  const hasPermission =
    original.authorId == currentUser.id ||
    currentUser.userRole !== 'MODERATOR' ||
    currentUser.userRole !== 'ADMIN'

  if (!hasPermission) throw new Error('You do not have permission to do that')
  return true
}
