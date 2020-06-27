import escapeHTML from 'escape-html'
import { User, Post, Comment } from '.prisma/client'

type NodeType = {
  type: ?string
  text: ?string
  children: ?NodeType[]
}

const typeToElStrMap = {
  'block-quote': 'blockquote',
  'heading-two': 'h2',
  'bulleted-list': 'ul',
  'numbered-list': 'ol',
  paragraph: 'p',
}

const htmlifyEditorNode = (node: NodeType): string => {
  if (!node.type && typeof node.text === 'string') {
    return escapeHTML(node.text)
  }

  const tagName = typeToElStrMap[node.type] || 'span'
  const content = (node.children || []).map(htmlifyEditorNode).join('\n')

  return `<${tagName}>${content}</${tagName}>`
}

export const htmlifyEditorNodes = (value: NodeType[]): string => {
  return value.map(htmlifyEditorNode).join('\n')
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
