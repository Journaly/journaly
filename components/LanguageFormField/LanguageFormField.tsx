import React from 'react'
import {
  LanguageFragmentFragment as LanguageType,
  LanguageRelation as LanguageRelationType,
  LanguageLevel,
  useAddLanguageRelationMutation,
  useRemoveLanguageRelationMutation,
} from '../../generated/graphql'
import Select from '../../elements/Select'
import Button, { ButtonVariant } from '../../elements/Button'
import { OptionPills } from '../../elements/MultiSelect'
import { languageNameWithDialect } from '../../utils/languages'
import theme from '../../theme'

type Props = {
  languages: LanguageType[]
  languageRelations: LanguageRelationType[]
  refetch: () => void 
}

const fullLevelName = (level: LanguageLevel) => {
  switch (level) {
    case LanguageLevel.Beginner: return 'Beginner'
    case LanguageLevel.Intermediate: return 'Intermediate'
    case LanguageLevel.Advanced: return 'Advanced'
    case LanguageLevel.Native: return 'Native'
  }
}

const abbrLevelName = (level: LanguageLevel) => {
  switch (level) {
    case LanguageLevel.Beginner: return 'BEG'
    case LanguageLevel.Intermediate: return 'INT'
    case LanguageLevel.Advanced: return 'ADV'
    case LanguageLevel.Native: return 'NAT'
  }
}

const LanguageFormField: React.FC<Props> = ({ languages, languageRelations, refetch }) => {
  const [addLanguageRelation, { loading: addingLanguageRelation }] =
    useAddLanguageRelationMutation()
  const [removeLanguageRelation, { loading: removingLanguageRelation }] =
    useRemoveLanguageRelationMutation()

  const userLanguageOptions = languageRelations.map(({ level, language }) => ({
    value: language.id,
    displayName: `${languageNameWithDialect(language)} [${abbrLevelName(level)}]`,
  }))

  const [selectedLangId, setSelectedLangId] = React.useState<number>(-1)
  const [selectedLevel, setSelectedLevel] = React.useState<LanguageLevel>(LanguageLevel.Beginner)

  const langOptions = languages
    .filter(({ id }) => !languageRelations.find(({ language }) => language.id === id ))
    .map(lang => ({
      value: lang.id,
      displayName: languageNameWithDialect(lang),
    }))

  const levelOptions = [
    LanguageLevel.Beginner,
    LanguageLevel.Intermediate,
    LanguageLevel.Advanced,
    LanguageLevel.Native,
  ].map(value => ({ value, displayName: fullLevelName(value) }))

  const handleAddLanguageRelation = async () => {
    await addLanguageRelation({
      variables: {
        languageId: selectedLangId,
        level: selectedLevel
      }
    })
    refetch()
  }

  const handleRemoveLanguageRelation = async (languageId: number) => {
    await removeLanguageRelation({ variables: { languageId } })
    refetch()
  }

  return (
    <div>
      <OptionPills
        selectedOptions={userLanguageOptions}
        onRemove={handleRemoveLanguageRelation}
      />

      <div className="lang-level-select">
        <Select
          placeholder={'Select a language...'}
          options={langOptions}
          value={selectedLangId}
          onChange={setSelectedLangId}
        />
        <Select
          placeholder={'Select a level...'}
          options={levelOptions}
          value={selectedLevel}
          onChange={setSelectedLevel}
        />
      </div>
      <Button
        onClick={handleAddLanguageRelation}
        disabled={selectedLangId === -1 || !selectedLevel}
        loading={removingLanguageRelation || addingLanguageRelation}
        variant={ButtonVariant.Secondary}
      >
        Add
      </Button>

      <style jsx>{`
        .lang-level-select {
          display: flex;
          padding-top: 15px;
          margin-bottom: 15px;
        }

        .lang-level-select > :global(*:not(:last-child)) {
          margin-right: 10px;
        }

        @media (max-width: ${theme.breakpoints.XS}) {
          .lang-level-select {
            flex-direction: column;
          }

          .lang-level-select > :global(*:not(:last-child)) {
            margin-bottom: 15px;
          }
        }

      `}</style>
    </div>
  )
}

export default LanguageFormField
