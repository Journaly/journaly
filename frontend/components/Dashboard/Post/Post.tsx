import React from 'react'
import Head from 'next/head'
import { sanitize } from '../../../utils'

import {
  Post as PostType,
  UserFragmentFragment as UserType,
  Thread as ThreadType,
  PostStatus,
  useCreateThreadMutation,
  useUpdatePostMutation,
} from '../../../generated/graphql'
import Button, { ButtonVariant } from '../../../elements/Button'
import theme from '../../../theme'
import PostBodyStyles from '../../PostBodyStyles'
import LeaveACommentIcon from '../../Icons/LeaveACommentIcon'
import InlineFeedbackPopover from '../../InlineFeedbackPopover'
import { useTranslation } from '../../../config/i18n'

// TODO: Remove any when Types are fixed with PR #17
interface IPostProps {
  post: PostType | any
  currentUser: UserType | null | undefined
  refetch: any
}

// Elements whose boundaries a comment can cross
const elementWhiteList = new Set(['SPAN', 'EM', 'STRONG'])
let allSelections: number[][] = []

type CommentSelectionButtonProps = {
  position: {
    x: string
    y: string
  }
  display: boolean
  onClick: React.MouseEventHandler
}

const CommentSelectionButton = ({ position, display, onClick }: CommentSelectionButtonProps) => {
  if (!display) {
    return null
  }

  return (
    <button onMouseDown={onClick} className="comment-btn">
      <LeaveACommentIcon primaryColor="white" secondaryColor="white" size={30} />
      <style jsx>{`
        .comment-btn {
          display: block;
          width: 35px;
          height: 35px;
          font-size: 14px;
          line-height: 1;
          background-color: ${theme.colors.gray800};
          border-radius: 5px;
          cursor: pointer;
          position: absolute;
          top: ${position.y};
          left: ${position.x};
          z-index: 10;
          transition: background-color 0.2s ease-in-out;
        }

        .comment-btn:hover {
          background-color: ${theme.colors.blueLight};
        }
      `}</style>
    </button>
  )
}

// Construct highlighted text/selection & replace original selection with highlighted construction
function highlightRange(range: Range, threadId: number): string {
  const selectedText = range.extractContents()
  const commentedTextSpan = document.createElement('span')
  commentedTextSpan.classList.add('thread-highlight')
  commentedTextSpan.dataset.tid = `${threadId}`
  commentedTextSpan.appendChild(selectedText)
  range.insertNode(commentedTextSpan)

  return commentedTextSpan.innerHTML
}

function buildPreOrderList(rootEl: HTMLElement): (HTMLElement | Node)[] {
  const preOrderList: (HTMLElement | Node)[] = []
  const recur = (el: HTMLElement | Node) => {
    preOrderList.push(el)
    el.childNodes.forEach(recur)
  }
  recur(rootEl)
  return preOrderList
}

function buildPostOrderList(el: HTMLElement): (HTMLElement | Node)[] {
  const postOrderList: (HTMLElement | Node)[] = []
  const recur = (el: HTMLElement | Node) => {
    el.childNodes.forEach(recur)
    postOrderList.push(el)
  }
  recur(el)
  return postOrderList
}

// Returns boolean to indicate whether selection is valid for a comment
function isSelectionCommentable(selection: Selection, parentElement: HTMLElement) {
  if (!selection.anchorNode || !selection.focusNode) {
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

function buildPreOrderListAndOffsets(selectableTextArea: HTMLElement) {
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

const Post: React.FC<IPostProps> = ({ post, currentUser, refetch }: IPostProps) => {
  const { t } = useTranslation('post')

  const selectableRef = React.useRef<HTMLDivElement>(null)
  const [displayCommentButton, setDisplayCommentButton] = React.useState(false)
  const [activeThreadId, setActiveThreadId] = React.useState<number>(-1)
  const [commentButtonPosition, setCommentButtonPosition] = React.useState({ x: '0', y: '0' })
  const [popoverPosition, setPopoverPosition] = React.useState({ x: 0, y: 0, w: 0, h: 0 })
  const [createThread] = useCreateThreadMutation({
    onCompleted: ({ createThread }) => {
      if (!createThread) {
        return
      }

      refetch()
      setActiveThreadId(createThread.id)
    },
  })
  const [updatePost] = useUpdatePostMutation({ onCompleted: refetch })

  React.useEffect(() => {
    if (!selectableRef.current) {
      return
    }

    const selectableTextArea = selectableRef.current

    // Clear existing set of highlights so we don't double-apply them
    selectableTextArea.innerHTML = sanitize(post.body)

    // Re-construct all comments from DB
    post.threads.forEach((thread: ThreadType) => {
      const { startIndex, endIndex, id } = thread
      // Rebuild list on every iteration b/c the DOM & the POL change with every new comment
      // Done for simplicity of logic, but can be refactored to update original list if performance becomes an issues
      // Would complicate logic quite a lot.
      const [preOrderList, offsets] = buildPreOrderListAndOffsets(selectableTextArea)

      // Get the index of where the comment starts & ends within the preOrderList
      const startElIndex = offsets.filter((offset) => offset <= startIndex).length - 1
      const endElIndex = offsets.filter((offset) => offset <= endIndex).length - 1

      // Construct the range the comment will occupy
      const range = document.createRange()
      range.setStart(preOrderList[startElIndex], startIndex - offsets[startElIndex])
      range.setEnd(preOrderList[endElIndex], endIndex - offsets[endElIndex])

      highlightRange(range, id)
    })
  }, [selectableRef.current, post.threads.length])

  const sanitizedHTML = sanitize(post.body)

  const createThreadHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const selection = document.getSelection()

    if (selectableRef.current && selection) {
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

      const highlightedContent = highlightRange(firstRange, -1)
      window.getSelection()?.empty()
      setDisplayCommentButton(false)

      createThread({
        variables: {
          postId: post.id,
          startIndex,
          endIndex,
          highlightedContent,
        },
      })
    }
  }

  const selectableTextAreaMouseUp: React.MouseEventHandler = (e) => {
    const x = e.pageX - 40
    const y = e.pageY - 50

    setTimeout(() => {
      // mouseup fires before the selection is created/accessible, so wait
      // for the scheduler to idle before we look at the selection. Event
      // properties are taken off above because the event is freed as soon
      // as event processing ends.
      const selection = window.getSelection()
      if (
        !selection ||
        !selectableRef.current ||
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

  const onMouseDownHandler = () => {
    setDisplayCommentButton(false)
    setActiveThreadId(-1)
  }

  const onThreadClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!e.target) {
      return
    }

    const target = e.target as HTMLElement

    if (!target.classList.contains('thread-highlight') || !target.dataset.tid) {
      return
    }

    setActiveThreadId(parseInt(target.dataset.tid, 10))
    setPopoverPosition({
      x: target.offsetLeft,
      y: target.offsetTop,
      w: target.offsetWidth,
      h: target.offsetHeight,
    })
  }

  const setPostStatus = (status: PostStatus) => () => {
    updatePost({ variables: { postId: post.id, status } })
  }

  const activeThread = post.threads.find((thread: ThreadType) => thread.id === activeThreadId)

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
          {post.status === 'DRAFT' && <div className="draft-badge">{t('draft')}</div>}
        </div>

        <div
          className="post-body selectable-text-area"
          ref={selectableRef}
          onMouseUp={selectableTextAreaMouseUp}
          onMouseDown={onMouseDownHandler}
          onClick={onThreadClick}
        >
          <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
        </div>

        {currentUser && post.author.id === currentUser.id && (
          <div className="post-controls">
            {post.status === 'DRAFT' && (
              <Button
                type="button"
                variant={ButtonVariant.Secondary}
                onClick={setPostStatus(PostStatus.Published)}
              >
                {t('publishDraft')}
              </Button>
            )}
          </div>
        )}
      </div>
      <CommentSelectionButton
        onClick={createThreadHandler}
        position={commentButtonPosition}
        display={displayCommentButton}
      />
      <div id="popover-root" />
      {activeThread && (
        <InlineFeedbackPopover
          thread={activeThread}
          target={popoverPosition}
          onNewComment={refetch}
        />
      )}
      <PostBodyStyles parentClassName="post-body" />
      <style>{`
        .thread-highlight {
          transition: background-color 0.25s;
          background-color: ${theme.colors.highlightColor};
          cursor: pointer;
          border-radius: 3px;
        }
        .thread-highlight:hover {
          background-color: ${theme.colors.highlightColorHover};
        }
      `}</style>
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

        .draft-badge {
          position: absolute;
          top: 10px;
          right: 10px;

          line-height: 1;
          padding: 2px 5px;
          color: white;

          text-transform: uppercase;
          border: 2px solid white;
          border-radius: 4px;
          font-weight: bold;
          font-size: 12px;
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
