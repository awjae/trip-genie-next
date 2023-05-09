import { CityType } from '@/types/city'
import Link from 'next/link'
import React from 'react'

function CityItem({ city }: { city: CityType }) {
  return (
    <li>
      <Link href={`/city/${city.id}`}>{city.name}</Link>
    </li>
  )
}

export default CityItem