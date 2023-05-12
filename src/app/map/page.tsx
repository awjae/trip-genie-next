'use client'

import MapWrapper from '@/components/map/mapWrapper'
import React, { useState } from 'react'
import styles from '@/styles/map.module.css'
import { useSearchParams } from 'next/navigation'
import { use } from 'react';
import { useQuery } from '@tanstack/react-query'
import { getCityForClient } from '@/lib/fetchers'



function Page() {
  const searchParams = useSearchParams()
  const cityId = searchParams.get("cityId")
  const { data: cityData } = useQuery({
    queryKey: ["getCity"],
    queryFn: () => getCityForClient(Number(cityId)),
  })
  
  return (
    <main className={styles.map}>
      <aside className={styles.mapLeftAside}>
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