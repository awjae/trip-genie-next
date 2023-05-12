'use client'

import MapWrapper from '@/components/map/mapWrapper'
import React, { useState } from 'react'
import styles from '@/styles/map.module.css'
import { useSearchParams } from 'next/navigation'
import { use } from 'react';
import { useQuery } from '@tanstack/react-query'
import { getCityForClient } from '@/lib/fetchers'
import HeaderContents from '@/components/common/header/headerContents'
import classNames from 'classnames'
import headerStyles from '@/styles/header.module.css'

function Page() {
  const searchParams = useSearchParams()
  const cityId = searchParams.get("cityId")
  const { data: cityData } = useQuery(["getCity"], async () => await getCityForClient(Number(cityId)))

  return (
    <>
      <header className={classNames(headerStyles.header, headerStyles.invert, headerStyles.mapHeader)}>
        <HeaderContents></HeaderContents>
      </header>
      <main className={styles.map}>
        <aside className={styles.mapLeftAside}>
          { cityData && (
            <>
              <div>
                <h1>{cityData.name}</h1>
                <p>{cityData.enName.toUpperCase()}</p>
              </div>
              <div className={styles.calender}>
                <p>3 DAY</p>
                <p>2023.05.22 - 2023.05.24</p>
              </div>
              <div className={styles.desc}>{cityData.description}</div>
            </>
          )}
        </aside>
        <MapWrapper city={cityData}></MapWrapper>
        <aside className={styles.mapRightAside}>
          <div>장소들</div>
        </aside>
      </main>
    </>
  )
}

export default Page