import React from 'react'
import CSS from 'csstype'
import classNames from 'classnames'

import theme from '../../theme'
import LoadingSpinner from '../../components/Icons/LoadingSpinner'

type Type = 'button' | 'submit' | 'reset'

export enum ButtonSize {
  Large = 'large',
  Default = 'default',
  Small = 'small',
}

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Destructive = 'destructive',
  DestructiveSecondary = 'destructiveSecondary',
}

type Props = {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  icon?: boolean
  link?: boolean
  loading?: boolean
  id?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  size?: ButtonSize
  type?: Type
  variant?: ButtonVariant
  style?: CSS.Properties | undefined
}

const Button: React.FC<Props> = (props) => {
  const {
    children,
    onClick,
    disabled = false,
    icon = false,
    link = false,
    loading = false,
    size = ButtonSize.Default,
    variant = ButtonVariant.Primary,
    type = 'button',
    className = '',
    ...otherProps
  } = props

  const buttonClasses = classNames(className, size, variant, {
    icon,
    link,
    loading,
  })

  let loadingColor = theme.colors.white

  if (variant === ButtonVariant.Secondary) {
    loadingColor = theme.colors.blueLight
  } else if (variant === ButtonVariant.DestructiveSecondary) {
    loadingColor = theme.colors.red
  }

  return (
    <button
      onClick={onClick}
      className={buttonClasses}
      disabled={loading || disabled}
      aria-busy={loading}
      {...otherProps}
    >
      {icon ? children : <span className="button-text">{children}</span>}

      <div className="loading-indicator">
        <LoadingSpinner size={24} fill={loadingColor} />
      </div>

      <style jsx>{`
        button {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          align-self: center;
          padding: 8px 16px;
          font-size: 14px;
          font-family: inherit;
          font-weight: 400;
          line-height: 24px;
          border-radius: 4px;
          color: ${theme.colors.white};
          background-color: ${theme.colors.blueLight};
          border: 1px solid ${theme.colors.blueLight};
          box-shadow: none;
          cursor: pointer;
          white-space: nowrap;
        }

        .${ButtonSize.Large} {
          padding: 12px 48px;
        }
        .${ButtonSize.Small} {
          padding: 4px 8px;
        }

        .${ButtonVariant.Secondary} {
          color: ${theme.colors.blueLight};
          background-color: ${theme.colors.white};
          border: 1px solid ${theme.colors.blueLight};
        }
        .${ButtonVariant.Destructive} {
          color: ${theme.colors.white};
          background-color: ${theme.colors.red};
          border: 1px solid ${theme.colors.red};
        }
        .${ButtonVariant.DestructiveSecondary} {
          color: ${theme.colors.red};
          background-color: ${theme.colors.white};
          border: 1px solid ${theme.colors.white};
        }

        .${ButtonVariant.Primary}:hover:not(:disabled):not(.link):not(.icon) {
          background-color: ${theme.colors.blue};
          border: 1px solid ${theme.colors.blue};
        }
        .${ButtonVariant.Secondary}:hover:not(:disabled) {
          background-color: ${theme.colors.blue};
          color: ${theme.colors.white};
          border: 1px solid gray;
        }
        .${ButtonVariant.Destructive}:hover:not(:disabled) {
          background-color: tomato;
          border: 1px solid tomato;
        }
        .${ButtonVariant.DestructiveSecondary}:hover:not(:disabled) {
          background-color: gray;
          border: 1px solid gray;
        }

        button:hover.icon,
        button:hover.link {
          background: none;
          border: none;
        }

        button:hover.icon {
          background-color: gray;
        }

        button[disabled] {
          opacity: 0.8;
          cursor: default;
        }
        button[disabled].loading {
          opacity: 1;
        }

        .icon,
        .link {
          padding: 0;
          font: inherit;
          border: none;
          background: none;
        }

        .icon {
          border-radius: 4px;
        }

        .link {
          color: ${theme.colors.blueLight};
        }

        .loading .button-text {
          visibility: hidden;
        }

        .loading-indicator {
          position: absolute;
          display: none;
        }

        .loading .loading-indicator {
          display: flex;
        }
      `}</style>
    </button>
  )
}

export default Button
