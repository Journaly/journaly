import theme from '@/theme'
import * as React from 'react'
interface SVGRProps {
  title?: string
  titleId?: string
  saved?: boolean
  size?: number
}

function BookmarkIcon({
  title,
  titleId,
  saved = false,
  size = 24,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path
        fill={theme.colors.blueLight}
        d={`M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z${
          saved ? '' : 'm0 15l-5-2.18L7 18V5h10v13z'
        }`}
      />
    </svg>
  )
}

export default BookmarkIcon
