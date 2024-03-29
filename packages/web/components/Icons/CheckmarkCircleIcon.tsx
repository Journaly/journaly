import theme from '@/theme'
import * as React from 'react'
interface SVGRProps {
  title?: string
  titleId?: string
  size?: number
  color?: string
}

function CheckmarkCircleIcon({
  title,
  titleId,
  size = 24,
  color = 'blue',
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) {
  let fill
  if (color === 'blue') fill = theme.colors.blueLight
  if (color === 'white') fill = theme.colors.white
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      aria-labelledby={titleId}
      height={size}
      width={size}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        fill={fill}
        d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm106.5 150.5L228.8 332.8h-.1c-1.7 1.7-6.3 5.5-11.6 5.5-3.8 0-8.1-2.1-11.7-5.7l-56-56c-1.6-1.6-1.6-4.1 0-5.7l17.8-17.8c.8-.8 1.8-1.2 2.8-1.2 1 0 2 .4 2.8 1.2l44.4 44.4 122-122.9c.8-.8 1.8-1.2 2.8-1.2 1.1 0 2.1.4 2.8 1.2l17.5 18.1c1.8 1.7 1.8 4.2.2 5.8z"
      />
    </svg>
  )
}

export default CheckmarkCircleIcon
