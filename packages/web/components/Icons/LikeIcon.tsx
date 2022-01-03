import * as React from 'react'
import theme from '@/theme'
interface SVGRProps {
  title?: string
  titleId?: string
  filled?: boolean
}

function LikeIcon({
  title,
  titleId,
  filled = false,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    <svg width={16} height={14} viewBox="-0.5 -0.5 17 15" aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        d="M14.721 1.275a4.3 4.3 0 00-6.119 0l-.6.6-.6-.6a4.331 4.331 0 00-6.127 6.123l6.721 6.721 6.721-6.721a4.3 4.3 0 000-6.119"
        fill={filled ? theme.colors.blueLight : theme.colors.white}
        fillRule="evenodd"
        data-name="Group 383"
        stroke={theme.colors.blueLight}
      />
    </svg>
  )
}

export default LikeIcon
