'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import styles from '@/app/page.module.css'
import { CityType } from '@/types/city'
import { useRouter } from 'next/navigation'
import { useDebounceFunction } from '@/utils/utils'

function SearchInput({ suggestionList }: { suggestionList: CityType[] }) {
  const [inputText, setInputText] = useState('')
  const [isShowSuggestionLayer, setIsShowSuggestionLayer] = useState(false)
  const [filterdeSuggestionList, setFilterdeSuggestionList] = useState(suggestionList)
  const [selectedCity, setSelectedCity] = useState<CityType|null>(null)
  const router = useRouter()

  const handleSuggestionClick = (city: CityType) => {
    setInputText(city.name)
    setIsShowSuggestionLayer(false)
    setFilterdeSuggestionList(suggestionList.filter(name => name.name.indexOf(city.name) > -1))
    setSelectedCity(city)
  }

  const filteredSuggestionFn = (value: string) => {
    setFilterdeSuggestionList(suggestionList.filter(name => name.name.indexOf(value) > -1))
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
        <ul className={styles.suggestionContainer}>
          { filterdeSuggestionList.map(city => (
            <li key={city.id} onClick={() => handleSuggestionClick(city)}>
              { city.name }
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchInput