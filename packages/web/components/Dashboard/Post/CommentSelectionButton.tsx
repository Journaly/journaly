import React from 'react'

import { CommentSelectionButtonProps } from './types'
import theme from '@/theme'

import PencilIcon from '@/components/Icons/PencilIcon'

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
          transform: translateX(-50%);
        }

        .comment-btn:hover :global(#g-stroke) {
          stroke: ${theme.colors.blueLight};
        }
      `}</style>
    </button>
  )
}

export default CommentSelectionButton
