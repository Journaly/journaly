import { diffChars } from 'diff'
import { Post, Thread } from '@journaly/j-db-client'
import escapeHTML from 'escape-html'

export type NodeType = {
  text?: string | null
  italic?: boolean | null
  bold?: boolean | null
  underline?: boolean | null
  type?: string | null
  url?: string | null
  colSizes?: number[] | null
  size?: number | null
  children?: NodeType[] | undefined | null
}

export type Doc = NodeType[]

type ApplySuggestionArg = {
  doc: Doc
  startIdx: number
  endIdx: number
  suggestedContent: string
}

const emptySet = new Set<string>([])

export const isEmptyParagraph = (node: NodeType): boolean => {
  if (node.type !== 'paragraph') return false

  if (node.children && node.children.length > 0) return false

  return true
}

const traverseDoc = (
  doc: Doc,
  callback: (
    node: NodeType,
    startIdx: number,
    endIdx: number,
    ancestry: [NodeType, number][],
  ) => void,
  offset?: number,
  ancestry?: [NodeType, number][],
): number => {
  offset = offset || 0
  ancestry = ancestry || []

  for (const el of doc) {
    ancestry.push([el, offset])
    if (!el.type) {
      callback(el, offset, offset + (el?.text?.length || 0), [...ancestry])
      offset += el?.text?.length || 0
    } else if (el.children?.length) {
      offset = traverseDoc(el.children, callback, offset, ancestry)
    }
    ancestry.pop()
  }

  return offset
}

export const findCommonAncestor = (
  doc: Doc,
  startIdx: number,
  endIdx: number,
): [NodeType | null, number] => {
  // 1. Find node where our suggestion starts and ends
  let start: NodeType | undefined
  let end: NodeType | undefined
  let startAncestry: [NodeType, number][] = []
  let endAncestry: Set<NodeType> = new Set()

  // const commonAncestorNode
  traverseDoc(doc, (node, _nodeStart, nodeEnd, ancestry) => {
    if (nodeEnd > startIdx && !start) {
      start = node
      startAncestry = ancestry
    }
    if (nodeEnd >= endIdx && !end) {
      end = node
      endAncestry = new Set(ancestry.map(([node]) => node))
    }
  })

  for (let i = startAncestry.length - 1; i >= 0; i--) {
    const [node, parentNodeIdx] = startAncestry[i]
    if (endAncestry.has(node)) return [node, parentNodeIdx]
  }

  return [null, 0]
}

export const applySuggestion = ({
  doc,
  startIdx,
  endIdx,
  suggestedContent,
}: ApplySuggestionArg): Doc => {
  // Find node that is a parent for all nodes touched by this suggestion.
  // Including formatting markup boundaries.
  const [commonAncestor, commonAncestorStart] = findCommonAncestor(doc, startIdx, endIdx)

  if (commonAncestor === null) {
    const baseText = extractText(doc)
    const modified = baseText.substring(0, startIdx) + suggestedContent + baseText.substring(endIdx)
    return [
      {
        text: modified,
      },
    ]
  } else {
    const baseText = extractTextFromNode(commonAncestor)
    const modified =
      baseText.substring(0, startIdx - commonAncestorStart) +
      suggestedContent +
      baseText.substring(endIdx - commonAncestorStart)

    if (commonAncestor.type) {
      return swapNode(doc, commonAncestor, { ...commonAncestor, children: [{ text: modified }] })
    } else {
      return swapNode(doc, commonAncestor, { text: modified })
    }
  }
}

const swapNode = (doc: Doc, target: NodeType, replacement: NodeType) => {
  const docClone = [...doc]

  for (let i = 0; i < docClone.length; i++) {
    const el = docClone[i]

    if (el === target) {
      docClone[i] = replacement
    } else if (el.children) {
      docClone[i] = {
        ...docClone[i],
        children: swapNode(el.children, target, replacement),
      }
    }
  }

  return docClone
}

const typeToElStrMap: { [key: string]: string } = {
  'heading-one': 'h1',
  'heading-two': 'h2',
  'block-quote': 'blockquote',
  'bulleted-list': 'ul',
  'numbered-list': 'ol',
  'list-item': 'li',
  link: 'a',
  paragraph: 'p',
  p: 'p',
  table: 'table',
  td: 'td',
  tr: 'tr',
  th: 'th',
}

type textNodeFormatType = 'italic' | 'bold' | 'underline'

// Iterate this array rather than the following object for a consistent order.
const textNodeFormats: textNodeFormatType[] = ['italic', 'bold', 'underline']

const textNodeFormatEls: { [T in textNodeFormatType]: string } = {
  italic: 'em',
  bold: 'strong',
  underline: 'u',
}

const nonBodyTypes = new Set<string>([
  'heading-one',
  'heading-two',
  'block-quote',
  'table',
  'td',
  'tr',
  'th',
])

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

  // Move thread fenceposts according to inserts and deletes. Inserts move all
  // subsequent fenceposts forwards, deletes move them backwards. If a delete
  // spans a thread's fencepost, mark that thread as archived (signaled by
  // both fenceposts set to -1). If a delete perfectly spans a thread, also
  // mark it as archived.
  let idx = 0
  for (let ci = 0; ci < changes.length; ci++) {
    const { count = 0, added, removed } = changes[ci]
    const changeEnd = idx + count

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
          // Starting fencepost deleted
          t[0] = -1
          t[1] = -1
        } else if (t[1] > idx && t[1] < changeEnd) {
          // Ending fencepost deleted
          t[0] = -1
          t[1] = -1
        } else if (t[0] === idx && t[1] === changeEnd) {
          // Delete perfectly spans the thread
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

export const readTime = (text: string): number => {
  const numWords = text.split(' ').length

  return Math.round(numWords / 200)
}

export const htmlifyEditorNodes = (value: NodeType[]): string => {
  return value.map(htmlifyEditorNode).join('')
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

  if (node.type === 'image') {
    // Images are a special case since they have no closer nor children
    return `<img src=${node.url}>`
  } else {
    const tagName = getNodeTagName(node)
    let content = (node.children || []).map(htmlifyEditorNode).join('')
    const attributes: string[] = []

    if (node.type === 'link' && node.url) {
      attributes.push(`href="${node.url}" target="_blank" rel="noopener noreferrer"`)
    } else if (node.type === 'tr' && node.size) {
      attributes.push(`style="height: ${node.size}px;"`)
    }

    if (node.type === 'table' && node.colSizes) {
      attributes.push('style="table-layout:fixed;"')
      content = `
        <colgroup style="width: 100%;">
          ${node.colSizes
            .map((size) => `<col style="min-width: 48px; width: ${size}px;">`)
            .join('\n')}
        </colgroup>
        <tbody>
          ${content}
        </tbody>
      `
    }

    return `<${tagName} ${attributes.join(' ')}>${content}</${tagName}>`
  }
}
