import { visit } from 'unist-util-visit'
import { Properties } from 'hast'

/**
 * Plugin to enable, disable, and ignore messages.
 *
 * @type {import('unified').Plugin<[Options?]|void[], Root>}
 */
export default function rehypedSuggestions(options: any) {
  console.log('options', options)
  // TODO (this PR): figure this type out
  return (tree: any) => {
    console.log('tree', tree)
    visit(tree, 'element', (node) => {
      console.log('VISITING...')
      let { data, tagName } = node
      console.log(tagName)

      if (tagName !== 'pre') return

      if (!data) {
        data = {}
        node.data = data
      }

      node.properties.className = ['suggestion']

      const props: Properties = data.hProperties || (data.hProperties = {})

      // data.hChildren = lowlight.highlight(lang, node.value, {prefix}).children
      data.hChildren = 'foobar'

      props.className = ['suggestion']
      console.log('node', node)
    })
  }
}
