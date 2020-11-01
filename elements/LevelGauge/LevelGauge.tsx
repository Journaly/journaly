import React from 'react'
import { LanguageLevel } from '../../generated/graphql'
import {languageLevelToNumber} from '../../utils/languages'
import theme from '../../theme'

type Props = {
  level: LanguageLevel
}

const LevelGauge: React.FC<Props> = ({ level }) => {
  const levelNum = languageLevelToNumber(level) + 1
  
  return (
    <div>
      <span />
      <span />
      <span />
      <span />
      <style jsx>{`
        div {
          display: flex;
          margin-left: 2px;
        } 
        span {
          height: 10px;
          width: 2px;
          background: ${theme.colors.gray400};
          border-radius: 1px;
          margin-right: 4px;
        }

        span:nth-child(-n+${levelNum}) {
          background: ${theme.colors.blueLight}
        }
      `}
      </style>
    </div>
  )
}

export default LevelGauge
