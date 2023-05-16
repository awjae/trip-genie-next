'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import styles from '@/app/page.module.css'
import { CityType } from '@/types/city'

function SearchInput({ suggestionList }: { suggestionList: CityType[] }) {
  const [inputText, setInputText] = useState('')
  const [isShowSuggestionLayer, setIsShowSuggestionLayer] = useState(false)

  const handleSuggestionClick = (city: CityType) => {
    setInputText(city.name)
    setIsShowSuggestionLayer(false)
  }

  return (
    <div>
      <input id="searchInput" type="text" placeholder='여행지를 입력해주세요.' value={inputText} 
        onChange={(e) => setInputText(e.target.value)}
        onFocus={() => setIsShowSuggestionLayer(true)}
      />
      <Link href={'map'}>
        <Image src="/images/icon/search.svg" alt="" width={30} height={30}/>
      </Link>
      { isShowSuggestionLayer && (
        <ul className={styles.suggestionContainer}>
          { suggestionList.map(city => (
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