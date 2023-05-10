import { CityType } from '@/types/city'
import Link from 'next/link'
import React from 'react'
import styles from '@/styles/cityList.module.css'

function CityItem({ city }: { city: CityType }) {
  return (
    <li className={styles.card}>
      <div className={styles.cardBackground} style={{ backgroundImage: `url(/images/city/${city.enName}.jpg)` }}></div>
      <Link href={`/city/${city.id}`}>
        <p>{city.enName.toUpperCase()}</p>
        <p>{city.name}</p>
      </Link>
    </li>
  )
}

export default CityItem