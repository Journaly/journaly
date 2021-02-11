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
    const index = Math.floor(Math.random() * currentUser.languages.length)
    const greetingLanguageKey = currentUser.languages[index].language.name
    greetingLanguage = greetings[greetingLanguageKey] ? greetingLanguageKey : 'English'
  }

  const rightToLeftLanguages = ['Arabic', 'Persian']

  return (
    <>
      {rightToLeftLanguages.includes(greetingLanguage) ? (
        <h1>
          !{currentUser.name || currentUser.handle} {greetings[greetingLanguage]}
        </h1>
      ) : (
        <h1>
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
