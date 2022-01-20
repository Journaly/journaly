import { inputObjectType } from 'nexus'

// Input type modeling the FE editor data structure. Not the best typing as this
// is concepturally the untion of two types, internal nodes and leaf nodes, but
// AFAIK GQL does not have a native union type, so we simply unify all the fields
// and make them all nullable.
export const EditorNode = inputObjectType({
  name: 'EditorNode',
  definition(t) {
    t.string('type')
    t.string('text')
    t.boolean('italic')
    t.boolean('bold')
    t.boolean('underline')
    t.boolean('uploaded')
    t.string('link')
    t.string('url')
    t.boolean('hyperlink')
    t.list.field('children', {
      type: EditorNode,
    })
  },
})

export const HeadlineImageInput = inputObjectType({
  name: 'HeadlineImageInput',
  definition(t) {
    t.nonNull.string('smallSize')
    t.nonNull.string('largeSize')
  },
})

export default [EditorNode, HeadlineImageInput]
