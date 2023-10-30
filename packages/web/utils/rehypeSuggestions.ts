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

      const textNode = node.children[0].children[0]
      const originalStr = options.baseContent
      const suggestionStr = textNode.value

      const { lcs, oldStr, newStr } = suggestionDiff(originalStr, suggestionStr)
      // console.log('diff', diff)

      const oldStrDiv = document.createElement('div')
      oldStrDiv.classList.add('old-string')
      const newStrDiv = document.createElement('div')
      newStrDiv.classList.add('new-string')

      for (const el of oldStr) {
        const newEl = oldStrDiv.appendChild(document.createElement('span'))
        newEl.textContent = el[1]
        // console.log(el)
        if (el[0] === ' ') {
          continue
        } else if (el[0] === '-') {
          newEl.classList.add('del')
        } else if (el[0] === '+') {
          newEl.classList.add('add')
        }
      }

      for (const el of newStr) {
        const newEl = newStrDiv.appendChild(document.createElement('span'))
        newEl.textContent = el[1]

        if (el[0] === ' ') {
          continue
        } else if (el[0] === '-') {
          newEl.classList.add('del')
        } else if (el[0] === '+') {
          newEl.classList.add('add')
        }
      }

      // oldStrDiv.textContent = 'old'
      // newStrDiv.textContent = 'new'

      console.log(oldStrDiv)
      console.log(newStrDiv)

      // node.appendChild(oldStrDiv)
      // node.appendChild(newStrDiv)

      textNode.value = `- ${options.baseContent} \n + ${textNode.value}`

      const props: Properties = data.hProperties || (data.hProperties = {})

      // data.hChildren = lowlight.highlight(lang, node.value, {prefix}).children
      data.hChildren = 'foobar'

      props.className = ['suggestion']
      // console.log('node', node)
    })
  }
}
