import React from 'react'
import { brandBlue, white } from '../../utils'

export enum Variant {
  Primary = 'primary',
  Secondary = 'secondary',
}

type Props = {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  id?: string
  variant?: Variant
  plain?: boolean
}

const Button: React.FC<Props> = (props) => {
  const { children, onClick, plain = false, variant = Variant.Primary, ...otherProps } = props

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
          color: ${white};
          background-color: ${brandBlue};
          box-shadow: none;
          cursor: pointer;

          ${variant === Variant.Secondary &&
          `
            color: ${brandBlue};
            background-color: ${white};
            border: 1px solid ${brandBlue};
          `}

          ${plain &&
          `
            padding: 0;
            font: inherit;
            border: none;
            background: none;
          `}
        }
        button[disabled] {
          opacity: 0.8;
        }
      `}</style>
    </button>
  )
}

export default Button
