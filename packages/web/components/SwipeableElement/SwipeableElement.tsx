import theme from '@/theme'
import React, { useRef } from 'react'
import Button, { ButtonVariant } from '@/components/Button'
import CheckmarkIcon from '../Icons/CheckmarkIcon'
import DeleteIcon from '../Icons/DeleteIcon'
import { useTranslation } from '@/config/i18n'

type SwipeableElementProps = {
  nonDestructiveAction: () => void
  destructiveAction: () => void
  children: React.ReactNode
}

type Swipe = {
  touchStart: number
  touchEnd: number
  isSwiping: boolean
  currentTranslate: number
  animationId: number
  translateStart: number
}

const SwipeableElement: React.FC<SwipeableElementProps> = ({
  destructiveAction,
  nonDestructiveAction,
  children,
}) => {
  const { t } = useTranslation('common')

  const swipe = useRef<Swipe>({
    touchStart: 0,
    touchEnd: 0,
    isSwiping: false,
    currentTranslate: 0,
    animationId: 0,
    translateStart: 0,
  })

  const rightHandActionsRef = useRef<HTMLDivElement>(null)
  const SENSITIVITY = 125

  const getPositionX = (e: React.TouchEvent<HTMLDivElement>) => {
    return e.targetTouches[0].clientX
  }

  const animation = () => {
    if (rightHandActionsRef.current) {
      rightHandActionsRef.current.style.transform = `translateX(max(${
        swipe.current.translateStart + swipe.current.currentTranslate
      }px, -100%))`
    }
    if (swipe.current.isSwiping) swipe.current.animationId = requestAnimationFrame(animation)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    swipe.current.translateStart = swipe.current.currentTranslate
    swipe.current.currentTranslate = 0
    swipe.current.touchStart = getPositionX(e)
    swipe.current.isSwiping = true
    swipe.current.animationId = requestAnimationFrame(animation)
  }
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    let currentPosition = getPositionX(e)
    let touchEndX = getPositionX(e)
    swipe.current.currentTranslate = currentPosition - swipe.current.touchStart
    swipe.current.touchEnd = touchEndX
  }
  const handleTouchEnd = () => {
    let amountSwiped = swipe.current.currentTranslate + swipe.current.translateStart
    swipe.current.isSwiping = false
    if (amountSwiped < -SENSITIVITY) {
      swipe.current.currentTranslate = -200
    } else if (amountSwiped > -SENSITIVITY) {
      ;(swipe.current.isSwiping = false), (swipe.current.currentTranslate = 0)
    } else {
      ;(swipe.current.isSwiping = false), (swipe.current.currentTranslate = 0)
    }
    rightHandActionsRef.current!.style.transform = `translateX(${swipe.current.currentTranslate}px)`
    cancelAnimationFrame(swipe.current.animationId)
  }

  const handleCloseActions = () => {
    swipe.current.currentTranslate = 0
    swipe.current.isSwiping = false
    swipe.current.translateStart = 0
    animation()
  }

  // Make sure menu doesn't pop up when clicking & holding
  const onContextMenuClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  return (
    <div onContextMenu={onContextMenuClick}>
      <div
        className="container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
        <div className="right-hand-actions" ref={rightHandActionsRef}>
          <Button
            variant={ButtonVariant.Icon}
            tabIndex={-1}
            onClick={() => {
              handleCloseActions()
              nonDestructiveAction()
            }}
          >
            <div className="action-btn non-destructive">
              <CheckmarkIcon size={24} />
              {t('notifications.actions.markAsRead')}
            </div>
          </Button>
          <Button
            variant={ButtonVariant.Icon}
            tabIndex={-1}
            onClick={() => {
              handleCloseActions()
              destructiveAction()
            }}
          >
            <div className="action-btn destructive">
              <DeleteIcon color={theme.colors.white} size={24} />
              {t('notifications.actions.delete')}
            </div>
          </Button>
        </div>
        <style jsx>{`
          .container {
            position: relative;
            display: flex;
            align-items: center;
            user-select: none;
            // Prevent screen dragging behavior
            touch-action: pan-y;
            overflow-x: hidden;
          }

          .right-hand-actions {
            display: flex;
            width: 100vw;
            height: 100%;
            background-color: ${theme.colors.gray800};
            position: absolute;
            left: 100%;
            transition: transform 0.1s linear;
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

          .action-btn.non-destructive {
            background-color: ${theme.colors.gray600};
          }

          .action-btn.destructive {
            background-color: ${theme.colors.red};
          }
        `}</style>
      </div>
    </div>
  )
}

export default SwipeableElement
