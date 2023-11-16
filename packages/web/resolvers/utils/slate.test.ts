import { isEmptyParagraph } from './slate'

describe('Slate Utils', () => {
  describe('isEmptyParagraph', () => {
    it('returns true for empty paragraph', () => {
      expect(isEmptyParagraph({ type: 'paragraph', children: [] })).toBe(true)
    })

    it('returns false for piece of text', () => {
      expect(isEmptyParagraph({ type: 'paragraph', children: [{ text: 'Test' }] })).toBe(false)
    })
  })
})
