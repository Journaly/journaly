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

      const oldStrDiv = document.createElement('div')
      const newStrDiv = document.createElement('div')

      oldStrDiv.textContent = 'old'
      newStrDiv.textContent = 'new'

      console.log(oldStrDiv)
      console.log(newStrDiv)

      // node.appendChild(oldStrDiv)
      // node.appendChild(newStrDiv)
      console.log('node', node)
      const textNode = node.children[0].children[0]
      console.log('textNode', textNode)
      const originalStr = options.baseContent
      const suggestionStr = textNode.value

      const diff = suggestionDiff(originalStr, suggestionStr)
      console.log('diff', diff)

      textNode.value = `- ${options.baseContent} \n + ${textNode.value}`

      const props: Properties = data.hProperties || (data.hProperties = {})

      // data.hChildren = lowlight.highlight(lang, node.value, {prefix}).children
      data.hChildren = 'foobar'

      props.className = ['suggestion']
      console.log('node', node)
    })
  }
}
