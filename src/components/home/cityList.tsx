'use client'

import { CityType } from '@/types/city'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/cityList.module.css'
import CityItem from './cityItem'
import classNames from 'classnames'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

function CityList({ result }: { result: CityType[]; }) {
  const [cityList, setCityList] = useState<CityType[]>(result)
  const [nationOptions, setNatioOptions] = useState({
    label: ["전체", "국내", "해외"],
    options: ["ALL", "INNER", "OUTER"],
    value: "ALL",
    filter: 'recommend'
  })

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNatioOptions(prevState => ({ ...prevState, value: event.target.value }))
  }

  const handleChange = (event: SelectChangeEvent) => {
    setNatioOptions(prevState => ({ ...prevState, filter: event.target.value }))
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
        <Select
          value={nationOptions.filter}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={'recommend'}>추천순</MenuItem>
          <MenuItem value={'hot'}>인기순</MenuItem>
        </Select>
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