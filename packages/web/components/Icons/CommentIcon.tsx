import * as React from 'react'
interface SVGRProps {
  title?: string
  titleId?: string
}

function CommentIcon({ title, titleId, ...props }: React.SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    <svg
      data-name="Group 392"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        d="M5 8a.945.945 0 001 1h4a1 1 0 001-1 .945.945 0 00-1-1H6a1 1 0 00-1 1zM0 5a4.951 4.951 0 015-5h6a4.951 4.951 0 015 5v10a.945.945 0 01-1 1H5a4.951 4.951 0 01-5-5z"
        fill="#4391c9"
        fillRule="evenodd"
      />
    </svg>
  )
}

export default CommentIcon
