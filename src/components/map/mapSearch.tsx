import React from 'react'
import styles from '@/styles/map.module.css'
import Image from 'next/image'

function MapSearch() {
  return (
    <div className={styles.mapSearch}>
      <input type="text" placeholder='검색어'/>
      <Image src='/images/icon/search.png' alt="" width={24} height={24}/>
    </div>
  )
}

export default MapSearch