import React from 'react'
import classNames from 'classnames'
import theme from '@theme'

type Props = {
  className?: string
  children: React.ReactNode
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  errorInputName?: string
}

const SettingsForm: React.FC<Props> = ({ className, children, onSubmit, errorInputName }) => {
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

        :global(.form-error) {
          margin-bottom: 24px;
        }

        :global(input[name="${errorInputName}"]) {
          border-color: ${theme.colors.red};
        }
      `}</style>
    </form>
  )
}

export default SettingsForm
