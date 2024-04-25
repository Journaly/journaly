import { Thread } from '@prisma/client'
import {
  isEmptyParagraph,
  applySuggestion,
  extractText,
  Doc,
  findCommonAncestor,
  updatedThreadPositions,
} from './slate'

type Chunks = [number, string][]

const insertChunk = (chunks: Chunks, insertedContent: string, position: number): Chunks => {
  // [[0, "I "]. [2, "am"], [4, " the goat"]]
  for (let i = 0; i < chunks.length; i++) {
    const [start, content] = chunks[i]
    if (start >= 0 && position >= start && position < start + content.length) {
      const left = content.substring(0, position - start)
      const right = content.substring(position - start)

      // -1 represents inserted content that doesn't affect the indices.
      return [
        ...chunks.slice(0, i),
        [start, left],
        [-1, insertedContent],
        [start + left.length, right],
        ...chunks.slice(i + 1),
      ]
    }
  }

  throw new Error('We did not find a place to insert anything.')
}

const serializeThreads = (threads: Thread[], document: Doc) => {
  // Use [] to indicate where thread boundaries fall.
  const serializedDoc = extractText(document)
  // An array of tuples, with each tuple representing a chunk of text and its original index.
  // The text will be "split" at the index of each thread so we can insert text
  // while tracking the original index of each chunk.

  //  0123456789
  // "I am the goat"
  //  0123456789
  // "I [am] the goat"

  // We want to keep track of the original indices before the matching "fence posts" were inserted.
  let chunks: [number, string][] = [[0, serializedDoc]]
  for (const thread of threads) {
    chunks = insertChunk(chunks, '[', thread.startIndex)
    chunks = insertChunk(chunks, ']', thread.endIndex)
  }
  return chunks.map((chunk) => chunk[1]).join('')
}
// TODO NEXT TIME: write test case for ...
// take in expected val, doc, threads, then call serialize thing on doc + threads, then just assert result = expexted val

describe('Serialize threads', () => {
  it('Should handle a single thread', () => {
    const threads: Thread[] = [
      {
        startIndex: 2,
        endIndex: 4,
      } as Thread,
    ]
    const doc: Doc = [
      {
        text: 'I am the goat',
      },
    ]
    expect(serializeThreads(threads, doc)).toBe('I [am] the goat')
  })
})

const simpleDocument: Doc = [{ type: 'paragraph', children: [{ text: 'The quick brown fox.' }] }]

const cinemaDocument: Doc = [{ type: 'paragraph', children: [{ text: 'I am at the cinema' }] }]
const cinemaDocument2: Doc = [{ type: 'paragraph', children: [{ text: "I'm the cinema" }] }]
const fragmentedDelectionDocument: Doc = [
  { type: 'paragraph', children: [{ text: "That's is cool" }] },
]

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

  // NOTE: This test passes but is not the ideal behavior.
  // Current idea (3/21/24) is to bias the diff towards continuous deletions vs. fragmented ones
  // Current challenge is to think of a case where this would NOT be desired
  describe('updateThreadPositions', () => {
    it('handles short deletions with common char', () => {
      const threads = [
        {
          id: 42,
          startIndex: 5,
          endIndex: 7,
        },
      ] as Thread[]

      expect(serializeThreads(threads, cinemaDocument)).toEqual('I am [at] the cinema')

      const updatedCinemaDocument: Doc = [
        { type: 'paragraph', children: [{ text: 'I am the cinema' }] },
      ]

      const updatedThreads = updatedThreadPositions(cinemaDocument, updatedCinemaDocument, threads)

      expect(serializeThreads(updatedThreads, updatedCinemaDocument)).toEqual('I am [t]he cinema')
    })
  })
})
