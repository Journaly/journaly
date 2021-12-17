import * as React from 'react'
import theme from '@/theme'

interface SVGRProps {
  title?: string
  titleId?: string
}

function LogOutIcon({ title, titleId, ...props }: React.SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={24.367}
      viewBox="0 0 25 24.367"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <clipPath id="prefix__a">
          <path
            data-name="Path 254"
            d="M14.436-7.841L13.2-6.6a1.334 1.334 0 01-1.892 0L.459-17.443a1.334 1.334 0 010-1.892l10.847-10.847a1.334 1.334 0 011.892 0l1.239 1.239a1.341 1.341 0 01-.022 1.914L7.69-20.624h16.036a1.336 1.336 0 011.339 1.339v1.785a1.336 1.336 0 01-1.339 1.339H7.69l6.724 6.406a1.331 1.331 0 01.022 1.914z"
            transform="translate(-.066 30.575)"
            fill={theme.colors.blueLight}
            clipRule="evenodd"
          />
        </clipPath>
        <clipPath id="prefix__b">
          <path
            data-name="Path 253"
            d="M0-5.947h25.053V-31H0z"
            transform="translate(0 31)"
            fill={theme.colors.blueLight}
          />
        </clipPath>
        <clipPath id="prefix__c">
          <path data-name="Rectangle 737" fill={theme.colors.blueLight} d="M0 0h25.053v25.053H0z" />
        </clipPath>
        <clipPath id="prefix__d">
          <path
            data-name="Path 252"
            d="M0-31h25.053v25.053H0z"
            transform="translate(0 31)"
            fill={theme.colors.blueLight}
            clipRule="evenodd"
          />
        </clipPath>
      </defs>
      <g data-name="Group 352">
        <g data-name="Group 351" clipPath="url(#prefix__a)">
          <g data-name="Group 350" transform="translate(-.053 -.343)" clipPath="url(#prefix__b)">
            <g data-name="Group 349" clipPath="url(#prefix__c)">
              <g data-name="Group 348" clipPath="url(#prefix__d)">
                <g data-name="Group 347" clipPath="url(#prefix__b)">
                  <path
                    data-name="Path 250"
                    d="M-4.041-4.041h33.135v33.135H-4.041z"
                    fill={theme.colors.blueLight}
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default LogOutIcon
