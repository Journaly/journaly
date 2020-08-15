import React from 'react'
import Link from 'next/link'
import theme from '../../../theme'
import {
  AuthorWithLanguagesFragmentFragment as Author,
  LanguageNative as LanguageNativeType,
  LanguageLearning as LanguageLearningType,
} from '../../../generated/graphql'
import BlankAvatarIcon from '../../Icons/BlankAvatarIcon'
import { languageNameWithDialect } from '../../../utils/languages'

type PostAuthorCardProps = {
  author: Author | any
}

const PostAuthorCard: React.FC<PostAuthorCardProps> = ({ author }) => {
  let languages: (LanguageNativeType | LanguageLearningType)[] = []

  for (let language of author.languagesLearning) {
    languages.push(language)
  }
  for (let language of author.languagesNative) {
    languages.push(language)
  }

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
          {languages.map(({ language }) => {
            return <li key={language.id}>{languageNameWithDialect(language)}</li>
          })}
        </ul>
      </div>
      <style jsx>{`
        .container {
          background-color: ${theme.colors.white};
          box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
          width: 100%;
          height: 100%;
          padding: 20px;
          margin-bottom: 25px;
        }

        @media (min-width: ${theme.breakpoints.XS}) {
          .container {
            width: 38%;
            margin-bottom: 0;
          }
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
