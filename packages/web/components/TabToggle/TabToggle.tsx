import React from 'react'
import theme from '@/theme'
import classNames from 'classnames'

type Tab = {
  key: string
  text: string
}

export enum ToggleVariant {
  Standard = 'standard',
  Thin = 'thin',
}

type Props = {
  activeKey: string
  tabs: Tab[]
  onToggle: (key: string) => void
  className?: string
  variant?: ToggleVariant
}

const spaceUnit = 5

const TabToggle: React.FC<Props> = (props) => {
  const { activeKey, onToggle, tabs, className, variant = ToggleVariant.Standard } = props
  const tabToggleClasses = classNames('tab-toggle', className)
  const activeTabIndex = tabs.findIndex((tab) => tab.key === activeKey)

  return (
    <div className={`tab-toggle-wrapper ${variant}`}>
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
            data-testid={`tab-${key}`}
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
          grid-template-columns: ${new Array(tabs.length).fill('1fr').join(' ')};
          grid-gap: ${2 * spaceUnit}px;
        }

        .tab-background {
          position: absolute;
          top: 50%;
          height: 100%;
          width: calc(${100 / tabs.length}%);
          background: ${theme.colors.white};
          box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);
          border-radius: ${6 * spaceUnit}px;
          transition: transform 150ms ease;
          transform: translateX(calc(${100 * activeTabIndex}% + ${activeTabIndex * 2 * 0}px))
            translateY(-50%);
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

        .${ToggleVariant.Standard} .tab {
          padding: 4px 12px;
        }

        .tab.active,
        .tab:hover {
          color: #343b42;
        }

        .tab.active:nth-child(1) ~ .tab-background {
          /* transform: translateX(0) translateY(-50%); */
        }
        .tab.active:nth-child(2) ~ .tab-background {
          /* transform: translateX(calc(100% + ${2 * spaceUnit}px)) translateY(-50%); */
        }
      `}</style>
    </div>
  )
}

export default TabToggle
