'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import styles from '@/app/page.module.css'
import { CityType } from '@/types/city'
import { useRouter } from 'next/navigation'
import { useDebounceFunction } from '@/utils/utils'
import classNames from 'classnames'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import styled from '@emotion/styled'

const StyledTextField = styled(TextField)({
  'input': {
    height: '24px !important' 
  }
})

function SearchInput({ suggestionList }: { suggestionList: CityType[] }) {
  const [inputText, setInputText] = useState('')
  const [isShowSuggestionLayer, setIsShowSuggestionLayer] = useState(false)
  const [filterdeSuggestionList, setFilterdeSuggestionList] = useState(suggestionList.map(suggestion => ({ ...suggestion, select: false })))
  const [selectedCity, setSelectedCity] = useState<CityType|null>(null)
  const router = useRouter()

  const handleSuggestionClick = (city: CityType) => {
    setInputText(city.name)
    setIsShowSuggestionLayer(false)
    setFilterdeSuggestionList(suggestionList.filter(name => name.name.indexOf(city.name) > -1).map(suggestion => ({ ...suggestion, select: false })))
    setSelectedCity(city)
  }

  const filteredSuggestionFn = (value: string) => {
    setFilterdeSuggestionList(suggestionList.filter(name => name.name.indexOf(value) > -1).map(suggestion => ({ ...suggestion, select: false })))
  }

  const debouncedFetchSuggestions = useDebounceFunction(filteredSuggestionFn, 300)
  
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCity(null)
    debouncedFetchSuggestions(e.target.value)
    setInputText(e.target.value)
  }

  const goMap = () => {
    if (selectedCity) { 
      router.push(`/map?cityId=${selectedCity.id}`)
      return
    }
    router.push(`/map`)
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filterdeSuggestionList.length === 1) {
      handleSuggestionClick(filterdeSuggestionList[0])
      goMap()
      return
    }
    if (e.key === 'ArrowDown') {
      const findSelected = filterdeSuggestionList.findIndex(suggestion => suggestion.select)
      if (findSelected < 0) {
        setFilterdeSuggestionList(filterdeSuggestionList.map((suggestion, idx) => {
          if (idx === 0) {
            return {
              ...suggestion,
              select: true
            }
          }
          return { ...suggestion }
        }))
        return
      }

      setFilterdeSuggestionList(filterdeSuggestionList.map((suggestion, idx) => {
        if (idx === findSelected + 1) {
          return {
            ...suggestion,
            select: true
          }
        }
        return { ...suggestion, select: false }
      }))
    }
    if (e.key === 'ArrowUp') {
      const findSelected = filterdeSuggestionList.findIndex(suggestion => suggestion.select)
      if (findSelected < 0) return

      setFilterdeSuggestionList(filterdeSuggestionList.map((suggestion, idx) => {
        if (idx === findSelected - 1) {
          return {
            ...suggestion,
            select: true
          }
        }
        return { ...suggestion, select: false }
      }))
    }
  }

  return (
    <div>
      <input id="searchInput" type="text" placeholder='여행지를 입력해주세요.' value={inputText} 
        onChange={handleSearchInputChange}
        onFocus={() => setIsShowSuggestionLayer(true)}
        onKeyDown={handleSearchKeyDown}
      />
      <a onClick={goMap}>
        <Image src="/images/icon/search.svg" alt="" width={30} height={30}/>
      </a>
      { isShowSuggestionLayer && filterdeSuggestionList.length > 0 && (
        <ul className={styles.suggestionContainer} >
          { filterdeSuggestionList.map(city => (
            <li key={city.id} onClick={() => handleSuggestionClick(city)} className={classNames({ [styles.select]: city.select })}>
              { city.name }
            </li>
          ))}
        </ul>
      )}
      {/* <Autocomplete
        freeSolo
        disableClearable
        options={filterdeSuggestionList.map((option) => option.name)}
        renderOption={(props, option) => {
          console.log(props, option)
          return (
            <li {...props} key={option.id}>
              {option.name}
            </li>
          );
        }}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            label="여행지를 입력해주세요"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      /> */}
    </div>
  )
}

export default SearchInput