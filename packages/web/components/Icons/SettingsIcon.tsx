import * as React from 'react'
import theme from '@/theme'

interface SVGRProps {
  title?: string
  titleId?: string
}

function SettingsIcon({ title, titleId, ...props }: React.SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path data-name="Path 255" d="M0 0h24v24H0z" fill="none" />
      <path
        data-name="Path 256"
        d="M20.917 13.176A9.352 9.352 0 0021.001 12a9.352 9.352 0 00-.084-1.176l2.532-1.98a.605.605 0 00.144-.768l-2.4-4.152a.6.6 0 00-.732-.264l-2.988 1.2a8.767 8.767 0 00-2.028-1.176L14.989.5a.585.585 0 00-.588-.5h-4.8a.585.585 0 00-.588.5l-.458 3.184A9.219 9.219 0 006.529 4.86l-2.988-1.2a.585.585 0 00-.732.264l-2.4 4.152a.592.592 0 00.144.768l2.532 1.98A9.517 9.517 0 003.001 12a9.517 9.517 0 00.084 1.176l-2.53 1.98a.605.605 0 00-.144.768l2.4 4.152a.6.6 0 00.732.264l2.988-1.2a8.767 8.767 0 002.024 1.176l.456 3.18a.585.585 0 00.588.5h4.8a.585.585 0 00.588-.5l.456-3.18a9.219 9.219 0 002.028-1.176l2.988 1.2a.585.585 0 00.732-.264l2.4-4.152a.605.605 0 00-.144-.768zM12.001 16.2a4.2 4.2 0 114.2-4.2 4.2 4.2 0 01-4.2 4.2z"
        fill={theme.colors.blueLight}
      />
    </svg>
  )
}

export default SettingsIcon
