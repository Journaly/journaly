import { inputObjectType } from '@nexus/schema'

// Input type modeling the FE editor data structure. Not the best typing as this
// is concepturally the untion of two types, internal nodes and leaf nodes, but
// AFAIK GQL does not have a native union type, so we simply unify all the fields
// and make them all nullable.
export const EditorNode = inputObjectType({
  name: 'EditorNode',
  definition(t) {
    t.string('type', { nullable: true })
    t.string('text', { nullable: true })
    t.boolean('italic', { nullable: true })
    t.boolean('bold', { nullable: true })
    t.boolean('underline', { nullable: true })
    t.field('children', {
      type: EditorNode,
      list: true,
      nullable: false,
    })
  },
})

export const ImageInput = inputObjectType({
  name: 'ImageInput',
  definition(t) {
    t.string('smallSize', { nullable: false })
    t.string('largeSize', { nullable: false })
    t.field('imageRole', { type: 'ImageRole', nullable: false })
  },
})

export default [
  EditorNode,
  ImageInput,
]
