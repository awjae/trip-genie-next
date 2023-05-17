'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import styles from '@/app/page.module.css'
import { CityType } from '@/types/city'
import { debounce } from '@mui/material'
import { useRouter } from 'next/navigation'

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

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCity(null)
    debounce(() => filteredSuggestionFn(e.target.value), 1000)
    setInputText(e.target.value)
  }

  const goMap = () => {
    if (selectedCity) { 
      router.push(`/map?cityId=${selectedCity.id}`)
      return
    }
    router.push(`/map`)
  }

  return (
    <div>
      <input id="searchInput" type="text" placeholder='여행지를 입력해주세요.' value={inputText} 
        onChange={handleSearchInputChange}
        onFocus={() => setIsShowSuggestionLayer(true)}
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