import { SpotType } from '@/types/spot'
import React from 'react'

function SpotItem({ item, handleSpotClick }: { item: SpotType, handleSpotClick: Function }) {
  return (
    <li key={item.id} onClick={() => handleSpotClick(item)}>
      <h3>{item.subName}</h3>
    </li>
  )
}

export default SpotItem