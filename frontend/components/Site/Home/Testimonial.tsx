import React from 'react'
import { lightBlue } from '../../../utils'

const createListOfLanguages = (languages: string[]) => {
  if (languages.length === 1) return languages[0]
  if (languages.length === 2) return `${languages[0]} and ${languages[1]}`

  const allButLast = [...languages.slice(0, languages.length - 1)]
  return `${allButLast.join(', ')}, and ${languages.slice(-1)[0]}`
}

type Props = {
  quote: string
  speaks: string[]
  writes: string[]
  name: string
  picture: string
}

const Testimonial: React.FC<Props> = ({
  quote,
  speaks,
  writes,
  name,
  picture,
}) => {
  return (
    <div className="testimonial">
      <p className="user-quote">{quote}</p>
      <div className="user-info-wrapper">
        <img src={picture} alt="profile picture of Journaly reviewer" />
        <div className="user-info">
          <p className="user-name">{name}</p>
          <p>Speaks {createListOfLanguages(speaks)}</p>
          <p>Writes in {createListOfLanguages(writes)}</p>
        </div>
      </div>
      <style jsx>{`
        .testimonial {
          width: 320px;
          padding: 25px;
          background-color: white;
          border-radius: 5px;
          box-shadow: 0px 8px 10px #00000029;
        }

        @media screen and (min-width: 550px) {
          .testimonial {
            width: 370px;
          }
        }

        .user-quote {
          position: relative;
        }

        .user-quote::before {
          content: '“';
          position: absolute;
          top: 10px;
          left: -22px;
          font-family: 'Playfair Display', serif;
          font-size: 100px;
          color: ${lightBlue};
          opacity: 0.19;
        }

        .user-info-wrapper {
          display: flex;
          align-items: center;
          margin-top: 15px;
        }

        img {
          width: 90px;
          height: 90px;
          margin-right: 15px;
          border-radius: 50%;
        }

        .user-info {
          font-style: italic;
        }

        .user-name {
          font-weight: bold;
          font-style: normal;
        }
      `}</style>
    </div>
  )
}

export default Testimonial
