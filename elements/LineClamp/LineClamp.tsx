import React from 'react'

type Props = {
  lines: number
  text: string
}

const LineClamp: React.FC<Props> = ({ lines, text }) => {
  return (
    <div className="text-wrapper">
      <div className="text-to-clamp">{text}</div>

      <style jsx>{`
        .text-to-clamp {
          -webkit-line-clamp: ${lines};
          -webkit-box-orient: vertical;
          overflow: hidden;
          display: -webkit-box;
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  )
}

export default LineClamp
