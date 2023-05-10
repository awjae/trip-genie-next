import MapWrapper from '@/components/map/mapWrapper'
import React from 'react'
import styles from '@/styles/map.module.css'

function Page() {
  return (
    <main className={styles.map}>
      <aside>
        <div>목적지</div>
        <div>날짜</div>
      </aside>
      <MapWrapper></MapWrapper>
      <aside>
        <div>장소들</div>
      </aside>
    </main>
  )
}

export default Page