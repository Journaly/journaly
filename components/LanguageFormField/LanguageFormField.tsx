import React, { useState } from 'react'
import { ApolloQueryResult } from '@apollo/client'
import {
  LanguagesFormDataQuery,
  Language as LanguageType,
  LanguageRelation as LanguageRelationType,
  useAddLanguageRelationMutation,
  useRemoveLanguageRelationMutation,
} from '../../generated/graphql'
import MultiSelect from '../../elements/MultiSelect/MultiSelect'
import { languageNameWithDialect } from '../../utils/languages'

type LanguageMutationType = (arg: { variables: { languageId: number } }) => Promise<any>

type Props = {
  languages: LanguageType[]
  languageRelations: LanguageRelationType[]
  refetch?: () => Promise<ApolloQueryResult<LanguagesFormDataQuery>>
}

const LanguageFormField: React.FC<Props> = ({ languages, languageRelations, refetch }) => {
  const [addedLanguageId, setAddedLanguageId] = useState(-1)
  const [removedLanguageId, setRemovedLanguageId] = useState(-1)
  const [selectedLanguageRelations, setSelectedLanguageRelations] = useState(
   languageRelations.map(({ language }) => language.id.toString()),
  )
  const formattedLanguageOptions = languages.map((language) => {
    const value = language.id.toString()
    const displayName = languageNameWithDialect(language)

    return { value, displayName }
  })

  const [addLanguageRelation, { loading: addingLanguageRelation }] = useAddLanguageRelationMutation(
    {
      onCompleted: () => {
        setSelectedLanguageRelations([...selectedLanguageRelations, addedLanguageId.toString()])
        setAddedLanguageId(-1)
      },
    },
  )
  const [
    removeLanguageRelation,
    { loading: removingLanguageRelation },
  ] = useRemoveLanguageRelationMutation({
    onCompleted: () => {
      setSelectedLanguageRelations(
        selectedLanguageRelations.filter((value) => value !== removedLanguageId.toString()),
      )
      setRemovedLanguageId(-1)
    },
  })

  const mutateLanguageM2M = (mutation: LanguageMutationType) => async (languageId: number) => {
    await mutation({ variables: { languageId } })
    refetch && refetch()
  }

  const onLanguageAdd = mutateLanguageM2M(addLanguageRelation)
  const onLanguageRemove = mutateLanguageM2M(removeLanguageRelation)

  const handleAddLanguageRelation = (value: string) => {
    const languageId = parseInt(value, 10)
    setAddedLanguageId(languageId)
    onLanguageAdd(languageId)
  }

  const handleRemoveLanguageRelation = (value: string) => {
    const languageId = parseInt(value, 10)
    setRemovedLanguageId(languageId)
    onLanguageRemove(languageId)
  }

  return (
    <MultiSelect
      loading={addingLanguageRelation || removingLanguageRelation}
      options={formattedLanguageOptions}
      selectedOptionValues={selectedLanguageRelations}
      onAdd={handleAddLanguageRelation}
      onRemove={handleRemoveLanguageRelation}
      placeholder="Select a language"
      id="learning-languages"
      name="learning-languages"
    />
  )
}

export default LanguageFormField
