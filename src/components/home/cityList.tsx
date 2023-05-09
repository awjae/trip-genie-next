'use client'

import { CityType } from '@/types/city'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/cityList.module.css'
import Link from 'next/link';
import CityItem from './cityItem';
import classNames from 'classnames';

function CityList({ result }: { result: CityType[]; }) {
  const [cityList, setCityList] = useState<CityType[]>(result)
  const [nationOptions, setNatioOptions] = useState({
    label: ["전체", "국내", "해외"],
    options: ["ALL", "INNER", "OUTER"],
    value: "ALL"
  })

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNatioOptions(prevState => ({ ...prevState, value: event.target.value }))
  }

  useEffect(() => {
    if (nationOptions.value === "ALL") {
      setCityList(result)
    } else if (nationOptions.value === "INNER") {
      setCityList(result.filter((item: CityType) => item.nation === 'korea'))
    } else {
      setCityList(result.filter((item: CityType) => item.nation !== 'korea'))
    }
  }, [nationOptions.value])
  

  return (
    <div className={styles.cityListLayer}>
      <div className={styles.nationLabel}>
        { nationOptions.options.map((option, idx) => (
          <label htmlFor={`nation_${option}`} key={option} className={classNames({ [styles.active]: nationOptions.value === option })}>{nationOptions.label[idx]}
            <input type="radio" id={`nation_${option}`} value={option} onChange={handleOptionChange} checked={nationOptions.value === option}/>
          </label>
        ))}
      </div>
      <div>
        <select name="" id="">
          <option value="">추천순</option>
          <option value="">인기순</option>
        </select>
      </div>
      <ul>
        { cityList.map((city: CityType) => (
          <CityItem key={city.id} city={city}></CityItem>
        ))}
      </ul>
    </div>
  )
}

export default CityList