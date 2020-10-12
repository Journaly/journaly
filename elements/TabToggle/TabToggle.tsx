import React from 'react'
import theme from '../../theme'
import classNames from 'classnames'

type Tab = {
  key: string
  text: string
}

type Props = {
  activeKey: string
  tabs: Tab[]
  onToggle: (key: string) => void
  className?: string
}

const spaceUnit = 5

const TabToggle: React.FC<Props> = (props) => {
  const { activeKey, onToggle, tabs, className } = props
  const tabToggleClasses = classNames('tab-toggle', className)

  if (tabs.length !== 2) {
    throw new Error('TabToggle must contain 2 and only 2 tabs')
  }

  return (
    <div className="tab-toggle-wrapper">
      <div className={tabToggleClasses} role="group">
        {tabs.map(({ key, text }) => (
          <div
            className={classNames('tab', { active: activeKey === key })}
            key={`tab-${key}`}
            onClick={() => onToggle(key)}
            onKeyUp={(e: React.KeyboardEvent) => {
              if (e.key === 'Enter') {
                onToggle(key)
              }
            }}
            tabIndex={0}
            data-test={`tab-${key}`}
          >
            {text}
          </div>
        ))}

        <div className="tab-background" />
      </div>

      <style jsx>{`
        .tab-toggle-wrapper {
          padding: ${spaceUnit}px;
          background: #d5d9dc;
          border-radius: ${6 * spaceUnit}px;
        }
        .tab-toggle {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: ${2 * spaceUnit}px;
        }

        .tab-background {
          position: absolute;
          top: 50%;
          height: 100%;
          width: calc(50% - ${spaceUnit}px);
          background: ${theme.colors.white};
          box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);
          border-radius: ${6 * spaceUnit}px;
          transition: transform 150ms ease;
        }

        .tab {
          display: block;
          padding: 12px 15px;
          color: #71767b;
          text-align: center;
          cursor: pointer;
          ${theme.typography.paragraphLG};
          font-weight: 600;
          transition: color 150ms ease-in;
          border-radius: ${6 * spaceUnit}px;
          outline: 0;
          z-index: 1;
        }

        .tab.active,
        .tab:hover {
          color: #343b42;
        }

        .tab.active:nth-child(1) ~ .tab-background {
          transform: translateX(0) translateY(-50%);
        }
        .tab.active:nth-child(2) ~ .tab-background {
          transform: translateX(calc(100% + ${2 * spaceUnit}px)) translateY(-50%);
        }
      `}</style>
    </div>
  )
}

export default TabToggle
