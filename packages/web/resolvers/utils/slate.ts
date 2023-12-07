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
