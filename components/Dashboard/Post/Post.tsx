import React from 'react'
import Head from 'next/head'
import { toast } from 'react-toastify'

import { sanitize } from '@utils'
import {
  PostFragmentFragment as PostType,
  UserFragmentFragment as UserType,
  ThreadFragmentFragment as ThreadType,
  PostStatus,
  useCreateThreadMutation,
  useUpdatePostMutation,
  Image as ImageType,
  ImageRole,
} from '@generated'
import { Router, useTranslation } from '@config/i18n'
import Button, { ButtonVariant } from '@elements/Button'
import PostHeader from '@components/PostHeader'
import PencilIcon from '@components/Icons/PencilIcon'
import PostBodyStyles from '@components/PostBodyStyles'
import InlineFeedbackPopover from '@components/InlineFeedbackPopover'
import theme from '@theme'

interface IPostProps {
  post: PostType
  currentUser: UserType | null | undefined
  refetch: any
}

// Elements whose boundaries a comment can cross
const elementWhiteList = new Set(['SPAN', 'EM', 'STRONG'])

type CommentSelectionButtonProps = {
  position: {
    x: string
    y: string
  }
  display: boolean
  onClick: React.MouseEventHandler
}

const CommentSelectionButton = ({ position, display, onClick }: CommentSelectionButtonProps) => {
  return (
    <button onMouseDown={onClick} className="comment-btn">
      <PencilIcon size={24} className="edit-icon" />
      <style jsx>{`
        .comment-btn {
          display: ${display ? 'flex' : 'none'};
          align-items: center;
          justify-content: center;
          padding: 0 0 2px 2px;
          width: 35px;
          height: 35px;
          font-size: 14px;
          line-height: 1;
          background-color: ${theme.colors.charcoal};
          border-radius: 5px;
          cursor: pointer;
          position: absolute;
          top: ${position.y};
          left: ${position.x};
          z-index: 10;
          transition: background-color 0.2s ease-in-out;
        }

        .comment-btn:hover :global(#g-stroke) {
          stroke: ${theme.colors.blueLight};
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

function isChildOf(el: Node, target: HTMLElement) {
  let current = el
  while (current.parentElement) {
    if (current.parentElement === target) {
      return true
    }

    current = current.parentElement
  }

  return false
}

type PostContentProps = {
  body: string
}

const PostContent = React.memo(
  React.forwardRef<HTMLDivElement, PostContentProps>(({ body }, ref) => {
    // Break this into a memoizable component so we don't have to re-sanitize
    // and re-render so much
    const sanitizedHTML = sanitize(body)

    return <div ref={ref} dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
  }),
)

const Post: React.FC<IPostProps> = ({ post, currentUser, refetch }: IPostProps) => {
  const { t } = useTranslation('post')

  const selectableRef = React.useRef<HTMLDivElement>(null)
  const popoverRef = React.useRef<HTMLDivElement>(null)
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
  const [updatePost] = useUpdatePostMutation({
    onCompleted: () => {
      refetch()
      toast.success(t('draftPublishedSuccess'))
    },
  })

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
      const endElIndex = offsets.filter((offset) => offset < endIndex).length - 1

      // Construct the range the comment will occupy
      try {
        const range = document.createRange()
        range.setStart(preOrderList[startElIndex], startIndex - offsets[startElIndex])
        range.setEnd(preOrderList[endElIndex], endIndex - offsets[endElIndex])
        highlightRange(range, id)
      } catch (e) {
        console.warn('Error attempting to highlight area for a thread. Error:', e)
        return
      }
    })
  }, [post.threads.length])

  React.useEffect(() => {
    const onSelectionChange = () => {
      const selection = window.getSelection()

      if (
        !selection ||
        !selection.rangeCount ||
        !selectableRef.current ||
        !isSelectionCommentable(selection, selectableRef.current)
      ) {
        setDisplayCommentButton(false)
        return
      }

      const selectionDims = selection.getRangeAt(0).getBoundingClientRect()
      const x = selectionDims.x + selectionDims.width / 2 + window.scrollX
      const y = selectionDims.y - selectionDims.height - 20 + window.scrollY

      setDisplayCommentButton(true)
      setCommentButtonPosition({
        x: `${x}px`,
        y: `${y}px`,
      })
    }

    const onDocumentMouseDown = (e: MouseEvent) => {
      if (!e.target || !popoverRef.current || isChildOf(e.target as Node, popoverRef.current)) {
        return
      }

      setActiveThreadId(-1)
    }

    document.addEventListener('selectionchange', onSelectionChange)
    document.addEventListener('mousedown', onDocumentMouseDown)

    return () => {
      document.removeEventListener('selectionchange', onSelectionChange)
      document.removeEventListener('mousedown', onDocumentMouseDown)
    }
  }, [selectableRef.current])

  const createThreadHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const selection = document.getSelection()

    if (selectableRef.current && selection) {
      // 🚨 Bad things will happen here if browsers start to support multiple ranges
      const firstRange = selection.getRangeAt(0)
      const selectionDims = firstRange.getBoundingClientRect()

      const [preOrderList, offsets] = buildPreOrderListAndOffsets(selectableRef.current)
      // Find the index of the first Text node in the selection within the preOrderList
      const startElementIdxInPOL = preOrderList.indexOf(firstRange.startContainer)
      const endElementIdxInPOL = preOrderList.indexOf(firstRange.endContainer)
      // Find the index of the start of the selection relative to the start of the selectableTextArea
      const startIndex = offsets[startElementIdxInPOL] + firstRange.startOffset
      const endIndex = offsets[endElementIdxInPOL] + firstRange.endOffset

      const highlightedContent = highlightRange(firstRange, -1)

      window.getSelection()?.empty()
      setDisplayCommentButton(false)
      setPopoverPosition({
        x: selectionDims.x + window.scrollX,
        y: selectionDims.y + window.scrollY,
        w: selectionDims.width,
        h: selectionDims.height,
      })

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
          {post.author.handle} | {post.title}
        </title>
      </Head>
      <div className="post-content">
        <PostHeader
          postTitle={post.title}
          postStatus={post.status}
          publishDate={post.publishedAt ? post.publishedAt : post.createdAt}
          authorName={post.author.handle}
          postImage={
            (post.images || []).find((i: ImageType) => i.imageRole === ImageRole.Headline)
              ?.largeSize || '/images/samples/sample-post-img.jpg'
          }
        />
        <div className="post-body selectable-text-area" dir="auto" onClick={onThreadClick}>
          <PostContent body={post.body} ref={selectableRef} />
        </div>

        {currentUser && post.author.id === currentUser.id && (
          <div className="post-controls">
            {post.status === 'DRAFT' && (
              <>
                <Button
                  type="button"
                  variant={ButtonVariant.Secondary}
                  onClick={() => {
                    Router.push(`/post/${post.id}/edit`)
                  }}
                >
                  {t('editPostAction')}
                </Button>
                <Button
                  type="button"
                  variant={ButtonVariant.Secondary}
                  onClick={setPostStatus(PostStatus.Published)}
                >
                  {t('publishDraft')}
                </Button>
              </>
            )}
          </div>
        )}
      </div>
      <CommentSelectionButton
        onClick={createThreadHandler}
        position={commentButtonPosition}
        display={displayCommentButton && !!currentUser}
      />
      {activeThread && (
        <InlineFeedbackPopover
          thread={activeThread}
          target={popoverPosition}
          currentUser={currentUser}
          onNewComment={refetch}
          onUpdateComment={refetch}
          onDeleteThread={refetch}
          ref={popoverRef}
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
          grid-template-columns: 10px 1fr 10px;
          grid-auto-rows: 350px 1fr;
          background-color: ${theme.colors.white};
        }

        @media (min-width: ${theme.breakpoints.SM}) {
          .post-content {
            grid-template-columns: 25px 1fr 25px;
          }
        }

        @media (min-width: ${theme.breakpoints.MD}) {
          .post-content {
            grid-template-columns: 50px 1fr 50px;
          }
        }

        @media (min-width: ${theme.breakpoints.LG}) {
          .post-content {
            grid-template-columns: 80px 1fr 80px;
          }
        }

        .post-body {
          grid-column: 2;
          /* Helps to avoid horizontal scroll for this layout */
          min-width: 0;
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

        .post-controls {
          grid-column: 2;
          align-self: end;
          justify-self: end;
          margin-bottom: 20px;

          display: flex;
        }

        .post-controls > :global(button) {
          margin-left: 5px;
        }
      `}</style>
    </div>
  )
}

export default Post
