'use client'

import MapWrapper from '@/components/map/mapWrapper'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/map.module.css'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getCityForClient, getSpotsForClient,  } from '@/lib/fetchers'
import HeaderContents from '@/components/common/header/headerContents'
import classNames from 'classnames'
import headerStyles from '@/styles/header.module.css'
import { SpotType } from '@/types/spot'
import SpotItem from '@/components/map/spotItem'
import useMapStore from '@/store/mapStore'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Geometry, Point } from 'ol/geom'
import { Feature } from 'ol'
import { iconStyle } from '@/utils/map'
import { Layer } from 'ol/layer'
import DatePicker from "react-datepicker";
import { ko } from 'date-fns/esm/locale';
import "react-datepicker/dist/react-datepicker.css";
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import styled from '@emotion/styled'
import Image from 'next/image'
import BookmarkWrapper from '@/components/map/bookmarkWrapper'

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#fff',
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    fontSize: 14,
    padding: '15px',
    wordBreak: 'keep-all',
    lineHeight: 1.4
  },
}))

function Page() {
  const searchParams = useSearchParams()
  const cityId = searchParams.get("cityId")
  const map = useMapStore((state: any) => state.map)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [nDays, setNDays] = useState(1)
  const [bookmarkList, setBookmarkList] = useState<SpotType[]>([])

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

  const handleAddBookmark = (item: SpotType) => {
    setBookmarkList(prevState => ([...prevState, item]))
  }

  const handleSpotClick = (item: SpotType) => {
    map.getView().animate({
      center: [Number(item.lng), Number(item.lat)],
      duration: 500,
    }, () => {
      setTimeout(() => {
        const pixel = map.getPixelFromCoordinate([Number(item.lng), Number(item.lat)])
        pixel[1] -= 5;
        map.dispatchEvent({
          type: 'singleclick',
          pixel: pixel,
        })
      }, 100)
    })
  }

  const handleDatePickerChange = (dates: [any, any]) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }
  useEffect(() => {
    if (!endDate || !startDate) return
    const timeDiff = endDate.getTime() - startDate.getTime()
    const calculatedNDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1
    setNDays(calculatedNDays)
  }, [startDate, endDate])

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
                <div className={styles.titleWrapper}>
                  <h1>{cityData.name}</h1>
                  <LightTooltip title={cityData.description} placement="right-end">
                    <Image src='/images/icon/info.png' alt={'여행지 툴팁'} width={18} height={18}></Image>
                  </LightTooltip>
                </div>
                <p>{cityData.enName.toUpperCase()}</p>
              </div>
              <div className={styles.calender}>
                <p>{nDays} DAY</p>
                <div>
                  <DatePicker
                    selected={startDate}
                    endDate={endDate}
                    startDate={startDate}
                    minDate={new Date()}
                    onChange={handleDatePickerChange}
                    locale={ko}
                    dateFormat='yyyy. MM. dd'
                    selectsRange
                  />
                </div>
              </div>
            </>
          )}
          <BookmarkWrapper bookmarkList={bookmarkList}></BookmarkWrapper>
        </aside>
        <MapWrapper city={cityData}></MapWrapper>
        <aside className={styles.mapRightAside}>
          <ul>
            { spotsData && spotsData?.map((spot: SpotType) => (
              <SpotItem 
                key={spot.id} 
                item={spot} 
                handleSpotClick={handleSpotClick} 
                handleAddBookmark={handleAddBookmark}
              ></SpotItem>
            ))}
          </ul>
        </aside>
      </main>
    </>
  )
}

export default Page