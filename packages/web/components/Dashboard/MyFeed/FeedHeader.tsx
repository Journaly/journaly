import React from 'react'
import { LanguageLevel, User } from '@/generated/graphql'
import theme from '@/theme'
import { greetings } from './greetings'

type Props = {
  currentUser: User
}

const FeedHeader: React.FC<Props> = ({ currentUser }) => {
  let greetingLanguage = 'English'

  if (currentUser.languages.length === 1) {
    greetingLanguage = currentUser.languages[0].language.name
  }

  const learningLanguages = currentUser.languages.filter(
    ({ level }) => level !== LanguageLevel.Native,
  )

  if (learningLanguages.length > 0) {
    const index = Math.floor(Math.random() * learningLanguages.length)
    const greetingLanguageName = learningLanguages[index].language.name
    const greetingLanguageDialect = learningLanguages[index].language.dialect

    const greetingLanguageKey = greetingLanguageDialect
      ? `${greetingLanguageDialect} ${greetingLanguageName}`
      : greetingLanguageName
    greetingLanguage = greetings[greetingLanguageKey] ? greetingLanguageKey : 'English'
  }

  const rightToLeftLanguages = ['Arabic', 'Persian']

  return (
    <>
      {rightToLeftLanguages.includes(greetingLanguage) ? (
        <h1 data-testid="my-feed-header">
          !{currentUser.name || currentUser.handle} {greetings[greetingLanguage]}
        </h1>
      ) : (
        <h1 data-testid="my-feed-header">
          {greetings[greetingLanguage]} {currentUser.name || currentUser.handle}!
        </h1>
      )}
      <style jsx>
        {`
          h1 {
            margin: 0 auto 40px;
            text-align: center;
            ${theme.typography.headingXL};
          }
        `}
      </style>
    </>
  )
}

export default React.memo(FeedHeader)
