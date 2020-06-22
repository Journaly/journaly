// TODO: enhance accuracy by taking into account HTML tags (only look at text and disregard HTML)
export const readTime = (text: string): number => {
  const numWords = text.split(' ').length

  return Math.round(numWords / 200)
}
