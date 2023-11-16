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

export const isEmptyParagraph = (node: NodeType): boolean => {
  if (node.type !== 'paragraph') return false

  if (node.children && node.children.length > 0) return false

  return true
}
