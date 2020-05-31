import React from 'react'
import classNames from 'classnames'
import theme from '../../../theme'

type Props = {
  className?: string
  children: React.ReactNode
  onSubmit: () => void
}

const SettingsForm: React.FC<Props> = ({ className, children, onSubmit }) => {
  const settingsFormClasses = classNames('settings-form', className)

  return (
    <form onSubmit={onSubmit} className={settingsFormClasses}>
      {children}
      <style jsx>{`
        .settings-form {
          width: 100%;
          padding: 25px;
          background-color: ${theme.colors.white};
          box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </form>
  )
}

export default SettingsForm
