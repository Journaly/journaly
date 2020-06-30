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

const TabToggle: React.FC<Props> = (props) => {
  const { activeKey, onToggle, tabs, className } = props
  const tabToggleClasses = classNames('tab-toggle', className)

  return (
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

      <style jsx>{`
        .tab-toggle {
          display: flex;
          width: fit-content;
          padding: 5px;
          background: #d5d9dc;
          border-radius: 30px;
        }

        .tab {
          display: block;
          margin-right: 10px;
          padding: 12px 15px;
          color: #71767b;
          text-align: center;
          cursor: pointer;
          ${theme.typography.paragraphLG};
          font-weight: 600;
          transition: all 150ms ease-in;
          border-radius: 30px;
          outline: 0;
        }
        .tab.active {
          color: #343b42;
          box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);
          background: ${theme.colors.white};
        }

        .tab:last-child {
          margin-right: 0;
        }

        .tab:hover {
          background: ${theme.colors.white};
          color: #343b42;
        }
      `}</style>
    </div>
  )
}

export default TabToggle
