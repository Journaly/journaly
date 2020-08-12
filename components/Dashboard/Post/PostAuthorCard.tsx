import React from 'react'
import Link from 'next/link'
import theme from '../../../theme'
import { AuthorWithLanguagesFragmentFragment as Author } from '../../../generated/graphql'
import BlankAvatarIcon from '../../Icons/BlankAvatarIcon'

type PostAuthorCardProps = {
  author: Author
}

const PostAuthorCard: React.FC<PostAuthorCardProps> = ({ author }) => {
  return (
    <div className="container">
      <Link href={`/dashboard/profile/${author.id}`}>
        <a className="author-info">
          {author.profileImage ? (
            <img src={author.profileImage} alt="" />
          ) : (
            <BlankAvatarIcon size={60} />
          )}
          <p className="author-name">{author.handle}</p>
        </a>
      </Link>
      <div className="language-info">
        <p className="author-info-heading">Languages</p>
        <ul>
          {author.languagesLearning.map((language) => (
            <li key={language.language.id}>{language.language.name}</li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .container {
          background-color: ${theme.colors.white};
          box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
          width: 38%;
          padding: 20px;
        }

        .author-info {
          display: flex;
          align-items: center;
          padding-bottom: 10px;
          margin-bottom: 5px;
          border-bottom: 1px solid ${theme.colors.gray400};
        }

        .author-info img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 10px;
        }

        .author-info :global(svg) {
          border-radius: 50%;
          background-color: ${theme.colors.blueLight};
          margin-right: 10px;
        }

        .author-info-heading {
          ${theme.typography.headingSM};
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}

export default PostAuthorCard
