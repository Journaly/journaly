import React from 'react'
import classNames from 'classnames'

import theme from '@/theme'

type ButtonProps = {
  children: React.ReactNode
  active: boolean
  onClick: (e: React.MouseEvent) => void
}

const BaseToolbarButton = ({ onClick, active, children }: ButtonProps) => {
  const buttonClasses = classNames('toolbar-button', { active })

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}

      <style jsx>{`
        .toolbar-button {
          height: 100%;
          padding: 1px;
          border: none;
          border-radius: 5px;
          background-color: ${theme.colors.gray800};
          cursor: pointer;
        }

        .toolbar-button:last-child {
          margin-right: 0;
        }

        .toolbar-button:hover {
          box-shadow: 0px 8px 10px #00000029;
        }

        .toolbar-button :global(svg) {
          display: block;
        }

        .toolbar-button.active :global(svg) {
          fill: ${theme.colors.blueLight};
          color: ${theme.colors.blueLight};
        }
      `}</style>
    </button>
  )
}

export default BaseToolbarButton
