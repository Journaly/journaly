import React from 'react'
import classNames from 'classnames'
import theme from '../../theme'

type Props = {
  children: React.ReactNode
  className?: string
  ariaLabel?: string
  href: string | URL
  target?: '_blank' | '_self' | '_parent' | '_top' | string
  rel?: string
  icon?: boolean
}

const ExternalLink: React.FC<Props> = (props) => {
  const { ariaLabel, className, icon = false, ...otherProps } = props

  const externalLinkClasses = classNames(className, { icon })

  return (
    <>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className={externalLinkClasses}
        aria-label={ariaLabel}
        {...otherProps}
      />

      <style jsx>{`
        a {
          display: flex;
          justify-content: center;
          align-items: center;
          color: ${theme.colors.blue};
          text-decoration: none;
          cursor: pointer;
        }

        .link {
          color: ${theme.colors.black};
        }
      `}</style>
    </>
  )
}

export default ExternalLink
