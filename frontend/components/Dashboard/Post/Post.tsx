// @ts-nocheck
import React from 'react'
import Head from 'next/head'
import DOMPurify from 'dompurify'

import { Post as PostType } from '../../../generated/graphql'
import { brandBlue, highlightColor, darkGrey } from '../../../utils'
import LeaveACommentIcon from '../../Icons/LeaveACommentIcon'

// TODO: Remove any when Types are fixed with PR #17
interface IPostProps {
  post: PostType | any
}

// Elements whose boundaries a comment can cross
const elementWhiteList = new Set(['SPAN', 'EM', 'STRONG'])
let allSelections = []

const CommentSelectionButton = React.forwardRef(({ position, display, onClick }, ref) => {
  if (!display) {
    return null
  }

  return (
    <button onMouseDown={onClick} className="comment-btn" ref={ref}>
      <LeaveACommentIcon primaryColor="white" secondaryColor="white" size={30} />
      <style jsx>{`
        .comment-btn {
          display: block;
          width: 35px;
          height: 35px;
          font-size: 14px;
          line-height: 1;
          background-color: ${darkGrey};
          border-radius: 5px;
          cursor: pointer;
          position: absolute;
          top: ${position.y};
          left: ${position.x};
          z-index: 10;
          transition: background-color 0.2s ease-in-out;
        }

        .comment-btn:hover {
          background-color: ${brandBlue};
        }
      `}</style>
    </button>
  )
})

// Construct highlighted text/selection & replace original selection with highlighted construction
function highlightRange(range) {
  const selectedText = range.extractContents()
  const commentedTextSpan = document.createElement('span')
  commentedTextSpan.style.backgroundColor = `${highlightColor}`
  commentedTextSpan.appendChild(selectedText)
  range.insertNode(commentedTextSpan)
}

function buildPreOrderList(rootEl: HTMLElement) {
  const preOrderList: (HTMLElement | Node)[] = []
  const recur = (el: HTMLElement | Node) => {
    preOrderList.push(el)
    el.childNodes.forEach(recur)
  }
  recur(rootEl)
  return preOrderList
}

function buildPostOrderList(el: HTMLElement) {
  const postOrderList: (HTMLElement | Node)[] = []
  const recur = (el: HTMLElement | Node) => {
    el.childNodes.forEach(recur)
    postOrderList.push(el)
  }
  recur(el)
  return postOrderList
}

// Returns boolean to indicate whether selection is valid for a comment
function isSelectionCommentable(selection, parentElement: HTMLElement) {
  const nodeList = buildPostOrderList(parentElement)
  // Index of the element that contains the beginning of the selection
  let startIdx = nodeList.indexOf(selection.baseNode)
  // Index of the element that contains the end of the selection
  let endIdx = nodeList.indexOf(selection.extentNode)

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
    } else if (elementWhiteList.has(node.tagName)) {
      continue
    } else {
      // node not in our "whitelist"
      return false
    }
  }
  return true
}

function buildPreOrderListAndOffsets(selectableTextArea) {
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
      currentOffset += node.length
    }
  }

  return [preOrderList, offsets]
}

const Post: React.FC<IPostProps> = ({ post }: IPostProps) => {
  const comments = []

  const selectableRef = React.useRef()
  const commentButtonRef = React.useRef()
  const [displayCommentButton, setDisplayCommentButton] = React.useState(false)
  const [commentButtonPosition, setCommentButtonPosition] = React.useState({ x: 0, y: 0 })

  React.useEffect(() => {
    if (!selectableRef.current || !commentButtonRef.current) {
      return
    }

    const selectableTextArea = selectableRef.current
    const commentSelectionButton = commentButtonRef.current

    // Re-construct all comments from DB
    comments.forEach(([startIdx, endIdx]) => {
      // Rebuild list on every iteration b/c the DOM & the POL change with every new comment
      // Done for simplicity of logic, but can be refactored to update original list if performance becomes an issues
      // Would complicate logic quite a lot.
      const [preOrderList, offsets] = buildPreOrderListAndOffsets(selectableTextArea)

      // Get the index of where the comment starts & ends within the preOrderList
      const startElIdx = offsets.filter((offset) => offset <= startIdx).length - 1
      const endElIdx = offsets.filter((offset) => offset <= endIdx).length - 1

      // Construct the range the comment will occupy
      const range = document.createRange()
      range.setStart(preOrderList[startElIdx], startIdx - offsets[startElIdx])
      range.setEnd(preOrderList[endElIdx], endIdx - offsets[endElIdx])

      highlightRange(range)
    })

    document.addEventListener('mousedown', () => {
      setDisplayCommentButton(false)
    })
  }, [selectableRef.current, commentButtonRef.current])

  const sanitizedHTML = DOMPurify.sanitize(post.body)

  const createComment = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const selection = document.getSelection()

    if (typeof document !== 'undefined') {
      // 🚨 Bad things will happen here if browsers start to support multiple ranges
      const firstRange = selection.getRangeAt(0)

      const [preOrderList, offsets] = buildPreOrderListAndOffsets(selectableRef.current)
      // Find the index of the first Text node in the selection within the preOrderList
      const startElementIdxInPOL = preOrderList.indexOf(firstRange.startContainer)
      const endElementIdxInPOL = preOrderList.indexOf(firstRange.endContainer)
      // Find the index of the start of the selection relative to the start of the selectableTextArea
      const startIndex = offsets[startElementIdxInPOL] + firstRange.startOffset
      const endIndex = offsets[endElementIdxInPOL] + firstRange.endOffset
      // Temporary local state > will be stored in DB
      allSelections.push([startIndex, endIndex])

      highlightRange(firstRange)
      window.getSelection().empty()
      setDisplayCommentButton(false)
    }
    return false
  }

  const selectableTextAreaMouseUp = (e: MouseEvent) => {
    const x = e.pageX - 40
    const y = e.pageY - 50

    setTimeout(() => {
      // mouseup fires before the selection is created/accessible, so wait
      // for the scheduler to idle before we look at the selection. Event
      // properties are taken off above because the event is freed as soon
      // as event processing ends.
      const selection = window.getSelection()
      if (
        !isSelectionCommentable(selection, selectableRef.current) ||
        !selection.toString().trim().length
      ) {
        return
      }

      setDisplayCommentButton(true)
      setCommentButtonPosition({
        x: `${x}px`,
        y: `${y}px`,
      })
    }, 0)
  }

  return (
    <div className="post-container">
      <Head>
        <title>
          {post.author.name} | {post.title}
        </title>
      </Head>
      <div className="post-content">
        <div className="post-header">
          <img src="/images/samples/sample-post-img.jpg" alt={post.title} />
          <h1>{post.title}</h1>
        </div>
        <div
          className="post-body selectable-text-area"
          ref={selectableRef}
          onMouseUp={selectableTextAreaMouseUp}
        >
          <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
        </div>
      </div>
      <CommentSelectionButton
        onClick={createComment}
        position={commentButtonPosition}
        display={displayCommentButton}
        ref={commentButtonRef}
      />
      <style jsx>{`
        .post-container {
          max-width: 1200px;
          margin: 2rem auto;
          box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
        }

        .post-content {
          display: grid;
          grid-column-gap: 10px;
          grid-template-columns: 80px 1fr 80px;
          grid-auto-rows: 350px 1fr;
        }
        .post-content > * {
          grid-column: 2;
          /* Helps to avoid horizontal scroll for this layout */
          min-width: 0;
        }

        .post-header {
          position: relative;
          grid-column: 1 / -1;
          text-align: center;
          color: white;
          margin-bottom: 40px;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: brightness(0.3);
        }

        h1 {
          position: absolute;
          font-size: 64px;
          line-height: 1.2;
          text-align: center;
          color: white;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          margin: 0;
        }

        h2 {
          margin: 20px 0;
        }

        .post-body {
          margin-bottom: 50px;
        }

        .post-body p {
          margin: 20px 0;
        }
      `}</style>
    </div>
  )
}

export default Post
