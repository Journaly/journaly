import { PostClapFragmentFragment as PostClapType } from '@/generated/graphql'
import { useTranslation } from '@/config/i18n'
import { isChildOf } from '@/utils'

// Elements whose boundaries a comment can cross
const elementWhiteList = new Set(['SPAN', 'EM', 'U', 'STRONG'])

/**
 * Get an element’s position relative to the document
 * @see https://stackoverflow.com/a/26230989/3610495
 */
export const getCoords = (htmlElement: HTMLElement) => {
  const box = htmlElement.getBoundingClientRect()

  const body = document.body
  const docEl = document.documentElement

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft

  const clientTop = docEl.clientTop || body.clientTop || 0
  const clientLeft = docEl.clientLeft || body.clientLeft || 0

  const top = box.top + scrollTop - clientTop
  const left = box.left + scrollLeft - clientLeft

  return { y: Math.round(top), x: Math.round(left) }
}

/**
 * Generate the text to show for claps on a specific post.
 *
 * @param claps The array of PostClap objects containing their author
 * @param currentUserId The id of the current user
 * @returns string The text to show
 */
export const getUsersClappedText = (
  claps: Array<PostClapType>,
  currentUserId: number | undefined,
) => {
  const { t } = useTranslation('post')

  const containsCurrentUser = claps.some((clap) => clap.author.id === currentUserId)

  let usersClapped = claps
    .filter((clap) => clap.author.id !== currentUserId)
    .map((clap) => (clap.author.name ? clap.author.name : clap.author.handle))

  if (containsCurrentUser) {
    usersClapped = [t('claps.currentUserPronoun'), ...usersClapped]
  }

  if (usersClapped.length == 0) {
    return t('claps.noUsersClapped')
  } else if (usersClapped.length == 1) {
    return t('claps.oneUserClapped', { name1: usersClapped[0] })
  } else if (usersClapped.length == 2) {
    return t('claps.twoUsersClapped', {
      name1: usersClapped[0],
      name2: usersClapped[1],
    })
  } /* usersClapped.length > 2 */ else {
    const numOthersClapped = usersClapped.length - 2
    return t('claps.manyUsersClapped', {
      name1: usersClapped[0],
      name2: usersClapped[1],
      numOthers: numOthersClapped,
    })
  }
}

// Construct highlighted text/selection & replace original selection with highlighted construction
export function highlightRange(range: Range, threadId: number): string {
  const selectedText = range.extractContents()
  const commentedTextSpan = document.createElement('span')
  commentedTextSpan.classList.add('thread-highlight')
  commentedTextSpan.dataset.tid = `${threadId}`
  commentedTextSpan.appendChild(selectedText)
  range.insertNode(commentedTextSpan)

  return commentedTextSpan.innerText
}

export function buildPreOrderList(rootEl: HTMLElement): (HTMLElement | Node)[] {
  const preOrderList: (HTMLElement | Node)[] = []
  const recur = (el: HTMLElement | Node) => {
    preOrderList.push(el)
    el.childNodes.forEach(recur)
  }
  recur(rootEl)
  return preOrderList
}

export function buildPostOrderList(el: HTMLElement): (HTMLElement | Node)[] {
  const postOrderList: (HTMLElement | Node)[] = []
  const recur = (el: HTMLElement | Node) => {
    el.childNodes.forEach(recur)
    postOrderList.push(el)
  }
  recur(el)
  return postOrderList
}

// Returns boolean to indicate whether selection is valid for a comment
export function isSelectionCommentable(selection: Selection, parentElement: HTMLElement) {
  if (
    !selection.anchorNode ||
    !selection.focusNode ||
    selection.isCollapsed ||
    !selection.toString().trim().length ||
    !isChildOf(selection.anchorNode, parentElement) ||
    !isChildOf(selection.focusNode, parentElement)
  ) {
    return false
  }

  const nodeList = buildPostOrderList(parentElement)
  // Index of the element that contains the beginning of the selection
  let startIdx = nodeList.indexOf(selection.anchorNode)
  // Index of the element that contains the end of the selection
  let endIdx = nodeList.indexOf(selection.focusNode)

  // Make sure it's not a backwards selection
  // If so, reverse it.
  if (startIdx > endIdx) {
    ;[startIdx, endIdx] = [endIdx, startIdx]
  }

  // The nodes that the selection crosses boundaries of
  const selectedNodes = nodeList.slice(startIdx, endIdx + 1)

  // Check none of the nodes crossed by the selection
  // are not Text nodes or outisde of the whitelist
  for (const node of selectedNodes) {
    if (node.constructor === Text) {
      continue
    } else if (elementWhiteList.has((node as HTMLElement).tagName)) {
      continue
    } else {
      // node not in our "whitelist"
      return false
    }
  }
  return true
}

export function buildPreOrderListAndOffsets(selectableTextArea: HTMLElement) {
  // a list of every element in the selectableTextArea
  const preOrderList = buildPreOrderList(selectableTextArea)
  // a list of integers which are the offsets of the preOrderList elements
  // this method of creating the Array is more efficient than using Array.push
  const offsets = new Array(preOrderList.length)

  // Offset of the sum of the length of all the Text Nodes that appear
  // before the current element in the document
  let currentOffset = 0
  for (let i = 0; i < preOrderList.length; i++) {
    const node = preOrderList[i]
    offsets[i] = currentOffset

    if (node.constructor === Text) {
      currentOffset += (node as Text).length
    }
  }

  return [preOrderList, offsets]
}
