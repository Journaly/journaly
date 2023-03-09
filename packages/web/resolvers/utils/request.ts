import type { NextApiRequest } from 'next'

const readBody = (req: NextApiRequest): Promise<string> => {
  return new Promise((res) => {
    const parts: string[] = []

    req.on('data', (chunk: string) => parts.push(chunk))
    req.on('end', () => res(parts.join('')))
  })
}

export {
  readBody,
}
