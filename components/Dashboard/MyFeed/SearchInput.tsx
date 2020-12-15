import React, { useCallback, useState } from 'react'
import _ from 'lodash'

type Props = {
  defaultValue: string
  debounceTime: number
  onChange: (value: string) => void
}

const SearchInput: React.FC<Props> = ({ defaultValue, onChange, debounceTime }) => {
  const [oldDefaultValue, setOldDefaultValue] = useState(defaultValue)
  const [value, setValue] = useState(defaultValue)

  if (oldDefaultValue !== defaultValue) {
    setOldDefaultValue(defaultValue)
    setValue(defaultValue)
  }

  const debounceSearch = useCallback(
    _.debounce((_searchVal: string) => {
      onChange(_searchVal)
    }, debounceTime),
    [],
  )

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value)
    debounceSearch(e.target.value)
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search posts"
        className="search-box"
        value={value}
        maxLength={50}
        onChange={onSearchChange}
      />
      <style jsx>{`
        .search-box {
          margin-bottom: 20px;
          width: 100%;
        }

        input {
          border-radius: 5px;
          height: 50px;
          box-shadow: 0px 8px 10px #00000029;
          font-size: 16px;
          background: white;
          padding: 10px;
          width: 100%;
        }
      `}</style>
    </>
  )
}

export default React.memo(SearchInput)
