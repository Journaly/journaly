import React from 'react'
import theme from '@theme'

type Props = {
  children: React.ReactNode
  legend: string
}

const SettingsFieldset: React.FC<Props> = ({ children, legend }) => {
  return (
    <fieldset className="settings-fieldset">
      <legend className="settings-fieldset-legend">
        <h2>{legend}</h2>
      </legend>

      {children}
      <style jsx>{`
        .settings-fieldset-legend {
          margin-bottom: 24px;
          text-align: center;
        }
        .settings-fieldset-legend h2 {
          ${theme.typography.headingLG}
        }
        @media (min-width: ${theme.breakpoints.SM}) {
          .settings-fieldset-legend {
            text-align: left;
          }
        }

        :global(.settings-label) {
          margin-bottom: 4px;
        }

        :global(.settings-submit-button) {
          margin-top: 40px;
        }
      `}</style>
    </fieldset>
  )
}

export default SettingsFieldset
