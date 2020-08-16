import * as React from 'react'
import theme from '../../theme'
interface SVGRProps {
  title?: string
  titleId?: string
  size: number
}

function EditIcon({ title, titleId, size, ...props }: React.SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    <svg
      height={size}
      viewBox="0 0 512 512"
      width={size}
      fill={theme.colors.charcoal}
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M470.627 113.361l-72.129-72.005c-12.496-12.476-32.76-12.476-45.256 0l-52.33 52.239 117.387 117.186 52.328-52.239c12.498-12.476 12.498-32.705 0-45.181zM50.881 480s132.379-34.221 133.721-36.117a31.352 31.352 0 002.004-1.805L402.74 226.311 285.355 109.126 69.217 324.893a31.957 31.957 0 00-1.947 2.152C65.617 328.18 32 461.15 32 461.15 31.998 471.559 40.453 480 50.881 480zm44.603-136.15l19.551 19.541c9.645-1.711 24.262-4.178 39.324-6.654-2.232 14.117-4.693 29.402-6.406 39.551l19.619 19.609c-12.123 3.535-41.607 11.443-75.1 20.246l-16.807-16.777c8.196-31.932 16.224-62.747 19.819-75.516z" />
    </svg>
  )
}

export default EditIcon
