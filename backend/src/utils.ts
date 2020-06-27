import escapeHTML from 'escape-html'

type NodeType = {
  type: ?string
  text: ?string
  children: ?NodeType[]
}

const typeToElStrMap = {
  'heading-one': 'h1',
  'heading-two': 'h2',
  'block-quote': 'blockquote',
  'bulleted-list': 'ul',
  'numbered-list': 'ol',
  paragraph: 'p',
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
    return escapeHTML(node.text)
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
