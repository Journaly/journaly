import theme from '@/theme'
import React from 'react'

type SwitchToggleProps = {
  isToggled: boolean
  onToggle: () => void
}

const SwitchToggle: React.FC<SwitchToggleProps> = ({ isToggled, onToggle }) => {
  console.log(isToggled)
  return (
    <label className="switch">
      <input type="checkbox" checked={isToggled} onChange={onToggle}></input>
      <span className="slider"></span>
      <style jsx>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: ${theme.colors.gray300};
          transition: background 0.4s;
          border-radius: 24px;
        }

        .slider::before {
          position: absolute;
          content: '';
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: ${theme.colors.white};
          transition: transform 0.4s;
          border-radius: 15px;
        }

        input:checked + .slider {
          background-color: ${theme.colors.blueLight};
        }

        input:checked + .slider::before {
          transform: translateX(26px);
        }
      `}</style>
    </label>
  )
}

export default SwitchToggle
