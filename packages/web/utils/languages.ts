import {LanguageLevel} from '@/generated/graphql'

type LanguageName = {
  name: string
  dialect?: string | null
}

export function languageNameWithDialect({ name, dialect }: LanguageName): string {
  return dialect ? `${name} (${dialect})` : name
}

export function languageLevelToNumber(level: LanguageLevel) {
  switch (level) {
    case LanguageLevel.Beginner:
      return 0
    case LanguageLevel.Intermediate:
      return 1
    case LanguageLevel.Advanced:
      return 2
    case LanguageLevel.Native:
      return 3
    default:
      return 0
  }
}

