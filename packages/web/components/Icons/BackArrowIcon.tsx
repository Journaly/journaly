import theme from '@/theme'
import * as React from 'react'
interface SVGRProps {
  title?: string
  titleId?: string
  color?: string
}

function BackArrowIcon({
  title,
  titleId,
  color = theme.colors.white,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={24}
      viewBox="0 0 24 24"
      width={24}
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill={color} />
    </svg>
  )
}

export default BackArrowIcon
