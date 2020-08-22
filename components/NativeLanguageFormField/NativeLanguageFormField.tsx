import React, { useState } from 'react'
import { ApolloQueryResult } from '@apollo/client'
import {
  LanguagesFormDataQuery,
  Language as LanguageType,
  LanguageNative as LanguageNativeType,
  useAddLanguageNativeMutation,
  useRemoveLanguageNativeMutation,
} from '@generated'
import MultiSelect from '@elements/MultiSelect/MultiSelect'
import { languageNameWithDialect } from '@utils/languages'

type LanguageMutationType = (arg: { variables: { languageId: number } }) => Promise<any>

type Props = {
  languages: LanguageType[]
  nativeLanguages: LanguageNativeType[]
  refetch?: () => Promise<ApolloQueryResult<LanguagesFormDataQuery>>
}

const NativeLanguageFormField: React.FC<Props> = ({ languages, nativeLanguages, refetch }) => {
  const [addedLanguageId, setAddedLanguageId] = useState(-1)
  const [removedLanguageId, setRemovedLanguageId] = useState(-1)
  const [selectedNativeLanguages, setSelectedNativeLanguages] = useState(
    nativeLanguages.map(({ language }) => language.id.toString()),
  )
  const formattedLanguageOptions = languages.map((language) => {
    const value = language.id.toString()
    const displayName = languageNameWithDialect(language)

    return { value, displayName }
  })

  const [addNativeLanguage, { loading: addingNativeLanguage }] = useAddLanguageNativeMutation({
    onCompleted: () => {
      setSelectedNativeLanguages([...selectedNativeLanguages, addedLanguageId.toString()])
      setAddedLanguageId(-1)
    },
  })
  const [
    removeNativeLanguage,
    { loading: removingNativeLanguage },
  ] = useRemoveLanguageNativeMutation({
    onCompleted: () => {
      setSelectedNativeLanguages(
        selectedNativeLanguages.filter((value) => value !== removedLanguageId.toString()),
      )
      setRemovedLanguageId(-1)
    },
  })

  const mutateLanguageM2M = (mutation: LanguageMutationType) => async (languageId: number) => {
    await mutation({ variables: { languageId } })
    refetch && refetch()
  }

  const onNativeAdd = mutateLanguageM2M(addNativeLanguage)
  const onNativeRemove = mutateLanguageM2M(removeNativeLanguage)

  const handleAddNativeLanguage = (value: string) => {
    const languageId = parseInt(value, 10)
    setAddedLanguageId(languageId)
    onNativeAdd(languageId)
  }

  const handleRemoveNativeLanguage = (value: string) => {
    const languageId = parseInt(value, 10)
    setRemovedLanguageId(languageId)
    onNativeRemove(languageId)
  }

  return (
    <MultiSelect
      loading={addingNativeLanguage || removingNativeLanguage}
      options={formattedLanguageOptions}
      selectedOptionValues={selectedNativeLanguages}
      onAdd={handleAddNativeLanguage}
      onRemove={handleRemoveNativeLanguage}
      placeholder="Select a language"
      id="native-languages"
      name="native-languages"
    />
  )
}

export default NativeLanguageFormField
