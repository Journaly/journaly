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
      console.log(tagName)

      if (tagName !== 'pre') return

      if (!data) {
        data = {}
        node.data = data
      }

      node.properties.className = ['suggestion']
      console.log(node)
      const textNode = node.children[0].children[0]
      const originalStr = options.baseContent
      const suggestionStr = textNode.value

      const { lcs, oldStr, newStr } = suggestionDiff(originalStr, suggestionStr)
      console.log('lcs', lcs)
      // console.log('diff', diff)

      // const oldStrDiv = document.createElement('div')
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

      console.log('oldStr', oldStr)
      console.log('newStr', newStr)
      // oldStrDiv.classList.add('old-string')
      // const newStrDiv = document.createElement('div')
      // newStrDiv.classList.add('new-string')

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

        // console.log(el)
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

      // oldStrDiv.textContent = 'old'
      // newStrDiv.textContent = 'new'

      console.log(oldStrDiv)
      console.log(newStrDiv)

      // node.appendChild(oldStrDiv)
      // node.appendChild(newStrDiv)

      textNode.value = `- ${options.baseContent} \n + ${textNode.value}`
      node.children[0].children = [oldStrDiv, newStrDiv]

      const props: Properties = data.hProperties || (data.hProperties = {})

      // data.hChildren = lowlight.highlight(lang, node.value, {prefix}).children
      data.hChildren = 'foobar'

      props.className = ['suggestion']
      // console.log('node', node)
    })
  }
}
