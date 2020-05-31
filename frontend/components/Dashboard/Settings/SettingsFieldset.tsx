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
          ${theme.typography.headingXL}
          margin-bottom: 10px;
        }
      `}</style>
    </fieldset>
  )
}

export default SettingsFieldset
