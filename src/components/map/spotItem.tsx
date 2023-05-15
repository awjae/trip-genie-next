import { SpotType } from '@/types/spot'
import React from 'react'

function SpotItem({ id, subName }: Partial<SpotType>) {
  return (
    <li key={id}>
      <h3>{subName}</h3>
    </li>
  )
}

export default SpotItem