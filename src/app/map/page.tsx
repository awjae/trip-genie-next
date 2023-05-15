'use client'

import MapWrapper from '@/components/map/mapWrapper'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/map.module.css'
import { useSearchParams } from 'next/navigation'
import { use } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query'
import { getCityForClient, postCityForClient } from '@/lib/fetchers'
import HeaderContents from '@/components/common/header/headerContents'
import classNames from 'classnames'
import headerStyles from '@/styles/header.module.css'

function Page() {
  const searchParams = useSearchParams()
  const cityId = searchParams.get("cityId")
  const { data: cityData } = useQuery(["getCity", cityId], async () => await getCityForClient(Number(cityId)))
  const { mutate } = useMutation(["postCity"], async (variables: any) => await postCityForClient(variables.name, Number(variables.id), variables.options))

  const getSpots = async (name: string, id: number) => {
    const response = await fetch(`https://www.myro.co.kr/searchMostSelectedSpots?cityName=${name}`)
    const result = await response.json()
    // mutate({ name, id, options: result })
    let str = "";
    result.forEach((el: any) => {
      str += insertText({
        showingName: el.showingName,
        googleSearchedName: el.googleSearchedName,
        address: el.address,
        lat: el.lat,
        lng: el.lng,
        openTime: el.openTime,
        id: cityId
      })
    })
    console.log(str)
  }

  const insertText = (obj: any) => {
    let text = `INSERT INTO public.spots(
      name, "subName", address, lat, lng, "openTime", "cityId")
      VALUES ('${obj.showingName.replaceAll('\'','\'\'')}', '${obj.googleSearchedName.replaceAll('\'','\'\'')}', '${obj.address.replaceAll('\'','\'\'')}', ${obj.lat}, ${obj.lng}, '${obj.openTime}', ${obj.id}); `;
    return text 
  }

  useEffect(() => {
    if (cityData) {
      getSpots(cityData.enName, Number(cityData.id))
    }
  }, [cityData])

  useEffect(() => {
  
    return () => {
      
    }
  }, [])
    

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