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

const elementWhiteList = new Set(['SPAN', 'EM', 'STRONG'])
let allSelections = []

const CommentSelectionButton = React.forwardRef(({ selectableRef }, ref) => (
  <button
    onMouseDown={(e) => handleCommentClick(selectableRef.current, ref.current)(e)}
    className="comment-btn"
    ref={ref}
  >
    <LeaveACommentIcon primaryColor="white" secondaryColor="white" size={30} />
    <style jsx>{`
      .comment-btn {
        width: 35px;
        height: 35px;
        font-size: 14px;
        line-height: 1;
        background-color: ${darkGrey};
        border-radius: 5px;
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        display: none;
        transition: background-color 0.2s ease-in-out;
      }

      .comment-btn:hover {
        background-color: ${brandBlue};
      }
    `}</style>
  </button>
))

function buildPreOrderList(el: HTMLElement) {
  const postOrderList: (HTMLElement | Node)[] = []
  const recur = (el: HTMLElement | Node) => {
    postOrderList.push(el)
    el.childNodes.forEach(recur)
  }
  recur(el)
  return postOrderList
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

function processSelectedTextArea(selection, parentElement: HTMLElement) {
  const nodeList = buildPostOrderList(parentElement)
  let startIdx = nodeList.indexOf(selection.baseNode)
  let endIdx = nodeList.indexOf(selection.extentNode)

  if (startIdx > endIdx) {
    ;[startIdx, endIdx] = [endIdx, startIdx]
  }

  const selectedNodes = nodeList.slice(startIdx, endIdx + 1)

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

const selectableTextAreaMouseUp = (selectableTextArea, commentSelectionButton) => (
  e: MouseEvent,
) => {
  setTimeout(() => {
    const selection = window.getSelection()
    if (processSelectedTextArea(selection, selectableTextArea) === false) {
      return
    }

    const selectedText = selection.toString().trim()
    if (selectedText.length) {
      const x = e.pageX
      const y = e.pageY
      commentSelectionButton.style.left = `${x - 40}px`
      commentSelectionButton.style.top = `${y - 50}px`
      commentSelectionButton.style.display = 'block'
    }
  }, 0)
}

const documentMouseDown = (commentSelectionButton) => () => {
  if (getComputedStyle(commentSelectionButton).display === 'block') {
    commentSelectionButton.style.display = 'none'
  }
}

const handleCommentClick = (selectableTextArea, commentSelectionButton) => (e) => {
  const selection = document.getSelection()
  e.preventDefault()
  e.stopPropagation()
  if (typeof document !== 'undefined') {
    if (selection.isCollapsed === true) {
      return
    }
    const firstRange = selection.getRangeAt(0)

    const pol = buildPreOrderList(selectableTextArea)
    const offsets = new Array(pol.length)

    let curOffset = 0
    for (let i = 0; i < pol.length; i++) {
      const node = pol[i]
      offsets[i] = curOffset

      if (node.constructor === Text) {
        curOffset += node.length
      }
    }

    const startElementIdxInPOL = pol.indexOf(firstRange.startContainer)
    const endElementIdxInPOL = pol.indexOf(firstRange.endContainer)
    const startIndex = offsets[startElementIdxInPOL] + firstRange.startOffset
    const endIndex = offsets[endElementIdxInPOL] + firstRange.endOffset
    allSelections.push([startIndex, endIndex])

    const selectedText = firstRange.extractContents()
    const commentedTextSpan = document.createElement('span')
    commentedTextSpan.style.backgroundColor = `${highlightColor}`
    commentedTextSpan.appendChild(selectedText)
    firstRange.insertNode(commentedTextSpan)
    commentSelectionButton.style.display = 'none'
    window.getSelection().empty()
  }
  return false
}

const Post: React.FC<IPostProps> = ({ post }: IPostProps) => {
  const comments = []

  const selectableRef = React.useRef()
  const commentButtonRef = React.useRef()

  React.useEffect(() => {
    if (!selectableRef.current || !commentButtonRef.current) {
      return
    }

    //selectableTextArea = document.querySelector('.selectable-text-area') as HTMLElement
    const selectableTextArea = selectableRef.current
    const commentSelectionButton = commentButtonRef.current

    comments.forEach(([startIdx, endIdx]) => {
      const pol = buildPreOrderList(selectableTextArea)
      const offsets = new Array(pol.length)

      let curOffset = 0
      for (let i = 0; i < pol.length; i++) {
        const node = pol[i]
        offsets[i] = curOffset

        if (node.constructor === Text) {
          curOffset += node.length
        }
      }

      const startElIdx = offsets.filter((offset) => offset <= startIdx).length - 1
      const endElIdx = offsets.filter((offset) => offset <= endIdx).length - 1

      const range = document.createRange()
      range.setStart(pol[startElIdx], startIdx - offsets[startElIdx])
      range.setEnd(pol[endElIdx], endIdx - offsets[endElIdx])

      const selectedText = range.extractContents()
      const commentedTextSpan = document.createElement('span')
      commentedTextSpan.style.backgroundColor = `${highlightColor}`
      commentedTextSpan.appendChild(selectedText)
      range.insertNode(commentedTextSpan)
    })

    selectableTextArea.addEventListener(
      'mouseup',
      selectableTextAreaMouseUp(selectableTextArea, commentSelectionButton),
    )
    document.addEventListener('mousedown', documentMouseDown(commentSelectionButton))
  }, [selectableRef.current, commentButtonRef.current])

  const sanitizedHTML = DOMPurify.sanitize(post.body)

  return (
    <div className="post-container">
      <Head>
        <title>
          {post.author.name} | {post.title}
        </title>
      </Head>
      <div className="post-content">
        <div className="post-header">
          // TODO (robin-macpherson): update when Post Type updated w/ PR#17
          <img src="/images/samples/sample-post-img.jpg" alt={post.title} />
          <h1>{post.title}</h1>
        </div>
        <div className="post-body selectable-text-area" ref={selectableRef}>
          <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
        </div>
      </div>
      <CommentSelectionButton selectableRef={selectableRef} ref={commentButtonRef} />
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
