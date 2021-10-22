import React from 'react'
import theme from '@/theme'

const FourOhFourPage = () => {
  return (
    <div className="container">
      <h1>404</h1>
      <p>Oops! The Page you are looking for could not be found</p>
      <style jsx>{`
        .container {
          max-width: 900px;
          margin: 30vh auto;
          padding: 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: ${theme.colors.white};
          box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
        }

        h1 {
          text-align: center;
          font-weight: 700;
          font-size: 28px;
          margin-bottom: 20px;
        }

        p {
          margin-bottom: 35px;
        }
      `}</style>
    </div>
  )
}

export default FourOhFourPage
