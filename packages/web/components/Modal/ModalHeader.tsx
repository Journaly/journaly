import React from 'react'
import Button, { ButtonVariant } from '@/components/Button'
import XIcon from '@/components/Icons/XIcon'
import modalConstants from './modalConstants'
import { truncate, lightGrey } from '@/utils'

interface Props {
  onClose: () => void
  title: React.ReactNode
  showTitle: boolean
}

const ModalHeader: React.FC<Props> = ({ onClose, title, showTitle }) => {
  return (
    <div className="modal-header">
      <Button variant={ButtonVariant.Icon} onClick={onClose} className="modal-close-button">
        <XIcon size={40} />
        <span className="screen-reader">Close dialog</span>
      </Button>

      <h1 className="modal-title">{title}</h1>

      <style jsx>{`
        .modal-header {
          position: relative;
          padding: 14px 64px;
          border-bottom: ${showTitle ? '1px solid #d4d8db' : 0};
        }
        @media (min-width: ${modalConstants.modalBreakpoint}) {
          .modal-header {
            padding: 22px 64px;
          }
        }

        .modal-header :global(.modal-close-button) {
          position: absolute;
          top: 8px;
          right: 16px;
          border-radius: 8px;
        }
        .modal-header :global(.modal-close-button):hover {
          background-color: ${lightGrey};
        }
        @media (min-width: ${modalConstants.modalBreakpoint}) {
          .modal-header :global(.modal-close-button) {
            top: 16px;
          }
        }

        h1 {
          margin: 0 auto;
          opacity: ${showTitle ? 1 : 0};
          font-size: 20px;
          line-height: 28px;
          font-weight: 500;
          text-align: center;
          transition: opacity 150ms ease-in, border 150ms ease-in;
          ${truncate(247)};
        }
        @media (min-width: ${modalConstants.modalBreakpoint}) {
          h1 {
            ${truncate(432)};
          }
        }
      `}</style>
    </div>
  )
}

export default ModalHeader
