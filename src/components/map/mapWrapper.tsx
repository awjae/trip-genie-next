'use client'

import React, { useEffect, useState } from 'react'
import { Map, View, Feature, Overlay } from 'ol'
import { Tile } from 'ol/layer'
import { OSM } from 'ol/source'
import { get, Projection } from 'ol/proj'
import 'ol/ol.css'
import useMapStore from '@/store/mapStore'
import styles from '@/styles/map.module.css'
import { useRouter, useSearchParams } from 'next/navigation'
import { getCities } from '@/lib/serverQueries'

function MapWrapper({ city }: any) {
  const map = useMapStore((state: any) => state.map)
  const setMap = useMapStore((state: any) => state.setMap)

  useEffect(() => {
    console.log(city)
  }, [city])
  

  useEffect(() => {
    const temp = new Map({
      layers: [
        new Tile({
          source: new OSM()
        })
      ],
      target: 'map',
      view: new View({
        projection: get('EPSG:4326') as Projection,
        center: [126.936743, 37.486479],
        zoom: 12
      }),
    })
    setMap(temp)
    
    return () => {
      temp.setTarget(undefined)
    }
  }, [])

  return (
    <>
      <div id="map" className={styles.mapElements}></div>
    </>
  )
}

export default MapWrapper