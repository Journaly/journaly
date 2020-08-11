import React from 'react'
import theme from '../../../theme'

const PostAuthorCard: React.FC = () => {
  return (
    <div className="container">
      <h1>Comments</h1>
      <style jsx>{`
        .container {
          background-color: ${theme.colors.white};
          box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
          width: 58%;
          padding: 20px;
          text-align: center;
        }

        h1 {
          ${theme.typography.headingLG};
        }
      `}</style>
    </div>
  )
}

export default PostAuthorCard
