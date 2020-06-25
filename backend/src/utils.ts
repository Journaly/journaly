import escapeHTML from 'escape-html'

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
