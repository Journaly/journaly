import React, { useState } from 'react'
import { ApolloQueryResult } from '@apollo/client'
import {
  LanguagesFormDataQuery,
  Language as LanguageType,
  LanguageLearning as LanguageLearningType,
  useAddLanguageLearningMutation,
  useRemoveLanguageLearningMutation,
} from '@generated'
import MultiSelect from '@elements/MultiSelect/MultiSelect'
import { languageNameWithDialect } from '@utils/languages'

type LanguageMutationType = (arg: { variables: { languageId: number } }) => Promise<any>

type Props = {
  languages: LanguageType[]
  learningLanguages: LanguageLearningType[]
  refetch?: () => Promise<ApolloQueryResult<LanguagesFormDataQuery>>
}

const LearningLanguageFormField: React.FC<Props> = ({ languages, learningLanguages, refetch }) => {
  const [addedLanguageId, setAddedLanguageId] = useState(-1)
  const [removedLanguageId, setRemovedLanguageId] = useState(-1)
  const [selectedLearningLanguages, setSelectedLearningLanguages] = useState(
    learningLanguages.map(({ language }) => language.id.toString()),
  )
  const formattedLanguageOptions = languages.map((language) => {
    const value = language.id.toString()
    const displayName = languageNameWithDialect(language)

    return { value, displayName }
  })

  const [addLearningLanguage, { loading: addingLearningLanguage }] = useAddLanguageLearningMutation(
    {
      onCompleted: () => {
        setSelectedLearningLanguages([...selectedLearningLanguages, addedLanguageId.toString()])
        setAddedLanguageId(-1)
      },
    },
  )
  const [
    removeLearningLanguage,
    { loading: removingLearningLanguage },
  ] = useRemoveLanguageLearningMutation({
    onCompleted: () => {
      setSelectedLearningLanguages(
        selectedLearningLanguages.filter((value) => value !== removedLanguageId.toString()),
      )
      setRemovedLanguageId(-1)
    },
  })

  const mutateLanguageM2M = (mutation: LanguageMutationType) => async (languageId: number) => {
    await mutation({ variables: { languageId } })
    refetch && refetch()
  }

  const onLearningAdd = mutateLanguageM2M(addLearningLanguage)
  const onLearningRemove = mutateLanguageM2M(removeLearningLanguage)

  const handleAddLearningLanguage = (value: string) => {
    const languageId = parseInt(value, 10)
    setAddedLanguageId(languageId)
    onLearningAdd(languageId)
  }

  const handleRemoveLearningLanguage = (value: string) => {
    const languageId = parseInt(value, 10)
    setRemovedLanguageId(languageId)
    onLearningRemove(languageId)
  }

  return (
    <MultiSelect
      loading={addingLearningLanguage || removingLearningLanguage}
      options={formattedLanguageOptions}
      selectedOptionValues={selectedLearningLanguages}
      onAdd={handleAddLearningLanguage}
      onRemove={handleRemoveLearningLanguage}
      placeholder="Select a language"
      id="learning-languages"
      name="learning-languages"
    />
  )
}

export default LearningLanguageFormField
