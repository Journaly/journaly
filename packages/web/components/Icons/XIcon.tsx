import * as React from 'react'
interface SVGRProps {
  title?: string
  titleId?: string
  size?: number
  color?: string
}

function XIcon({
  title,
  titleId,
  size,
  color,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) {
  if (!size) size = 24

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <path fill="none" d="M0 0h24v24H0V0z" />
      <path
        fill={color}
        d="M18.3 5.71a.996.996 0 00-1.41 0L12 10.59 7.11 5.7A.996.996 0 105.7 7.11L10.59 12 5.7 16.89a.996.996 0 101.41 1.41L12 13.41l4.89 4.89a.996.996 0 101.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
      />
    </svg>
  )
}

export default XIcon
