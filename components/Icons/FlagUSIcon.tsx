import * as React from 'react'
interface SVGRProps {
  title?: string;
  titleId?: string;
}

function FlagUSIcon({ title, titleId, ...props }: React.SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    <svg viewBox="0 0 7410 3900" aria-labelledby={titleId}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path fill="#b22234" d="M0 0h7410v3900H0z" />
      <path
        d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0"
        stroke="#fff"
        strokeWidth={300}
      />
      <path fill="#3c3b6e" d="M0 0h2964v2100H0z" />
      <g fill="#fff">
        <g id="usf_d">
          <g id="usf_c">
            <g id="usf_e">
              <g id="usf_b">
                <path
                  id="usf_s"
                  d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z"
                />
                <use xlinkHref="#usf_s" y={420} />
                <use xlinkHref="#usf_s" y={840} />
                <use xlinkHref="#usf_s" y={1260} />
              </g>
              <use xlinkHref="#usf_s" y={1680} />
            </g>
            <use xlinkHref="#usf_b" x={247} y={210} />
          </g>
          <use xlinkHref="#usf_c" x={494} />
        </g>
        <use xlinkHref="#usf_d" x={988} />
        <use xlinkHref="#usf_c" x={1976} />
        <use xlinkHref="#usf_e" x={2470} />
      </g>
    </svg>
  )
}

export default FlagUSIcon
