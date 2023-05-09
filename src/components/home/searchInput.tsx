'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../app/page.module.css'

function SearchInput() {
  const [inputText, setInputText] = useState('')

  return (
    <div>
      <input id="searchInput" type="text" placeholder='여행지를 입력해주세요.' value={inputText} onChange={(e) => setInputText(e.target.value)}/>
      <Link href={'map'}>
        <Image src="/images/icon/search.svg" alt="" width={30} height={30}/>
      </Link>
    </div>
  )
}

export default SearchInput