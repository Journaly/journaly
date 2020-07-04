import * as React from 'react'
interface SVGRProps {
  title?: string
  titleId?: string
  size?: number
}

function GlobeIcon({
  title,
  titleId,
  size = 60,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <g data-name="Group 438">
        <g data-name="Ellipse 5" fill="none" stroke="#fff" strokeWidth={2}>
          <circle cx={30} cy={30} r={30} stroke="none" />
          <circle cx={30} cy={30} r={29} />
        </g>
        <g data-name="Symbol 5 \u2013 1">
          <path
            data-name="Path 4"
            d="M21.002 21.002a12.281 12.281 0 019.47-4.058 12.281 12.281 0 019.472 4.058 12.281 12.281 0 014.058 9.47 12.281 12.281 0 01-4.058 9.472 12.281 12.281 0 01-9.47 4.058 12.281 12.281 0 01-9.472-4.058c-2.48-2.708-4.058-5.639-4.058-9.472a12.281 12.281 0 014.058-9.47zm11.274 20.292q1.353 0 3.382-2.029a9.848 9.848 0 001.578-4.735 3.734 3.734 0 00-1.127-2.706 3.969 3.969 0 00-2.931-1.353h-2.255a6.583 6.583 0 01-2.029-.451 2.047 2.047 0 01-.676-1.578 1.171 1.171 0 01.451-.9 1.709 1.709 0 01.9-.451 1.539 1.539 0 011.127.676c.451.225.676.451.9.451a1.356 1.356 0 00.9-.225 1.356 1.356 0 00.225-.9 3.588 3.588 0 00-1.127-2.255 9.326 9.326 0 001.127-4.284.485.485 0 00-.451-.451 6.97 6.97 0 00-1.8-.451 11.278 11.278 0 00-5.862 1.8 5.676 5.676 0 00-2.027 4.511 5.773 5.773 0 001.803 4.281 6.16 6.16 0 004.284 1.8v.9a2.9 2.9 0 00.9 2.255 3.283 3.283 0 002.029 1.353v4.058c0 .225 0 .225.225.451s.228.233.454.233z"
            fill="#fff"
          />
        </g>
      </g>
    </svg>
  )
}

export default GlobeIcon
