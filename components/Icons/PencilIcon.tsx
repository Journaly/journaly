import * as React from 'react'
interface SVGRProps {
  title?: string
  titleId?: string
  size: number
}

function PencilIcon({ title, titleId, size, ...props }: React.SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    <svg
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path fill="none" d="M0 0h24v24H0z" />
      <g
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        id="g-stroke"
      >
        <path d="M2.967 15.906c-.068.068-2.345 6.49-2.345 6.49-.23.556.39 1.235.99.99 0 0 6.456-2.243 6.524-2.31M1.084 21.112l1.819 1.818" />
        <path d="M22.962 4.003L20.039 1.08a1.588 1.588 0 00-2.247 0L2.967 15.906l5.169 5.17L22.962 6.25c.62-.62.62-1.626 0-2.247zM6.096 19.036l12.101-12.1" />
      </g>
    </svg>
  )
}

export default PencilIcon
