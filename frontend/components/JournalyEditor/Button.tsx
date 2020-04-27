import React from 'react'
import { darkGrey } from '../../utils/colors'

type Ref = HTMLImageElement

type Props = {
  active: boolean
  iconSrc: string
  iconAlt: string
}

const Button = React.forwardRef<Ref, Props>(
  ({ active, iconSrc, iconAlt, ...props }, ref) => (
    <>
      <img
        className={active ? 'active' : ''}
        src={iconSrc}
        alt={iconAlt}
        ref={ref}
        {...props}
      />
      <style jsx>{`
        margin-right: 10px;
        border-radius: 5px;
        background-color: ${darkGrey};

        img:hover {
          box-shadow: 0px 8px 10px #00000029;
          fill: red;
        }
      `}</style>
    </>
  ),
)

export default Button
