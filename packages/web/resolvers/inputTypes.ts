import { inputObjectType } from 'nexus'

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
    t.boolean('uploaded', { nullable: true })
    t.string('link', { nullable: true })
    t.string('url', { nullable: true })
    t.boolean('hyperlink', { nullable: true })
    t.int('size', { nullable: true })
    t.field('colSizes', {
      type: 'Int',
      list: true,
      nullable: true,
    })
    t.field('children', {
      type: EditorNode,
      list: true,
      nullable: true,
    })
  },
})

export const HeadlineImageInput = inputObjectType({
  name: 'HeadlineImageInput',
  definition(t) {
    t.string('smallSize', { nullable: false })
    t.string('largeSize', { nullable: false })
    t.string('unsplashPhotographer', { nullable: true })
  },
})

export default [EditorNode, HeadlineImageInput]
