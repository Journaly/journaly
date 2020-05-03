import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import ModalHeader from './ModalHeader'
import ModalBody from './ModalBody'
import ModalFooter from './ModalFooter'
import modalConstants from './modalConstants'
import { white } from '../../utils'

interface Props {
  onClose: () => void
  title: React.ReactNode
  body: React.ReactNode
  footer?: React.ReactNode
  ariaLabelledBy?: string
  ariaDescribedBy?: string
  triggerElementId?: string
  maxWidth?: string
}

const ESCAPE_KEY = 27
const TAB_KEY = 9
const MODAL_OPEN_CLASS = 'modal-open'

const Modal: React.FC<Props> = (props) => {
  const [shouldFadeInTitle, setShouldFadeInTitle] = useState(false)
  const modalRoot = document.getElementById('modal-root') as HTMLElement
  const {
    onClose,
    title,
    body,
    footer,
    ariaLabelledBy,
    ariaDescribedBy,
    triggerElementId = '',
    maxWidth = modalConstants.modalBreakpoint,
  } = props

  const handleTabKey = (event: KeyboardEvent): void => {
    const focusableModalElements = modalRoot.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select',
    )
    const firstElement = focusableModalElements[0] as HTMLElement
    const lastElement = focusableModalElements[focusableModalElements.length - 1] as HTMLElement

    // Make sure the first element is focused
    if (![...focusableModalElements].includes(document.activeElement as HTMLElement)) {
      firstElement.focus()
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      // Tabbing forwards on the last element focuses the first element
      firstElement.focus()
      event.preventDefault()
    } else if (event.shiftKey && document.activeElement === firstElement) {
      // Tabbing backwards with Shift + Tab on the first element focuses the last element
      lastElement.focus()
      event.preventDefault()
    }
  }

  const handleModalBodyScroll = (event: Event): void => {
    if ((event.target as Element)?.scrollTop > 28) {
      setShouldFadeInTitle(true)
      return
    }
    setShouldFadeInTitle(false)
  }

  const keyListenersMap = new Map([
    [ESCAPE_KEY, onClose],
    [TAB_KEY, handleTabKey],
  ])

  useEffect(() => {
    document.body.classList.add(MODAL_OPEN_CLASS)
    return () => {
      document.body.classList.remove(MODAL_OPEN_CLASS)
      const elementToFocus = document.getElementById(triggerElementId)
      if (elementToFocus) elementToFocus.focus()
    }
  }, [])

  useEffect(() => {
    function keyListener(event: KeyboardEvent): void {
      const listener = keyListenersMap.get(event.keyCode)
      return listener && listener(event)
    }
    document.addEventListener('keydown', keyListener)

    return () => document.removeEventListener('keydown', keyListener)
  })

  return ReactDOM.createPortal(
    <div className="modal-container" onClick={onClose}>
      <div className="modal-wrapper">
        <div
          className="modal-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          data-testid="modal"
          onClick={(event) => event.stopPropagation()}
        >
          <ModalHeader title={title} onClose={onClose} showTitle={shouldFadeInTitle} />
          <ModalBody ariaLabelledBy={ariaLabelledBy} title={title} onScroll={handleModalBodyScroll}>
            {body}
          </ModalBody>
          {footer && <ModalFooter>{footer}</ModalFooter>}
        </div>
      </div>
      <style jsx>{`
        @keyframes enterFromBottom {
          from {
            transform: translateY(10%);
          }

          to {
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        .modal-container {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.5);
          animation: 100ms fadeIn linear;
        }

        .modal-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          padding: 0;
          overflow: auto;
          animation: 300ms enterFromBottom cubic-bezier(0, 0, 0.2, 1);
        }
        @media (min-width: ${modalConstants.modalBreakpoint}) {
          .modal-wrapper {
            padding: 64px 0;
          }
        }
        .modal-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          max-height: 100%;
          max-width: ${maxWidth};
          background-color: ${white};
        }
        @media (min-width: ${modalConstants.modalBreakpoint}) {
          .modal-content {
            flex-grow: 0;
            border-radius: 8px;
          }
          .modal-content .modal-body {
            ${Boolean(footer) && `padding-bottom: 48px;`};
          }
        }
      `}</style>
    </div>,
    modalRoot,
  )
}

export default Modal
