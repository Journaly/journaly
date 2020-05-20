import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import ModalHeader from './ModalHeader'
import ModalBody from './ModalBody'
import ModalFooter from './ModalFooter'
import modalConstants from './modalConstants'
import useFocusTrap from '../../hooks/useFocusTrap'
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
  maxHeight?: string
}

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
    maxHeight = '100%',
  } = props

  useFocusTrap({
    rootElement: modalRoot,
    onClose,
    returnFocusElementId: triggerElementId,
    bodyClass: 'modal-open',
  })

  const handleModalBodyScroll = (event: Event): void => {
    if ((event.target as Element)?.scrollTop > 28) {
      setShouldFadeInTitle(true)
      return
    }
    setShouldFadeInTitle(false)
  }

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
            max-height: ${maxHeight};
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
