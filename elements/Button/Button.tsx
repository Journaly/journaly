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
  PrimaryDark = 'primaryDark',
  Destructive = 'destructive',
  DestructiveSecondary = 'destructiveSecondary',
  Link = 'link',
  Icon = 'icon',
}

type Props = {
  children: React.ReactNode
  className?: string
  disabled?: boolean
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
    loading = false,
    size = ButtonSize.Default,
    variant = ButtonVariant.Primary,
    type = 'button',
    className = '',
    ...otherProps
  } = props

  const buttonClasses = classNames(className, size, variant, {
    loading,
  })

  let loadingColor = theme.colors.white

  if (variant === ButtonVariant.Secondary) {
    loadingColor = theme.colors.blueLight
  } else if (variant === ButtonVariant.DestructiveSecondary) {
    loadingColor = theme.colors.red
  } else if (variant === ButtonVariant.PrimaryDark) {
    loadingColor = theme.colors.blueLight
  }

  return (
    <button
      onClick={onClick}
      className={buttonClasses}
      disabled={loading || disabled}
      aria-busy={loading}
      type={type}
      {...otherProps}
    >
      {variant === ButtonVariant.Icon ? children : <span className="button-text">{children}</span>}

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

        .${ButtonVariant.Primary}:hover:not(:disabled):not(.link):not(.icon) {
          background-color: ${theme.colors.blue};
          border: 1px solid ${theme.colors.blue};
        }

        .${ButtonVariant.Secondary} {
          color: ${theme.colors.blueLight};
          background-color: ${theme.colors.white};
          border: 1px solid ${theme.colors.blueLight};
        }
        .${ButtonVariant.Secondary}:hover:not(:disabled) {
          background-color: ${theme.colors.blue};
          color: ${theme.colors.white};
          border: 1px solid gray;
        }
        .${ButtonVariant.Secondary}:focus:not(:disabled) {
          outline: none;
          border-width: 2px;
        }

        .${ButtonVariant.PrimaryDark} {
          color: ${theme.colors.white};
          background-color: ${theme.colors.charcoal};
          border: none;
        }
        .${ButtonVariant.PrimaryDark}:hover:not(:disabled) {
          color: ${theme.colors.blueLight};
        }

        .${ButtonVariant.PrimaryDark}:focus:not(:disabled) {
          outline: none;
          border-width: 0;
        }

        .${ButtonVariant.Destructive} {
          color: ${theme.colors.white};
          background-color: ${theme.colors.red};
          border: 1px solid ${theme.colors.red};
        }
        .${ButtonVariant.Destructive}:hover:not(:disabled) {
          background-color: tomato;
          border: 1px solid tomato;
        }

        .${ButtonVariant.DestructiveSecondary} {
          color: ${theme.colors.red};
          background-color: ${theme.colors.white};
          border: 1px solid ${theme.colors.red};
        }
        .${ButtonVariant.DestructiveSecondary}:hover:not(:disabled) {
          color: ${theme.colors.white};
          background-color: ${theme.colors.red};
          border: 1px solid ${theme.colors.white};
        }

        .${ButtonVariant.Link} {
          display: inline;
          color: ${theme.colors.blueLight};
          background-color: transparent;
          border: none;
          padding: 0;
        }
        .${ButtonVariant.Link}:hover:not(:disabled) {
          text-decoration: underline;
        }
        .${ButtonVariant.Link}:focus:not(:disabled) {
          outline: none;
          border-width: 0;
        }

        .${ButtonVariant.Icon} {
          padding: 0;
          font: inherit;
          border: none;
          background-color: transparent;
          border-radius: 4px;
        }
        .${ButtonVariant.Icon}:hover:not(:disabled) {
          border: none;
        }

        button[disabled] {
          opacity: 0.8;
          cursor: default;
        }
        button[disabled].loading {
          opacity: 1;
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
