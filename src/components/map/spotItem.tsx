import { SpotType } from '@/types/spot'
import React from 'react'
import Image from 'next/image'
import styles from '@/styles/map.module.css'

function SpotItem({ item, handleSpotClick, handleAddBookmark }: { item: SpotType, handleSpotClick: Function; handleAddBookmark: Function; }) {
  
  const handleClickAddBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    handleAddBookmark(item)
  }

  return (
    <li key={item.id} onClick={() => handleSpotClick(item)}  className={styles.spotItem}>
      <h3>{item.name}</h3>
      <button className={styles.spotAddBtn} onClick={handleClickAddBtn}>
        <Image alt='장소 추가 아이콘' src='/images/icon/plus.png' width={18} height={18}></Image>
      </button>
    </li>
  )
}

export default SpotItem