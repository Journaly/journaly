import { Root, Element, Node, Text } from "hast";
import { visit } from 'unist-util-visit'
import { suggestionDiff } from '@/utils/suggestionDiff'

type Settings = {
  baseContent: string
}

const isElement = (node: Node): node is Element => {
  return node?.type === 'element'
}

type CreateElementOpts = {
  className?: string
  children?: (Element|Text)[]
  text?: string
}

const createElement = (
  tagName: string,
  opts: CreateElementOpts
): Element => {
  return {
    type: 'element',
    tagName,
    children: opts.children ?? (
      opts.text !== undefined
        ? [{ type: 'text', value: opts.text }]
        : []
    ),
    ...(opts.className ? { properties: { className: [opts.className] } } : {}),
  }
}


const rehypeSuggestions = (options: Settings) => {
  return (tree: Root) => {
    visit(tree, 'element', (node: Node) => {
      if (!isElement(node) || node.tagName !== 'pre')
        return

      if (!node.properties)
        node.properties = {}

      node.properties.className = ['suggestion']
      const textNode = (node.children[0] as Element).children[0] as Text
      const originalStr = options.baseContent
      // Strip out new line that Rehype introduces at the end of the tag.
      const suggestionStr = textNode.value.replace(/\n$/, '')

      const { oldStr, newStr } = suggestionDiff(originalStr, suggestionStr)

      const oldStrDiv = createElement('div', { className: 'old-string' })
      const newStrDiv = createElement('div', { className: 'new-string' })

      for (const [mode, value] of oldStr) {
        oldStrDiv.children.push(
          createElement('span', {
            text: value,
            className: mode === '-'
              ? 'del'
              : mode === '+'
              ? 'add'
              : undefined
          })
        )
      }

      for (const [mode, value] of newStr) {
        newStrDiv.children.push(
          createElement('span', {
            text: value,
            className: mode === '-'
              ? 'del'
              : mode === '+'
              ? 'add'
              : undefined
          })
        )
      }

      ;(node.children[0] as Element).children = [oldStrDiv, newStrDiv]

      const headerDiv = createElement('div', {
        children: [
          createElement('span', { text: 'Suggestion' }),
          createElement('Button', {
            text: 'Apply Suggestion',
            className: 'apply-suggestion-btn',
          }),
        ],
        className: 'header'
      })

      node.children.unshift(headerDiv)
    })
  }
}

export default rehypeSuggestions
