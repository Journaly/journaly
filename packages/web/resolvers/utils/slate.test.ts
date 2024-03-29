import { isEmptyParagraph, applySuggestion, Doc, findCommonAncestor } from './slate'

const simpleDocument: Doc = [{ type: 'paragraph', children: [{ text: 'The quick brown fox.' }] }]

const highlyStructuredDocument: Doc = [
  {
    type: 'paragraph',
    children: [{ text: 'A' }, { type: 'paragraph', children: [{ text: 'B' }, { text: 'C' }] }],
  },
  {
    type: 'paragraph',
    children: [{ type: 'paragraph', children: [{ text: 'D' }, { text: 'E' }] }, { text: 'F' }],
  },
  { type: 'paragraph', children: [{ text: 'G' }] },
]

describe('Slate Utils', () => {
  describe('isEmptyParagraph', () => {
    it('returns true for empty paragraph', () => {
      expect(isEmptyParagraph({ type: 'paragraph', children: [] })).toBe(true)
    })

    it('returns false for piece of text', () => {
      expect(isEmptyParagraph({ type: 'paragraph', children: [{ text: 'Test' }] })).toBe(false)
    })
  })

  describe('applySuggestion', () => {
    it('applies a simple suggestion', () => {
      expect(
        applySuggestion({
          doc: simpleDocument,
          startIdx: 4,
          endIdx: 9,
          suggestedContent: 'slow',
        }),
      ).toEqual([{ type: 'paragraph', children: [{ text: 'The slow brown fox.' }] }])
    })

    it('applies a suggestion to a highly structured document', () => {
      // 'ABCDEFG' > 'ABCDZZG
      expect(
        applySuggestion({
          doc: highlyStructuredDocument,
          startIdx: 4,
          endIdx: 6,
          suggestedContent: 'ZZ',
        }),
      ).toEqual([
        highlyStructuredDocument[0],
        { type: 'paragraph', children: [{ text: 'DZZ' }] },
        highlyStructuredDocument[2],
      ])
    })
  })

  describe('findCommonAncestor', () => {
    it('finds the common ancestor in a highly structured document', () => {
      expect(findCommonAncestor(highlyStructuredDocument, 4, 6)).toEqual([
        highlyStructuredDocument[1],
        3,
      ])
    })

    it('finds the common ancestor in a highly structured document when common ancestor is full document', () => {
      expect(findCommonAncestor(highlyStructuredDocument, 0, 7)).toEqual([null, 0])
    })
  })
})
