'use client'

import React, { useEffect, useState } from 'react'
import styles from '@/styles/header.module.css'
import Link from 'next/link'
import classNames from 'classnames'
import HeaderContents from './headerContents'

function Header() {
  //스크롤 하나 떄문에 use client를 사용해야하는가...
  const [invertColor, setInvertColor] = useState(false)

  useEffect(() => {
    const handleScroll = (e: any) => {
      const height = document.querySelector('video')?.getBoundingClientRect().height
      if (window.scrollY + 80 >= height!) {
        setInvertColor(true)
      } else {
        setInvertColor(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <header className={classNames(styles.header, { [styles.invert]: invertColor })}>
      <HeaderContents></HeaderContents>
    </header>
  )
}

export default Header