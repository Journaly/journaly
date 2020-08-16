type LanguageName = {
  name: string
  dialect?: string | null
}

export function languageNameWithDialect({ name, dialect }: LanguageName): string {
  return dialect ? `${name} (${dialect})` : name
}
