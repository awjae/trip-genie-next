import React from 'react'
import styles from '@/styles/header.module.css'

function header() {
  return (
    <header className={styles.header}>
      <h1>트립지니</h1>
      <nav>
        <div>이용방법</div>
        <div>로그인</div>
      </nav>
    </header>
  )
}

export default header