import React from 'react'
import theme from '../../../theme'

const PostAuthorCard: React.FC = () => {
  return (
    <div className="container">
      <h1>Comments</h1>
      <p>Coming soon!</p>
      <style jsx>{`
        .container {
          background-color: ${theme.colors.white};
          box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
          width: 100%;
          padding: 20px;
          text-align: center;
        }

        @media (min-width: ${theme.breakpoints.XS}) {
          .container {
            width: 58%;
          }
        }

        h1 {
          ${theme.typography.headingLG};
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  )
}

export default PostAuthorCard
