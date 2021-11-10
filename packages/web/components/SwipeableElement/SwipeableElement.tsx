import theme from '@/theme'
import React, { useState } from 'react'
import Button, { ButtonVariant } from '@/components/Button'
import CheckmarkIcon from '../Icons/CheckmarkIcon'
import DeleteIcon from '../Icons/DeleteIcon'

type SwipeableElementProps = {
  elementId: number
  nonDestructiveAction: (elementId: number) => void
  destructiveAction: () => void
}

type Swipe = {
  touchStart: number
  touchEnd: number
  moved: boolean
  isSwiping: boolean
  prevTranslate: number
  currentTranslate: string
  animationId: number
  // startPosition: number
}

const SwipeableElement: React.FC<SwipeableElementProps> = ({
  destructiveAction,
  nonDestructiveAction,
  elementId,
  children,
}) => {
  const [swipe, setSwipe] = useState<Swipe>({
    touchStart: 0,
    touchEnd: 0,
    moved: false,
    isSwiping: false,
    prevTranslate: 300,
    currentTranslate: '100%',
    // currentTranslate: '0',
    animationId: 0,
  })

  const { touchStart, touchEnd, moved, isSwiping, currentTranslate, prevTranslate, animationId } =
    swipe
  const SENSITIVITY = 100

  const getPositionX = (e: React.TouchEvent<HTMLDivElement>) => {
    return e.targetTouches[0].clientX
  }

  const animation = () => {
    if (isSwiping) requestAnimationFrame(animation)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    console.log('Touch has started...')
    let touchStartX = getPositionX(e)
    setSwipe((swipe) => ({
      ...swipe,
      touchStart: touchStartX,
      isSwiping: true,
      animationId: requestAnimationFrame(animation),
    }))
  }
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    console.log('Touch is moving...')
    let currentPosition = getPositionX(e)
    let touchEndY = getPositionX(e)
    setSwipe((swipe) => ({
      ...swipe,
      // currentTranslate: `${currentPosition}px`,
      currentTranslate: `${prevTranslate + currentPosition - touchStart}px`,
      moved: true,
      touchEnd: touchEndY,
    }))
  }
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    console.log('Touch has ended...')
    let amountSwiped = touchStart - touchEnd
    if (amountSwiped > SENSITIVITY && moved) {
      console.log('AHA! I HAVE BEEN MOVED 🤩')

      setSwipe((swipe) => ({ ...swipe, isSwiping: false, currentTranslate: '47%' }))
    } else if (amountSwiped < -SENSITIVITY && moved) {
      console.log('I HAVE BEEN CLOSED 😭')
      setSwipe((swipe) => ({ ...swipe, isSwiping: false, currentTranslate: '100%' }))
    } else {
      setSwipe((swipe) => ({ ...swipe, isSwiping: false, currentTranslate: '100%' }))
    }
    cancelAnimationFrame(animationId)
  }
  const handleTouchCancel = (e: React.TouchEvent<HTMLDivElement>) => {
    console.log('Touch has been cancelled...')
  }

  // Make sure menu doesn't pop up when clicking & holding
  if (window !== undefined) {
    window.oncontextmenu = (e) => {
      e.preventDefault()
      e.stopPropagation()
      return false
    }
  }

  return (
    <div
      className="container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      {children}
      <div className="right-hand-actions">
        <Button variant={ButtonVariant.Icon} onClick={() => nonDestructiveAction(elementId)}>
          <div className="action-btn read">
            <CheckmarkIcon size={24} />
            Read
          </div>
        </Button>
        <Button variant={ButtonVariant.Icon} onClick={destructiveAction}>
          <div className="action-btn delete">
            <DeleteIcon color={theme.colors.white} size={24} />
            Delete
          </div>
        </Button>
      </div>
      <style jsx>{`
        .container {
          position: relative;
          display: flex;
          align-items: center;
          // TODO: decide what to do here
          /* cursor: grab; */
          user-select: none;
          // Prevent screen dragging behavior
          touch-action: none;
        }

        .grabbing {
          cursor: grabbing;
        }

        .right-hand-actions {
          display: flex;
          width: 100vw;
          height: 100%;
          background-color: ${theme.colors.gray800};
          position: absolute;
          transform: translateX(${currentTranslate});
          transition: transform 1s east-out;
        }

        .right-hand-actions > :global(button) {
          height: 100%;
        }

        .action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100px;
          height: 100%;
        }

        .action-btn.read {
          background-color: ${theme.colors.gray600};
        }

        .action-btn.delete {
          background-color: ${theme.colors.red};
        }
      `}</style>
    </div>
  )
}

export default SwipeableElement
