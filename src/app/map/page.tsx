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
import SpotItem from '@/components/map/spotItem'
import useMapStore from '@/store/mapStore'
import VectorLayer from 'ol/layer/Vector'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import VectorSource from 'ol/source/Vector'
import { Geometry, Point } from 'ol/geom'
import { Feature } from 'ol'
import { iconStyle } from '@/utils/map'
import { Layer } from 'ol/layer'
import { returnOrUpdate } from 'ol/extent'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Page() {
  const searchParams = useSearchParams()
  const cityId = searchParams.get("cityId")
  const map = useMapStore((state: any) => state.map)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const { data: cityData } = useQuery(["getCity", cityId], async () => await getCityForClient(Number(cityId)))
  const { data: spotsData } = useQuery(["getSpots", cityId], async () => await getSpotsForClient(Number(cityId)), {
    onSuccess(data) {
      const iconFeatureList:Feature<Geometry>[] = []
      data.forEach((element: SpotType) => { 
        const iconFeature = new Feature({
          geometry: new Point([element.lng, element.lat]),
          name: element.name,
          subName: element.subName,
          openTime: element.openTime,
          address: element.address,
        })
        iconFeature.setStyle(iconStyle)
        iconFeatureList.push(iconFeature)
      })
      const vectorSource = new VectorSource({ features: iconFeatureList })
      const pointLayer = new VectorLayer({ source: vectorSource })
      pointLayer.set("name", "spots")
      map.addLayer(pointLayer)
    },
  })

  const onChange = (dates: [any, any]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  
  useEffect(() => {
    if (!Object.keys(map).length) return
    const collection = map.getLayers()
    
    return () => {
      collection.getArray().filter((layer: Layer) => layer.get("name") === "spots").forEach((layer: Layer) => {
        collection.remove(layer)
      })
    }
  }, [map])

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
                <DatePicker
                  selected={startDate}
                  onChange={onChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                />
              </div>
              <div className={styles.desc}>{cityData.description}</div>
            </>
          )}
        </aside>
        <MapWrapper city={cityData}></MapWrapper>
        <aside className={styles.mapRightAside}>
          <ul>
            { spotsData && spotsData?.map((spot: SpotType) => (
              <SpotItem key={spot.id} id={spot.id} subName={spot.subName}></SpotItem>
            ))}
          </ul>
        </aside>
      </main>
    </>
  )
}

export default Page