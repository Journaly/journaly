import theme from '@/theme'
import * as React from 'react'
interface SVGRProps {
  title?: string
  titleId?: string
  size: number
  color?: string
}

function DeleteIcon({
  title,
  titleId,
  size,
  color = theme.colors.black,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    <svg
      data-name="Layer 1"
      id="prefix__Layer_1"
      viewBox="0 0 24 24"
      aria-labelledby={titleId}
      height={size}
      width={size}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <style>{'.prefix__cls-1{fill:none}'}</style>
      </defs>
      <path
        className="prefix__cls-1"
        d="M9 3h6v2H9zM18.06 21l.88-14H5.06l.88 14h12.12zM13 10a1 1 0 012 0v8a1 1 0 01-2 0v-8zm-4 0a1 1 0 012 0v8a1 1 0 01-2 0v-8z"
      />
      <path
        d="M2 7h1.06L4 22.06A1 1 0 005 23h14a1 1 0 001-.94L20.94 7H22a1 1 0 000-2h-5V3a2 2 0 00-2-2H9a2 2 0 00-2 2v2H2a1 1 0 000 2zm7-4h6v2H9V3zM8 7h10.94l-.88 14H5.94L5.06 7H8z"
        fill={color}
      />
      <path
        d="M10 19a1 1 0 001-1v-8a1 1 0 00-2 0v8a1 1 0 001 1zM14 19a1 1 0 001-1v-8a1 1 0 00-2 0v8a1 1 0 001 1z"
        fill={color}
      />
    </svg>
  )
}

export default DeleteIcon
