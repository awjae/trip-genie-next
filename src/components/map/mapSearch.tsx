import React from 'react'
import styles from '@/styles/map.module.css'

function MapSearch() {
  return (
    <div className={styles.mapSearch}>
      <input type="text" placeholder='검색어'/>
    </div>
  )
}

export default MapSearch