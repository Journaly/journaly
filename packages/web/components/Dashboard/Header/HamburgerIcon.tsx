import React from 'react'
import classNames from 'classnames'
import theme from '@/theme'

type Props = {
  onClick: () => void
  className?: string
}

const HamburgerIcon: React.FC<Props> = ({ onClick, className }) => {
  const hamburgerStyles = classNames('hamburger-container', className)

  return (
    <div className={hamburgerStyles} onClick={onClick}>
      <div />
      <div />
      <div />

      <style jsx>{`
        .hamburger-container {
          padding: 10px;
          cursor: pointer;
        }

        .hamburger-container div {
          height: 2px;
          width: 32px;
          background-color: ${theme.colors.blueLight};
        }

        .hamburger-container div:nth-child(2) {
          margin-top: 7px;
          width: 24px;
        }

        .hamburger-container div:nth-child(3) {
          margin-top: 7px;
          width: 18px;
        }
      `}</style>
    </div>
  )
}

export default HamburgerIcon
