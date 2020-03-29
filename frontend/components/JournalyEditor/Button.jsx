import React from 'react'
import { darkGrey } from '../../utils/colors'

const Button = React.forwardRef(
  ({ active, reversed, iconSrc, iconAlt, ...props }, ref) => (
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
  )
)

export default Button
