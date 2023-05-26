'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Map, View, Feature, Overlay } from 'ol'
import { Tile } from 'ol/layer'
import { OSM } from 'ol/source'
import { get, Projection } from 'ol/proj'
import 'ol/ol.css'
import useMapStore from '@/store/mapStore'
import styles from '@/styles/map.module.css'
import { useRouter, useSearchParams } from 'next/navigation'
import { getCities } from '@/lib/serverQueries'
import { CityType } from '@/types/city'
import classNames from 'classnames'

function MapWrapper({ city }: { city: CityType; }) {
  const map = useMapStore((state: any) => state.map)
  const setMap = useMapStore((state: any) => state.setMap)
  const [mapPopover, setMapPopover] = useState({
    popup: {},
    name: "",
    address: "",
  })
  const mapPopupRef = useRef<HTMLInputElement>(null)
  const [isShowPopup, setIsShowPopup] = useState(false)

  const moveStartFn = () => {
    if (!map) return 
    setIsShowPopup(false)
    // map.refresh()
  }

  const setPopup = (tempMap: Map) => {
    if (!mapPopupRef.current) return;
    const popup = new Overlay({
      element: mapPopupRef.current,
      positioning: 'bottom-center',
      stopEvent: false,
      id: 'popup'
    })
    tempMap.addOverlay(popup)
    setMapPopover({...mapPopover, popup: popup})
  }
  const setClickInteraction = (tempMap: Map) => {
    tempMap.on('singleclick', function (evt: any) {
      const feature = tempMap.forEachFeatureAtPixel(evt.pixel, (feature: any) => feature)
      if (!feature) return
      console.log(feature)
      setMapPopover(prevState => ({...prevState, name: feature.get('name'), address: feature.get('address') }))
      const overlay = tempMap.getOverlayById('popup')
      overlay.setPosition(feature.getGeometry().getCoordinates())
      setIsShowPopup(true)
    })
    tempMap.on('movestart', moveStartFn)
  }

  useEffect(() => {
    if (!city) return
    map.getView().setCenter([Number(city.lng), Number(city.lat)])    
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
        zoom: 14
      }),
    })
    setMap(temp)
    setPopup(temp)
    setClickInteraction(temp)
    
    return () => {
      temp.setTarget(undefined)
    }
  }, [])

  return (
    <section className={styles.mapWrapper}> 
      <div id="map" className={styles.mapElements}></div>
      <div id="mapPopup" className={classNames(styles.mapPopup, {[styles.active]: isShowPopup})} ref={mapPopupRef}
      >
        <p>장소명 : {mapPopover.name}</p>
        <p>주소 : {mapPopover.address}</p>
      </div>
    </section>
  )
}

export default MapWrapper