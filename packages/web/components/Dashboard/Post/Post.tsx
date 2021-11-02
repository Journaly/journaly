import React, { useState, memo, useMemo, useRef, forwardRef, useEffect } from 'react'
import Head from 'next/head'
import { toast } from 'react-toastify'
import { makeReference } from '@apollo/client'

import { findEventTargetParent, sanitize, iOS, wait } from '@/utils'
import {
  PostStatus,
  useCreateThreadMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  Post as PostModel,
  useCreatePostClapMutation,
  useDeletePostClapMutation,
  PostClap,
  useBumpPostMutation,
  UserRole,
  useSavePostMutation,
  useUnsavePostMutation,
} from '@/generated/graphql'
import Button, { ButtonVariant } from '@/components/Button'
import theme from '@/theme'
import PostBodyStyles from '@/components/PostBodyStyles'
import InlineFeedbackPopover from '@/components/InlineFeedbackPopover'
import { Router, useTranslation } from '@/config/i18n'
import PostHeader from '@/components/PostHeader'
import ConfirmationModal from '@/components/Modals/ConfirmationModal'
import PremiumFeatureModal from '@/components/Modals/PremiumFeatureModal'
import CommentSelectionButton from './CommentSelectionButton'

import {
  getCoords,
  getUsersClappedText,
  highlightRange,
  isSelectionCommentable,
  buildPreOrderListAndOffsets,
  isChildOf,
} from './helpers'
import ClapIcon from '@/components/Icons/ClapIcon'
import { generateNegativeRandomNumber } from '@/utils/number'
import { POST_BUMP_LIMIT } from '../../../constants'
import { SelectionState, PostProps, PostContentProps, ThreadType } from './types'
import BookmarkIcon from '@/components/Icons/BookmarkIcon'
import UserListModal from '@/components/Modals/UserListModal'

const selectionState: SelectionState = {
  bouncing: false,
  lastTimeout: null,
}

const queueSelectionBounce = () => {
  selectionState.bouncing = true

  if (selectionState.lastTimeout) {
    window.clearTimeout(selectionState.lastTimeout)
  }

  selectionState.lastTimeout = window.setTimeout(bounceSelection, 500)
}

const bounceSelection = async () => {
  const selection = window.getSelection()

  if (!selection || !selection.rangeCount) return

  const range = selection.getRangeAt(0)

  await wait(1)
  selection.empty()

  await wait(1)
  selection.addRange(range)

  await wait(10)
  selectionState.bouncing = false
}

const PostContent = memo(
  forwardRef<HTMLDivElement, PostContentProps>(({ body }, ref) => {
    // Break this into a memoizable component so we don't have to re-sanitize
    // and re-render so much
    const sanitizedHTML = sanitize(body)

    return <div ref={ref} dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
  }),
)

const Post = ({ post, currentUser, refetch }: PostProps) => {
  const { t } = useTranslation('post')

  const selectableRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const [displayCommentButton, setDisplayCommentButton] = useState(false)
  const [activeThreadId, setActiveThreadId] = useState<number>(-1)
  const [commentButtonPosition, setCommentButtonPosition] = useState({ x: '0', y: '0' })
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0, w: 0, h: 0 })
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false)
  const [displayPremiumFeatureModal, setDisplayPremiumFeatureModal] = useState(false)
  const [displayUserListModal, setDisplayUserListModal] = useState(false)
  const [premiumFeatureModalExplanation, setPremiumFeatureModalExplanation] = useState()
  const isAuthoredPost = currentUser && post.author.id === currentUser.id
  const isPremiumFeatureEligible =
    currentUser?.membershipSubscription?.isActive ||
    currentUser?.userRole === UserRole.Admin ||
    currentUser?.userRole === UserRole.Moderator
  const canAttemptBump = isPremiumFeatureEligible && post.status === 'PUBLISHED'

  const usersWhoClapped = post.claps.map((clap) => clap.author)

  const hasSavedPost = useMemo(() => {
    return currentUser?.savedPosts.find((savedPost) => savedPost.id === post.id) !== undefined
  }, [currentUser?.id, currentUser?.savedPosts])

  const [savePost, { loading: savingPost }] = useSavePostMutation({
    onCompleted: () => {
      refetch()
      toast.success(t('savePostSuccess'))
    },
    onError: () => {
      toast.error(t('savePostError'))
    },
    update(cache) {
      cache.modify({
        id: cache.identify(makeReference('ROOT_QUERY')),
        fields: {
          posts: () => {
            // This simply invalidates the cache for the `posts` query
            return undefined
          },
        },
      })
    },
  })

  const handleSavePost = () => {
    if (!isPremiumFeatureEligible) {
      setPremiumFeatureModalExplanation(t('savePostPremiumFeatureExplanation'))
      setDisplayPremiumFeatureModal(true)
    } else {
      savePost({ variables: { postId: post.id } })
    }
  }

  const [unsavePost, { loading: unsavingPost }] = useUnsavePostMutation({
    onCompleted: () => {
      refetch()
      toast.success(t('unsavePostSuccess'))
    },
    onError: () => {
      toast.error(t('unsavePostError'))
    },
    update: (cache, { data }) => {
      const unsavedPost = data?.unsavePost
      if (unsavedPost?.id && unsavedPost.__typename) {
        cache.modify({
          fields: {
            savedPosts(existingPosts = []): PostModel[] {
              return existingPosts.filter(
                (post: any) => post.__ref !== `${unsavedPost.__typename}:${unsavedPost.id}`,
              )
            },
          },
        })
      }
    },
  })

  const [deletePost] = useDeletePostMutation({
    onCompleted: () => {
      toast.success(t('deletePostSuccess'))
      Router.push('/dashboard/my-posts')
    },
    onError: () => {
      toast.error(t('deletePostError'))
    },
    update: (cache, { data }) => {
      const dp = data?.deletePost
      if (dp?.id && dp?.__typename) {
        cache.modify({
          fields: {
            posts(existingPosts = []): PostModel[] {
              return existingPosts.filter((p: any) => p.__ref !== `${dp.__typename}:${dp.id}`)
            },
          },
        })
      }
    },
  })
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

  const [createPostClap, createPostClapResult] = useCreatePostClapMutation({
    update(cache, { data }) {
      if (data?.createPostClap) {
        cache.modify({
          id: `${post.__typename}:${post.id}`,
          fields: {
            claps: (existingClaps: PostClap[] = []) => {
              return [...existingClaps, data.createPostClap]
            },
          },
        })
      }
    },
    onError: (error) => toast.error(error),
  })

  const createNewPostClap = () => {
    createPostClap({
      variables: { postId: post.id },
      optimisticResponse: {
        __typename: 'Mutation',
        createPostClap: {
          __typename: 'PostClap',
          id: generateNegativeRandomNumber(),
          author: {
            __typename: 'User',
            handle: currentUser!.handle,
            name: currentUser!.name,
            profileImage: currentUser!.profileImage,
            id: currentUser!.id,
          },
        },
      },
    })
  }

  const [deletePostClap, deletePostClapResult] = useDeletePostClapMutation({
    update(cache, { data }) {
      if (data?.deletePostClap) {
        cache.modify({
          id: `${post.__typename}:${post.id}`,
          fields: {
            claps: (existingClaps: PostClap[] = []) => {
              return existingClaps.filter(
                (existingClap) => data.deletePostClap.id !== existingClap.id,
              )
            },
          },
        })
        cache.evict({ id: `${data.deletePostClap.__typename}:${data.deletePostClap.id}` })
      }
    },
    onError: (error) => toast.error(error),
  })

  const deleteExistingPostClap = () => {
    const currentPostClap = post.claps.find((clap) => clap.author.id === currentUser?.id)
    if (currentPostClap) {
      deletePostClap({
        variables: {
          postClapId: currentPostClap.id,
        },
      })
    }
  }

  const isLoadingPostClap = createPostClapResult.loading || deletePostClapResult.loading

  const hasClappedPost = useMemo(() => {
    return post.claps.find((clap) => clap.author.id === currentUser?.id) !== undefined
  }, [post.claps, currentUser?.id])

  useEffect(() => {
    if (!selectableRef.current) {
      return
    }

    const selectableTextArea = selectableRef.current

    // Clear existing set of highlights so we don't double-apply them
    selectableTextArea.innerHTML = sanitize(post.body)

    // Re-construct all comments from DB
    post.threads.forEach((thread: ThreadType) => {
      const { startIndex, endIndex, archived, id } = thread

      if (archived) {
        return
      }

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

  useEffect(() => {
    const onSelectionChange = () => {
      const selection = window.getSelection()

      if (selectionState.bouncing) {
        return
      }

      if (
        !selection ||
        !selection.rangeCount ||
        !selectableRef.current ||
        !isSelectionCommentable(selection, selectableRef.current)
      ) {
        setDisplayCommentButton(false)
        return
      }

      if (iOS()) {
        queueSelectionBounce()
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

      // Mouse/touch events in modals shouldn't close the thread popover
      if (findEventTargetParent(e, (el) => el.id === 'modal-root')) {
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

    // Traverse from event target up to post body container looking for any
    // ancestor that is a thread highlight.
    let threadHighlight = null
    let currentElement: HTMLElement | null = e.target as HTMLElement
    while (currentElement && currentElement !== e.currentTarget) {
      if (currentElement.dataset.tid) {
        threadHighlight = currentElement
        break
      } else {
        currentElement = currentElement.parentElement
      }
    }

    // Click was on something that wasn't highlighted, do nothing
    if (!threadHighlight || !threadHighlight.dataset.tid) {
      return
    }

    setActiveThreadId(parseInt(threadHighlight.dataset.tid, 10))
    setPopoverPosition({
      ...getCoords(threadHighlight),
      w: threadHighlight.offsetWidth,
      h: threadHighlight.offsetHeight,
    })
  }

  const setPostStatus = (status: PostStatus) => () => {
    if (!currentUser?.emailAddressVerified) {
      toast.error(t('emailVerificationWarning'))
      return
    }
    if (status === PostStatus.Private && !isPremiumFeatureEligible) {
      setPremiumFeatureModalExplanation(t('privatePublishingPremiumFeatureExplanation'))
      setDisplayPremiumFeatureModal(true)
      return
    }
    updatePost({
      variables: {
        postId: post.id,
        status,
        // headlineImage is required now but the resolver will see it hasn't changed and do nothing
        headlineImage: {
          smallSize: post.headlineImage.smallSize,
          largeSize: post.headlineImage.largeSize,
        },
      },
      update(cache, { data }) {
        if (data?.updatePost) {
          cache.modify({
            id: cache.identify(makeReference('ROOT_QUERY')),
            fields: {
              posts: () => {
                // This simply invalidates the cache for the `posts` query
                return undefined
              },
            },
          })
        }
      },
    })
  }

  const activeThread = post.threads.find((thread: ThreadType) => thread.id === activeThreadId)

  const handleBumpPost = () => {
    if (!canAttemptBump) {
      setPremiumFeatureModalExplanation(t('postBumpingPremiumFeatureExplanation'))
      setDisplayPremiumFeatureModal(true)
    } else {
      if (post.bumpCount >= POST_BUMP_LIMIT) {
        toast.error(t('postBumpLimitError'))
        return
      }
      bumpPost()
    }
  }

  const [bumpPost] = useBumpPostMutation({
    variables: { postId: post.id },
    onCompleted: () => {
      toast.success(
        t('bumpPostSuccess', {
          numRemaining: POST_BUMP_LIMIT - (post.bumpCount + 1),
        }),
      )
      Router.push('/dashboard/my-feed')
    },
  })

  return (
    <div className="post-container">
      <Head>
        <title>
          {post.author.handle} | {post.title}
        </title>
        <meta name="author" content={post.author.name || post.author.handle} />
        <meta property="og:title" content={post.title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.journaly.com/post/${post.id}/`} />
        <meta property="og:image" content={post.headlineImage.largeSize} />
      </Head>
      <div className="post-content">
        <PostHeader
          postTitle={post.title}
          postStatus={post.status}
          publishDate={post.publishedAt ? post.publishedAt : post.createdAt}
          publishedLanguageLevel={post.publishedLanguageLevel}
          authorName={post.author.name ? post.author.name : post.author.handle}
          authorId={post.author.id}
          postImage={post.headlineImage.largeSize}
          language={post.language}
          topics={post.postTopics.map(({ topic }) => topic)}
        />
        <article className="post-body selectable-text-area" dir="auto" onClick={onThreadClick}>
          <PostContent body={post.body} ref={selectableRef} />
        </article>
        <div className="post-controls">
          <div className="clap-container">
            {currentUser?.id === post.author.id ? (
              <Button variant={ButtonVariant.Icon} onClick={() => setDisplayUserListModal(true)}>
                <ClapIcon
                  width={24}
                  clapped={hasClappedPost}
                  title={getUsersClappedText(post.claps, currentUser?.id)}
                />
              </Button>
            ) : (
              <Button
                variant={ButtonVariant.Icon}
                onClick={hasClappedPost ? deleteExistingPostClap : createNewPostClap}
                loading={isLoadingPostClap}
                disabled={!currentUser}
              >
                <ClapIcon
                  width={24}
                  clapped={hasClappedPost}
                  title={getUsersClappedText(post.claps, currentUser?.id)}
                />
              </Button>
            )}
            <span>{post.claps.length}</span>
          </div>
          <div className="post-action-container">
            {isAuthoredPost && (
              <>
                {post.status === PostStatus.Published && (
                  <Button type="button" variant={ButtonVariant.Secondary} onClick={handleBumpPost}>
                    {t('bumpPostAction')}
                  </Button>
                )}
                <Button
                  type="button"
                  variant={ButtonVariant.Secondary}
                  onClick={() => {
                    Router.push('/post/[id]/edit', `/post/${post.id}/edit`)
                  }}
                >
                  {t('editPostAction')}
                </Button>
                {post.status === PostStatus.Draft && (
                  <div className="post-action-subcontainer">
                    <Button
                      type="button"
                      variant={ButtonVariant.Secondary}
                      onClick={setPostStatus(PostStatus.Published)}
                    >
                      {t('publishDraft')}
                    </Button>
                    <Button
                      type="button"
                      variant={ButtonVariant.Secondary}
                      onClick={setPostStatus(PostStatus.Private)}
                    >
                      {t('sharePrivatelyCTA')}
                    </Button>
                  </div>
                )}
                {post.status === PostStatus.Private && (
                  <Button
                    type="button"
                    variant={ButtonVariant.Secondary}
                    onClick={setPostStatus(PostStatus.Published)}
                  >
                    {t('publishPost')}
                  </Button>
                )}
                <Button
                  type="button"
                  variant={ButtonVariant.DestructiveSecondary}
                  onClick={(): void => {
                    setDisplayDeleteModal(true)
                  }}
                >
                  {t('deletePostAction')}
                </Button>
              </>
            )}
            {!isAuthoredPost && (
              <>
                <Button
                  variant={ButtonVariant.Icon}
                  loading={savingPost || unsavingPost}
                  onClick={() => {
                    hasSavedPost ? unsavePost({ variables: { postId: post.id } }) : handleSavePost()
                  }}
                >
                  <BookmarkIcon size={28} saved={hasSavedPost} />
                </Button>
              </>
            )}
          </div>
        </div>
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
      <ConfirmationModal
        onConfirm={() => {
          deletePost({ variables: { postId: post.id } })
          setDisplayDeleteModal(false)
        }}
        onCancel={() => {
          setDisplayDeleteModal(false)
        }}
        title={t('deleteModal.title')}
        body={t('deleteModal.body')}
        show={displayDeleteModal}
      />
      {displayPremiumFeatureModal && (
        <PremiumFeatureModal
          featureExplanation={premiumFeatureModalExplanation}
          onAcknowledge={() => {
            setPremiumFeatureModalExplanation(undefined)
            setDisplayPremiumFeatureModal(false)
          }}
          onGoToPremium={() => {
            Router.push('/dashboard/settings/subscription')
            setPremiumFeatureModalExplanation(undefined)
            setDisplayPremiumFeatureModal(false)
          }}
        />
      )}
      {displayUserListModal && (
        <UserListModal
          title={`${post.claps.length} People Clapped!`}
          users={usersWhoClapped}
          onClose={() => setDisplayUserListModal(false)}
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

        .post-body table {
          width: 100%;
          margin-bottom: 10px;
        }

        .post-body td {
          background-color: ${theme.colors.white};
          border: 1px solid ${theme.colors.gray400};
          padding: 0 8px;
          vertical-align: bottom;
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
          grid-auto-rows: max-content 1fr auto;
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
          margin-bottom: 50px;
        }

        h2 {
          margin: 20px 0;
        }

        .topics-list {
          grid-column: 2;
          align-self: end;
          margin-bottom: 10px;
        }

        .post-controls {
          grid-column: 2;
          align-self: end;
          justify-self: end;
          margin-bottom: 20px;

          display: flex;
          width: 100%;
          justify-content: space-between;
        }

        .post-controls > :global(button) {
          margin-left: 5px;
        }

        .post-action-container,
        .post-action-subcontainer {
          display: flex;
          gap: 10px;
        }

        @media (max-width: ${theme.breakpoints.SM}) {
          ${isAuthoredPost &&
          `.post-controls {
              flex-direction: column;
            }
  
            .post-action-container {
              padding-top: 10px;
              flex-direction: column;
              gap: 5px;
            }
          `}
          .post-action-container > :global(button) {
            align-self: stretch;
          }
          .post-action-subcontainer > :global(button) {
            width: 100%;
          }
        }
        .clap-container {
          display: flex;
          align-items: center;
          gap: 5px;
        }
      `}</style>
    </div>
  )
}

export default Post
