import React from 'react'

interface Props {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  id?: string
  plain?: boolean
}

const Button: React.FC<Props> = (props) => {
  const { children, onClick, plain = false, ...otherProps } = props

  return (
    <button onClick={onClick} {...otherProps}>
      {children}

      <style jsx>{`
        button {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 8px 16px;
          font-size: 14px;
          font-family: inherit;
          font-weight: 500;
          line-height: 24px;
          border-radius: 4px;
          box-shadow: none;
          cursor: pointer;

          ${plain &&
          `
            padding: 0;
            font: inherit;
            border: none;
            background: none;
          `}
        }
      `}</style>
    </button>
  )
}

export default Button
