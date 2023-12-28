/**
 * A simple util function that takes in a string
 * and strips out the HTML tags, along with their contents.
 */

export const stripHTMLTags = (str: string) => {
  return str.replace(/(<([^>]+)>)/gi, '')
}
