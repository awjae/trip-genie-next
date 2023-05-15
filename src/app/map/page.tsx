'use client'

import MapWrapper from '@/components/map/mapWrapper'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/map.module.css'
import { useSearchParams } from 'next/navigation'
import { use } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query'
import { getCityForClient, getSpotsForClient, postCityForClient } from '@/lib/fetchers'
import HeaderContents from '@/components/common/header/headerContents'
import classNames from 'classnames'
import headerStyles from '@/styles/header.module.css'
import { SpotType } from '@/types/spot'

function Page() {
  const searchParams = useSearchParams()
  const cityId = searchParams.get("cityId")
  const { data: cityData } = useQuery(["getCity", cityId], async () => await getCityForClient(Number(cityId)))
  const { data: spotsData } = useQuery(["getSpots", cityId], async () => await getSpotsForClient(Number(cityId)))
  const { mutate } = useMutation(["postCity"], async (variables: any) => await postCityForClient(variables.name, Number(variables.id), variables.options))

  useEffect(() => {
    console.log(spotsData)
    return () => {
      
    }
  }, [spotsData])
    

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
          <ul>
            { spotsData && spotsData?.map((spot: SpotType) => (
              <li key={spot.id}>
                <h3>{spot.subName}</h3>
              </li>
            ))}
          </ul>
        </aside>
      </main>
    </>
  )
}

export default Page