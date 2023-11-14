import { visit } from 'unist-util-visit'
import { Properties } from 'hast'
import { suggestionDiff } from '@/utils/suggestionDiff'

/**
 * TOOD: update this
 * Plugin to enable, disable, and ignore messages.
 *
 * @type {import('unified').Plugin<[Options?]|void[], Root>}
 */
export default function rehypedSuggestions(options: any) {
  // TODO (this PR): figure this type out
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      let { data, tagName } = node

      if (tagName !== 'pre') return

      if (!data) {
        data = {}
        node.data = data
      }

      node.properties.className = ['suggestion']
      const textNode = node.children[0].children[0]
      const originalStr = options.baseContent
      // Strip out new line that Rehype introduces at the end of the tag.
      const suggestionStr = textNode.value.replace(/\n$/, '')

      const { lcs, oldStr, newStr } = suggestionDiff(originalStr, suggestionStr)

      const oldStrDiv = {
        type: 'element',
        tagName: 'div',
        // TODO: Fix type
        children: [] as any[],
        properties: {
          className: ['old-string'],
        },
      }

      const newStrDiv = {
        type: 'element',
        tagName: 'div',
        // TODO: Fix type
        children: [] as any[],
        properties: {
          className: ['new-string'],
        },
      }

      for (const [mode, value] of oldStr) {
        const newEl = {
          type: 'element',
          tagName: 'span',
          children: [
            {
              type: 'text',
              value: value,
            },
          ],
          properties: {
            className: [] as string[],
          },
        }

        if (mode === '-') {
          newEl.properties.className.push('del')
        } else if (mode === '+') {
          newEl.properties.className.push('add')
        }

        oldStrDiv.children.push(newEl)
      }

      for (const [mode, value] of newStr) {
        const newEl = {
          type: 'element',
          tagName: 'span',
          children: [
            {
              type: 'text',
              value: value,
            },
          ],
          properties: {
            className: [] as string[],
          },
        }

        if (mode === '-') {
          newEl.properties.className.push('del')
        } else if (mode === '+') {
          newEl.properties.className.push('add')
        }
        newStrDiv.children.push(newEl)
      }

      textNode.value = `- ${options.baseContent} \n + ${textNode.value}`
      node.children[0].children = [oldStrDiv, newStrDiv]

      const headerDiv = {
        type: 'element',
        tagName: 'div',
        // TODO: Fix type
        children: [
          {
            type: 'element',
            tagName: 'span',
            // TODO: Fix type
            children: [
              {
                type: 'text',
                value: 'Suggestion',
              },
            ] as any[],
            properties: {
              className: [],
            },
          },
          {
            type: 'element',
            tagName: 'button',
            // TODO: Fix type
            children: [
              {
                type: 'text',
                value: 'Apply Suggestion',
              },
            ] as any[],
            properties: {
              className: ['apply-suggestion-btn'],
              'data-suggestion': suggestionStr,
            },
          },
        ] as any[],
        properties: {
          className: ['header'],
        },
      }
      node.children.unshift(headerDiv)
    })
  }
}
