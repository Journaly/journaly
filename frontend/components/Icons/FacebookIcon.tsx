import * as React from 'react'
interface SVGRProps {
  title?: string
  titleId?: string
  size?: number
}

function FacebookIcon({
  title,
  titleId,
  size = 60,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <g data-name="Group 435">
        <g data-name="Ellipse 5" fill="none" stroke="#fff" strokeWidth={2}>
          <circle cx={30} cy={30} r={30} stroke="none" />
          <circle cx={30} cy={30} r={29} />
        </g>
        <g data-name="Symbol 3 \u2013 1">
          <path
            data-name="Path 1"
            d="M31.749 43V31.24h4.016l.574-4.59h-4.59v-2.866c0-1.291.43-2.295 2.295-2.295h2.438v-4.162c-.574 0-2.008-.143-3.582-.143-3.442 0-5.88 2.151-5.88 6.024v3.442H23v4.59h4.016V43z"
            fill="#fff"
            fillRule="evenodd"
          />
        </g>
      </g>
    </svg>
  )
}

export default FacebookIcon
