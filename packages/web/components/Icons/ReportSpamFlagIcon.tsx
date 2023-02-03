import theme from '@/theme'
import * as React from 'react'

interface SVGRProps {
  title?: string
  titleId?: string
  size?: number
}

function ReportSpamFlagIcon({
  title,
  titleId,
  size = 24,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 1200"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        d="M1111.2 27.75a24.99 24.99 0 00-12.77-2.36c-4.39.35-8.61 1.86-12.23 4.36-2 1.5-194.5 138.5-400 47.25C501.7-4.25 301.45 26.5 224.95 43.25V25c0-8.93-4.77-17.18-12.5-21.65a25.028 25.028 0 00-25 0A25.017 25.017 0 00174.95 25v1150c0 8.93 4.77 17.18 12.5 21.65a25.028 25.028 0 0025 0 25.017 25.017 0 0012.5-21.65V594.5c59.75-13.75 261.5-50 439.75 28.25A416.217 416.217 0 00835.2 659a514.746 514.746 0 00279.5-88.75 25.004 25.004 0 0010.25-20.25V50c-.02-4.62-1.3-9.14-3.73-13.07a24.902 24.902 0 00-10.02-9.18h0zm-36.25 508.75c-42.75 26.75-211.5 119.75-389.75 40.5-183.25-81.25-383.5-50-460.25-34V94.5c59.75-13.75 261.5-50 439.75 28.25s337.75 11.75 410.25-28V536.5z"
        stroke={theme.colors.red}
        strokeMiterlimit={10}
        strokeWidth={30}
        fill={theme.colors.red}
      />
    </svg>
  )
}

export default ReportSpamFlagIcon
