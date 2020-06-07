import React from 'react'
import theme from '../../../theme'

type Props = {
  children: React.ReactNode
  legend: string
}

const SettingsFieldset: React.FC<Props> = ({ children, legend }) => {
  return (
    <fieldset className="settings-fieldset">
      <legend>
        <h2>{legend}</h2>
      </legend>

      {children}
      <style jsx>{`
        legend {
          margin-bottom: 10px;
          ${theme.typography.headingXL}
          text-align: center;
        }
        @media (min-width: ${theme.breakpoints.SM}) {
          legend {
            text-align: left;
          }
        }
      `}</style>
    </fieldset>
  )
}

export default SettingsFieldset
