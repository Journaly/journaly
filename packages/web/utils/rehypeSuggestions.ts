import { Root, Element, Node, Text } from "hast";
import { visit } from 'unist-util-visit'
import { suggestionDiff } from '@/utils/suggestionDiff'

type Settings = {
  baseContent: string
  currentContentInPost: string | null
  isPostAuthor: boolean
}

const isElement = (node: Node): node is Element => {
  return node?.type === 'element'
}

type CreateElementOpts = {
  className?: string
  children?: (Element | Text)[]
  text?: string
  properties?: Element['properties']
}

const createElement = (tagName: string, opts: CreateElementOpts): Element => {
  const properties = { ...opts.properties }

  if (opts.className) {
    properties.className = [opts.className]
  }

  return {
    type: 'element',
    tagName,
    properties,
    children:
      opts.children ?? (opts.text !== undefined ? [{ type: 'text', value: opts.text }] : []),
  }
}

const rehypeSuggestions = (options: Settings) => {
  return (tree: Root) => {
    visit(tree, 'element', (node: Node) => {
      if (!isElement(node) || node.tagName !== 'pre') return

      if (!node.properties) node.properties = {}

      node.properties.className = ['suggestion']
      const textNode = (node.children[0] as Element).children[0] as Text
      const originalStr = options.baseContent
      // Strip out new line that Rehype introduces at the end of the tag.
      const suggestionStr = textNode.value.replace(/\n$/, '')
      // TODO (this PR): Find best way to trim here.
      const suggestionMatches = suggestionStr === options.currentContentInPost?.trim()

      if (suggestionMatches) {
        node.properties.className.push('accepted')
      }

      const { oldStr, newStr } = suggestionDiff(originalStr, suggestionStr)

      const oldStrDiv = createElement('div', { className: 'old-string' })
      const newStrDiv = createElement('div', { className: 'new-string' })

      for (const [mode, value] of oldStr) {
        oldStrDiv.children.push(
          createElement('span', {
            text: value,
            className: mode === '-' ? 'del' : mode === '+' ? 'add' : undefined,
          }),
        )
      }

      for (const [mode, value] of newStr) {
        newStrDiv.children.push(
          createElement('span', {
            text: value,
            className: mode === '-' ? 'del' : mode === '+' ? 'add' : undefined,
          }),
        )
      }

      ;(node.children[0] as Element).children = [oldStrDiv, newStrDiv]

      const headerDivChildren = []
      headerDivChildren.push(createElement('span', { text: 'Suggestion' }))
      // If the user is not the author of the post, create button element.
      if (options.isPostAuthor && !suggestionMatches) {
        headerDivChildren.push(
          createElement('button', {
            text: 'Apply Suggestion',
            className: 'apply-suggestion-btn',
            properties: {
              'data-suggested-content': suggestionStr,
            },
          }),
        )
      } else if (suggestionMatches) {
        headerDivChildren.push(
          createElement('span', {
            text: 'Suggestion Accepted ✔️',
            className: 'suggestion-accepted-text',
          }),
        )
      }

      const headerDiv = createElement('div', {
        children: headerDivChildren,
        className: 'header',
      })

      node.children.unshift(headerDiv)
    })
  }
}

export default rehypeSuggestions
